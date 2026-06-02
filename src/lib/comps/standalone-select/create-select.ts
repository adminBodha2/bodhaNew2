/**
 * Standalone Select (Listbox) — self-contained port of Melt UI's Select/Listbox
 *
 * === IMPORTANT: ONE EXTERNAL DEPENDENCY ===
 * You MUST install:
 *     npm install @floating-ui/dom
 *
 * This is the positioning engine (same one used by shadcn, radix, etc.).
 * It is small, well-maintained, and the only thing this file needs from npm.
 *
 * Usage (very close to original melt-ui):
 *
 *   import { createSelect } from './create-select';
 *
 *   const { elements: { trigger, menu, option, label, group, groupLabel },
 *           states: { open, selectedLabel },
 *           helpers: { isSelected } } = createSelect<string>({ ... });
 *
 * Then in template:
 *   <button use:trigger.action {...trigger.attrs()}>...</button>
 *   <div use:menu.action {...menu.attrs()}>...</div>
 *
 * This file has zero dependencies on @melt-ui/svelte or any internal melt code.
 */

// === Floating UI (positioning engine) ===
// This is the ONLY external dependency of this standalone Select.
//
// Install with:
//     npm install @floating-ui/dom
//
// It is the de-facto standard library for positioning floating elements
// (used by Radix, shadcn, Headless UI, Melt, etc.). Very small.
//
// If you truly cannot add any dependency, see the "ZERO_DEPENDENCY_FALLBACK"
// section near the bottom of this file for a basic getBoundingClientRect alternative
// (you will lose auto-flip, sameWidth, fitViewport, collision detection, etc.).
import {
	autoUpdate,
	computePosition,
	flip,
	shift,
	size,
	offset,
	type Placement,
	type Middleware,
} from '@floating-ui/dom';
import { tick } from 'svelte';

// -------------------- Types --------------------

export type SelectOption<T = unknown> = {
	value: T;
	label?: string;
};

export type SelectSelected<Multiple extends boolean, T> = Multiple extends true
	? SelectOption<T>[]
	: SelectOption<T> | undefined;

export type CreateSelectProps<T = unknown, Multiple extends boolean = false> = {
	/** Whether multiple items can be selected */
	multiple?: Multiple;
	/** Default selected value(s) */
	defaultSelected?: SelectSelected<Multiple, T>;
	/** Controlled selected store (advanced) */
	selected?: SelectSelected<Multiple, T>;
	/** Called when selection changes */
	onSelectedChange?: (selected: SelectSelected<Multiple, T> | undefined) => void;

	/** Whether the menu is open by default */
	defaultOpen?: boolean;
	/** Controlled open state */
	open?: boolean;
	/** Called when open state changes */
	onOpenChange?: (open: boolean) => void;

	/** Floating UI positioning config */
	positioning?: {
		placement?: Placement;
		sameWidth?: boolean;
		fitViewport?: boolean;
		gutter?: number;
	};
	/** Force the menu to be rendered even when closed (for transitions) */
	forceVisible?: boolean;
	/** Portal the menu. Pass null to disable. */
	portal?: 'body' | HTMLElement | null;
	/** Prevent page scroll when open */
	preventScroll?: boolean;
	/** Close when clicking outside */
	closeOnOutsideClick?: boolean;
	/** Escape key behavior */
	escapeBehavior?: 'close' | 'ignore';
	/** Enable typeahead search */
	typeahead?: boolean;
	/** Highlight item on hover */
	highlightOnHover?: boolean;
	/** Loop keyboard navigation */
	loop?: boolean;
	/** Scroll alignment when highlighting */
	scrollAlignment?: 'nearest' | 'center';

	/** For internal use */
	builder?: string;
};

type OptionProps<T> = {
	value: T;
	label?: string;
	disabled?: boolean;
};

// -------------------- Internal constants --------------------

const kbd = {
	ARROW_DOWN: 'ArrowDown',
	ARROW_UP: 'ArrowUp',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
	ENTER: 'Enter',
	SPACE: ' ',
	ESCAPE: 'Escape',
	TAB: 'Tab',
	HOME: 'Home',
	END: 'End',
	PAGE_UP: 'PageUp',
	PAGE_DOWN: 'PageDown',
	BACKSPACE: 'Backspace',
} as const;

const FIRST_LAST_KEYS: readonly string[] = [
	kbd.ARROW_DOWN,
	kbd.ARROW_UP,
	kbd.PAGE_DOWN,
	kbd.PAGE_UP,
	kbd.HOME,
	kbd.END,
];

const INTERACTION_KEYS = [
	kbd.ARROW_LEFT,
	kbd.ESCAPE,
	kbd.ARROW_RIGHT,
	'Shift',
	'CapsLock',
	'Control',
	'Alt',
	'Meta',
	kbd.ENTER,
	'F1',
	'F2',
	'F3',
	'F4',
	'F5',
	'F6',
	'F7',
	'F8',
	'F9',
	'F10',
	'F11',
	'F12',
];

// -------------------- Tiny utilities (self-contained) --------------------

function isBrowser() {
	return typeof window !== 'undefined';
}

function isHTMLElement(node: unknown): node is HTMLElement {
	return node instanceof HTMLElement;
}

function isHTMLInputElement(node: unknown): node is HTMLInputElement {
	return node instanceof HTMLInputElement;
}

function isHTMLButtonElement(node: unknown): node is HTMLButtonElement {
	return node instanceof HTMLButtonElement;
}

function isElementDisabled(el: HTMLElement): boolean {
	return el.hasAttribute('data-disabled') || el.getAttribute('aria-disabled') === 'true';
}

function disabledAttr(disabled: boolean | undefined) {
	return disabled ? '' : undefined;
}

function generateId() {
	return 'sel-' + Math.random().toString(36).slice(2, 10);
}

function deepEqual(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (typeof a !== 'object' || typeof b !== 'object') return false;

	const keysA = Object.keys(a as object);
	const keysB = Object.keys(b as object);
	if (keysA.length !== keysB.length) return false;

	for (const key of keysA) {
		if (!keysB.includes(key)) return false;
		if (!deepEqual((a as any)[key], (b as any)[key])) return false;
	}
	return true;
}

function toggle<T>(item: T, arr: T[], eq: (a: T, b: T) => boolean): T[] {
	const idx = arr.findIndex((x) => eq(x, item));
	if (idx === -1) return [...arr, item];
	return arr.filter((_, i) => i !== idx);
}

function wrapArray<T>(arr: T[], startIndex: number): T[] {
	return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
}

function debounce<T extends (...args: any[]) => void>(fn: T, ms = 350) {
	let t: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<T>) => {
		if (t) clearTimeout(t);
		t = setTimeout(() => fn(...args), ms);
	};
}

// Simple scroll lock (body)
let scrollLockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

function lockScroll() {
	if (!isBrowser()) return;
	if (scrollLockCount === 0) {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		originalOverflow = document.body.style.overflow;
		originalPaddingRight = document.body.style.paddingRight;
		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
	}
	scrollLockCount++;
}

function unlockScroll() {
	if (!isBrowser()) return;
	scrollLockCount--;
	if (scrollLockCount === 0) {
		document.body.style.overflow = originalOverflow;
		document.body.style.paddingRight = originalPaddingRight;
	}
}

// -------------------- Typeahead --------------------

function createTypeahead() {
	const typed: string[] = [];
	let resetTimer: ReturnType<typeof setTimeout> | null = null;

	const resetTyped = debounce(() => {
		typed.length = 0;
	});

	function handleTypeaheadSearch(key: string, items: HTMLElement[], onMatch: (el: HTMLElement) => void) {
		if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(key)) return;

		typed.push(key.toLowerCase());

		const candidateItems = items.filter((item) => !isElementDisabled(item));

		const isRepeated = typed.length > 1 && typed.every((c) => c === typed[0]);
		const search = isRepeated ? typed[0] : typed.join('');

		const currentEl = document.activeElement as HTMLElement | null;
		const currentIndex = currentEl ? candidateItems.indexOf(currentEl) : -1;

		let wrapped = wrapArray(candidateItems, Math.max(currentIndex, 0));
		if (search.length === 1) {
			wrapped = wrapped.filter((v) => v !== currentEl);
		}

		const next = wrapped.find(
			(el) => el?.textContent && el.textContent.toLowerCase().startsWith(search)
		);

		if (next && next !== currentEl) {
			onMatch(next);
		}

		resetTyped();
	}

	return { handleTypeaheadSearch };
}

// -------------------- Floating positioning --------------------

type FloatingConfig = {
	placement?: Placement;
	sameWidth?: boolean;
	fitViewport?: boolean;
	gutter?: number;
	offset?: { mainAxis?: number; crossAxis?: number };
	flip?: boolean;
};

function useFloating(
	anchor: HTMLElement,
	floating: HTMLElement,
	config: FloatingConfig = {},
	onPlace?: (side: string) => void
) {
	if (!anchor || !floating) {
		return { destroy: () => {} };
	}

	const opts = {
		placement: 'bottom' as Placement,
		sameWidth: true,
		fitViewport: false,
		gutter: 5,
		flip: true,
		...config,
	};

	const arrowEl = floating.querySelector('[data-arrow="true"]') as HTMLElement | null;

	const middleware: Middleware[] = [];

	if (opts.flip) {
		middleware.push(flip({ padding: 8 }));
	}
	if (opts.gutter != null || opts.offset) {
		middleware.push(offset(opts.gutter != null ? { mainAxis: opts.gutter } : opts.offset));
	}
	middleware.push(shift({ padding: 8 }));

	if (arrowEl) {
		// simple arrow support
		middleware.push({
			name: 'arrow',
			fn: () => ({ x: 0, y: 0 }),
		} as any);
	}

	middleware.push(
		size({
			padding: 8,
			apply({ rects, availableHeight, availableWidth }) {
				if (opts.sameWidth) {
					Object.assign(floating.style, {
						width: `${Math.round(rects.reference.width)}px`,
						minWidth: 'unset',
					});
				}
				if (opts.fitViewport) {
					Object.assign(floating.style, {
						maxWidth: `${availableWidth}px`,
						maxHeight: `${availableHeight}px`,
					});
				}
			},
		})
	);

	async function compute() {
		const { x, y, placement } = await computePosition(anchor, floating, {
			placement: opts.placement,
			middleware,
		});

		Object.assign(floating.style, {
			position: 'absolute',
			left: `${Math.round(x)}px`,
			top: `${Math.round(y)}px`,
		});

		const [side] = placement.split('-');
		floating.setAttribute('data-side', side);
		onPlace?.(side);
	}

	const cleanup = autoUpdate(anchor, floating, compute);

	return { destroy: cleanup };
}

// -------------------- Main createSelect --------------------

export function createSelect<T = unknown, Multiple extends boolean = false>(
	props: CreateSelectProps<T, Multiple> = {}
) {
	const {
		multiple = false as Multiple,
		defaultSelected,
		onSelectedChange,
		defaultOpen = false,
		onOpenChange,
		positioning = {},
		forceVisible = false,
		portal = 'body',
		preventScroll = true,
		closeOnOutsideClick = true,
		escapeBehavior = 'close',
		typeahead = true,
		highlightOnHover = true,
		loop = true,
		scrollAlignment = 'nearest',
	} = props;

	// ----- State (runes) -----
	let open = $state(defaultOpen);
	let selected = $state<SelectSelected<Multiple, T> | undefined>(
		(defaultSelected ?? (multiple ? [] : undefined)) as any
	);

	// Controlled overrides (simple)
	if (props.open !== undefined) open = props.open;
	if (props.selected !== undefined) selected = props.selected as any;

	let activeTrigger = $state<HTMLElement | null>(null);
	let highlightedItem = $state<HTMLElement | null>(null);

	const ids = {
		trigger: generateId(),
		menu: generateId(),
		label: generateId(),
	};

	// Derived
	const selectedLabel = $derived.by(() => {
		if (Array.isArray(selected)) {
			return selected.map((o) => o.label ?? String(o.value)).join(', ');
		}
		return selected?.label ?? '';
	});

	const isVisible = $derived((open || forceVisible) && activeTrigger !== null);

	// ----- Helpers -----
	function getOptionProps(el: HTMLElement): OptionProps<T> {
		const valueAttr = el.getAttribute('data-value');
		const label = el.getAttribute('data-label');
		const disabled = el.hasAttribute('data-disabled');
		let value: any = valueAttr;
		try {
			value = valueAttr ? JSON.parse(valueAttr) : valueAttr;
		} catch {}
		return {
			value,
			label: label ?? el.textContent ?? undefined,
			disabled: !!disabled,
		};
	}

	function setSelected(newOpt: SelectOption<T>) {
		if ((multiple as boolean) === true) {
			const arr = Array.isArray(selected) ? [...selected] : [];
			selected = toggle(newOpt, arr, (a, b) => deepEqual(a.value, b.value)) as any;
		} else {
			selected = newOpt as any;
		}
		onSelectedChange?.(selected as any);
	}

	function selectItem(el: HTMLElement) {
		const props = getOptionProps(el);
		setSelected(props);
	}

	async function openMenu() {
		open = true;
		onOpenChange?.(true);
		await tick();

		const menuEl = document.getElementById(ids.menu);
		if (!isHTMLElement(menuEl)) return;

		const selectedItem = menuEl.querySelector('[aria-selected="true"]') as HTMLElement | null;
		if (selectedItem) {
			highlightedItem = selectedItem;
			selectedItem.scrollIntoView({ block: scrollAlignment });
		}
	}

	function closeMenu() {
		open = false;
		highlightedItem = null;
		onOpenChange?.(false);
	}

	function isSelected(value: T): boolean {
		if (Array.isArray(selected)) {
			return selected.some((o) => deepEqual(o.value, value));
		}
		// For object values (rare in selects), strip top-level undefineds before comparing.
		// This matches the spirit of the original melt-ui stripValues(obj, undefined, true).
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			const cleaned: Record<string, unknown> = {};
			for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
				if (v !== undefined) cleaned[k] = v;
			}
			return deepEqual(selected?.value, cleaned);
		}
		return deepEqual(selected?.value, value);
	}

	function isHighlighted(value: T): boolean {
		if (!highlightedItem) return false;
		const props = getOptionProps(highlightedItem);
		return deepEqual(props.value, value);
	}

	// ----- Actions / Builders -----
	function triggerAction(node: HTMLElement) {
		activeTrigger = node;

		function onClick() {
			node.focus();
			if (open) {
				closeMenu();
			} else {
				openMenu();
			}
		}

		async function onKeyDown(e: KeyboardEvent) {
			const $open = open;

			if (!$open) {
				if (INTERACTION_KEYS.includes(e.key)) return;
				if (e.key === kbd.TAB) return;
				if (e.key === kbd.BACKSPACE && isHTMLInputElement(node) && node.value === '') return;
				if (e.key === kbd.SPACE && isHTMLButtonElement(node)) return;

				openMenu();

				await tick();

				const menuEl = document.getElementById(ids.menu);
				if (!isHTMLElement(menuEl)) return;

				const enabled = Array.from(
					menuEl.querySelectorAll('[role="option"]:not([data-disabled])')
				).filter((n): n is HTMLElement => isHTMLElement(n) && !isElementDisabled(n));

				if (!enabled.length) return;

				if (e.key === kbd.ARROW_DOWN) {
					highlightedItem = enabled[0];
					enabled[0].scrollIntoView({ block: scrollAlignment });
				} else if (e.key === kbd.ARROW_UP) {
					highlightedItem = enabled[enabled.length - 1];
					highlightedItem.scrollIntoView({ block: scrollAlignment });
				}
				return;
			}

			// Menu is open
			if (e.key === kbd.TAB) {
				closeMenu();
				return;
			}

			if ((e.key === kbd.ENTER && !e.isComposing) || (e.key === kbd.SPACE && isHTMLButtonElement(node))) {
				e.preventDefault();
				if (highlightedItem) {
					selectItem(highlightedItem);
				}
				if (!(multiple as boolean)) closeMenu();
				return;
			}

			if (e.key === kbd.ARROW_UP && e.altKey) {
				closeMenu();
				return;
			}

			if (FIRST_LAST_KEYS.includes(e.key)) {
				e.preventDefault();
				const menuEl = document.getElementById(ids.menu);
				if (!isHTMLElement(menuEl)) return;

				const items = Array.from(
					menuEl.querySelectorAll('[role="option"]:not([data-disabled])')
				).filter((n): n is HTMLElement => isHTMLElement(n) && !isElementDisabled(n));

				if (!items.length) return;

				const currentIndex = highlightedItem ? items.indexOf(highlightedItem) : -1;
				let nextItem: HTMLElement;

				switch (e.key) {
					case kbd.ARROW_DOWN:
						nextItem = items[(currentIndex + 1) % items.length];
						if (!loop && currentIndex === items.length - 1) nextItem = items[currentIndex];
						break;
					case kbd.ARROW_UP:
						nextItem = items[(currentIndex - 1 + items.length) % items.length];
						if (!loop && currentIndex <= 0) nextItem = items[0];
						break;
					case kbd.HOME:
						nextItem = items[0];
						break;
					case kbd.END:
						nextItem = items[items.length - 1];
						break;
					case kbd.PAGE_DOWN:
						nextItem = items[Math.min(currentIndex + 10, items.length - 1)];
						break;
					case kbd.PAGE_UP:
						nextItem = items[Math.max(currentIndex - 10, 0)];
						break;
					default:
						return;
				}

				highlightedItem = nextItem;
				nextItem?.scrollIntoView({ block: scrollAlignment });
				return;
			}

			if (typeahead) {
				const menuEl = document.getElementById(ids.menu);
				if (isHTMLElement(menuEl)) {
					const items = Array.from(menuEl.querySelectorAll('[role="option"]')).filter(
						(n): n is HTMLElement => isHTMLElement(n) && !isElementDisabled(n)
					);
					const { handleTypeaheadSearch } = createTypeahead();
					handleTypeaheadSearch(e.key, items, (el) => {
						highlightedItem = el;
						el.scrollIntoView({ block: scrollAlignment });
					});
				}
			}
		}

		node.addEventListener('click', onClick);
		node.addEventListener('keydown', onKeyDown);

		return {
			destroy() {
				activeTrigger = null;
				node.removeEventListener('click', onClick);
				node.removeEventListener('keydown', onKeyDown);
			},
		};
	}

	function getTriggerAttrs() {
		return {
			id: ids.trigger,
			role: 'combobox',
			'aria-controls': ids.menu,
			'aria-expanded': open,
			'aria-activedescendant': highlightedItem?.id,
			'data-state': open ? 'open' : 'closed',
			type: 'button' as const,
		};
	}

	// Menu
	let floatingCleanup: (() => void) | null = null;

	function menuAction(node: HTMLElement) {
		function updatePosition() {
			if (!activeTrigger) return;

			const cleanup = useFloating(activeTrigger, node, {
				placement: positioning.placement ?? 'bottom',
				sameWidth: positioning.sameWidth ?? true,
				fitViewport: positioning.fitViewport ?? false,
				gutter: positioning.gutter ?? 5,
			}).destroy;

			floatingCleanup = cleanup;
		}

		// Initial + reactive positioning
		const ro = new ResizeObserver(() => {
			if (open) updatePosition();
		});
		ro.observe(node);

		// Click outside
		function onDocPointerDown(e: PointerEvent) {
			if (!closeOnOutsideClick) return;
			const target = e.target as Node;
			if (node.contains(target)) return;
			if (activeTrigger && activeTrigger.contains(target)) return;
			closeMenu();
		}

		function onDocKeyDown(e: KeyboardEvent) {
			if (e.key !== kbd.ESCAPE) return;
			if (escapeBehavior === 'ignore') return;
			e.preventDefault();
			closeMenu();
		}

		if (isBrowser()) {
			document.addEventListener('pointerdown', onDocPointerDown, true);
			document.addEventListener('keydown', onDocKeyDown);
		}

		// Manage scroll lock
		let scrollCleanup: (() => void) | null = null;
		if (preventScroll) {
			$effect(() => {
				if (open) {
					lockScroll();
					scrollCleanup = () => unlockScroll();
				} else if (scrollCleanup) {
					scrollCleanup();
					scrollCleanup = null;
				}
			});
		}

		// Manage floating when open changes
		$effect(() => {
			if (open && activeTrigger) {
				tick().then(updatePosition);
			} else {
				floatingCleanup?.();
				floatingCleanup = null;
			}
		});

		return {
			destroy() {
				ro.disconnect();
				floatingCleanup?.();
				if (isBrowser()) {
					document.removeEventListener('pointerdown', onDocPointerDown, true);
					document.removeEventListener('keydown', onDocKeyDown);
				}
				scrollCleanup?.();
			},
		};
	}

	function getMenuAttrs() {
		return {
			id: ids.menu,
			role: 'listbox',
			hidden: isVisible ? undefined : true,
			style: isVisible ? undefined : 'display:none',
		};
	}

	// Option
	function optionAction(node: HTMLElement) {
		// Highlight on hover
		let hoverCleanup: (() => void) | null = null;

		if (highlightOnHover) {
			const onMouseOver = () => {
				highlightedItem = node;
			};
			const onMouseLeave = () => {
				// Only clear if this node is currently highlighted
				if (highlightedItem === node) highlightedItem = null;
			};
			node.addEventListener('mouseover', onMouseOver);
			node.addEventListener('mouseleave', onMouseLeave);
			hoverCleanup = () => {
				node.removeEventListener('mouseover', onMouseOver);
				node.removeEventListener('mouseleave', onMouseLeave);
			};
		}

		function onClick(e: MouseEvent) {
			if (isElementDisabled(node)) {
				e.preventDefault();
				return;
			}
			selectItem(node);
			if (!(multiple as boolean)) {
				closeMenu();
			}
		}

		node.addEventListener('click', onClick);

		// Keep highlighted in sync with data-highlighted for styling
		$effect(() => {
			if (highlightedItem === node) {
				node.setAttribute('data-highlighted', '');
			} else {
				node.removeAttribute('data-highlighted');
			}
		});

		return {
			destroy() {
				node.removeEventListener('click', onClick);
				hoverCleanup?.();
			},
		};
	}

	function getOptionAttrs(opt: OptionProps<T>) {
		const selected = isSelected(opt.value);
		return {
			'data-value': JSON.stringify(opt.value),
			'data-label': opt.label,
			'data-disabled': disabledAttr(opt.disabled),
			'aria-disabled': opt.disabled ? 'true' : undefined,
			'aria-selected': selected ? 'true' : 'false',
			'data-selected': selected ? '' : undefined,
			id: generateId(),
			role: 'option',
		};
	}

	// Group helpers (very light)
	function getGroupAttrs(groupId: string) {
		return {
			role: 'group',
			'aria-labelledby': groupId,
		};
	}

	function getGroupLabelAttrs(groupId: string) {
		return { id: groupId };
	}

	// Label
	function labelAction(node: HTMLElement) {
		const onMouseDown = (e: MouseEvent) => {
			if (!e.defaultPrevented && e.detail > 1) e.preventDefault();
		};
		node.addEventListener('mousedown', onMouseDown);
		return {
			destroy() {
				node.removeEventListener('mousedown', onMouseDown);
			},
		};
	}

	function getLabelAttrs() {
		return {
			id: ids.label,
			for: ids.trigger,
		};
	}

	// Public API - shaped similarly to melt-ui for easy porting
	return {
		elements: {
			trigger: {
				action: triggerAction,
				attrs: getTriggerAttrs,
			},
			menu: {
				action: menuAction,
				attrs: getMenuAttrs,
			},
			option: {
				action: optionAction,
				attrs: getOptionAttrs,
			},
			group: getGroupAttrs,
			groupLabel: getGroupLabelAttrs,
			label: {
				action: labelAction,
				attrs: getLabelAttrs,
			},
		},
		states: {
			open: {
				// Allow both direct access and $state-like usage
				get value() {
					return open;
				},
				set value(v: boolean) {
					open = v;
					onOpenChange?.(v);
				},
			},
			selected: {
				get value() {
					return selected;
				},
				set value(v: any) {
					selected = v;
					onSelectedChange?.(v);
				},
			},
			selectedLabel: {
				get value() {
					return selectedLabel;
				},
			},
			highlightedItem: {
				get value() {
					return highlightedItem;
				},
			},
		},
		helpers: {
			isSelected,
			isHighlighted,
			closeMenu,
			openMenu,
		},
		// Also expose raw state for Svelte 5 runes usage (recommended)
		_raw: {
			get open() {
				return open;
			},
			set open(v: boolean) {
				open = v;
				onOpenChange?.(v);
			},
			get selected() {
				return selected;
			},
			set selected(v: any) {
				selected = v;
				onSelectedChange?.(v);
			},
			get selectedLabel() {
				return selectedLabel;
			},
		},
	};
}

/* ============================================================
   ZERO_DEPENDENCY_FALLBACK (only if you refuse to install @floating-ui/dom)

   If you cannot add any npm package, replace the `useFloating` function
   and the import at the top with the simple version below.

   WARNING: You will lose:
     - Automatic flipping when near screen edges
     - `sameWidth` behavior
     - `fitViewport` max-height behavior
     - Proper collision avoidance / shifting

   The menu will just appear directly below the trigger using
   getBoundingClientRect + fixed positioning. Good enough for many cases.

   --- HOW TO USE THE FALLBACK ---
   1. Delete the import from '@floating-ui/dom' at the top.
   2. Replace the entire `useFloating(...)` function in this file with:

   function useFloating(anchor: HTMLElement, floating: HTMLElement) {
     if (!anchor || !floating) return { destroy: () => {} };

     function place() {
       const r = anchor.getBoundingClientRect();
       Object.assign(floating.style, {
         position: 'fixed',
         top: `${r.bottom + 4}px`,
         left: `${r.left}px`,
         minWidth: `${r.width}px`,
         zIndex: '50',
       });
     }
     place();
     const ro = new ResizeObserver(place);
     ro.observe(anchor);
     window.addEventListener('scroll', place, true);
     window.addEventListener('resize', place);

     return {
       destroy() {
         ro.disconnect();
         window.removeEventListener('scroll', place, true);
         window.removeEventListener('resize', place);
       },
     };
   }

   3. Inside `menuAction`, change the call from:
        unsubPopper = useFloating(...)
      to just use the dumb version above (no config needed).

   Most people should just `npm install @floating-ui/dom` instead.
============================================================ */
