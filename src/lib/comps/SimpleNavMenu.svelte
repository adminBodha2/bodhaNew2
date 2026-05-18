<script lang="ts" module>
	let simpleNavId = 0;

	export type SimpleNavMenuLink = {
		label: string;
		href: string;
		description?: string;
		active?: boolean;
		external?: boolean;
		disabled?: boolean;
	};

	export type SimpleNavMenuItem = {
		label: string;
		href?: string;
		value?: string;
		active?: boolean;
		external?: boolean;
		disabled?: boolean;
		links?: SimpleNavMenuLink[];
	};
</script>

<script lang="ts">
	import './simple-navmenu.sass';

	type Props = {
		items: SimpleNavMenuItem[];
		hoverDelay?: number;
		class?: string;
		ariaLabel?: string;
		onOpenChange?: (value: string | null) => void;
	};

	let { items, hoverDelay = 180, class: className = '', ariaLabel = 'Primary navigation', onOpenChange }: Props = $props();

	const idPrefix = `snm-${++simpleNavId}`;
	let openValue = $state<string | null>(null);
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	const hasLinks = (item: SimpleNavMenuItem) => Boolean(item.links?.length);
	const itemValue = (item: SimpleNavMenuItem, index: number) => item.value ?? item.href ?? `${item.label}-${index}`;

	function clearCloseTimer() {
		if (!closeTimer) return;
		clearTimeout(closeTimer);
		closeTimer = null;
	}

	function openMenu(value: string) {
		clearCloseTimer();
		openValue = value;
	}

	function closeMenu() {
		clearCloseTimer();
		openValue = null;
	}

	function scheduleClose() {
		clearCloseTimer();
		closeTimer = setTimeout(() => {
			openValue = null;
			closeTimer = null;
		}, hoverDelay);
	}

	function toggle(value: string) {
		openValue === value ? closeMenu() : openMenu(value);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeMenu();
	}

	function onfocusout(event: FocusEvent) {
		const container = event.currentTarget;
		const next = event.relatedTarget;

		if (!(container instanceof HTMLElement)) return;
		if (!(next instanceof Node) || !container.contains(next)) closeMenu();
	}

	$effect(() => {
		onOpenChange?.(openValue);
	});
</script>

<nav class="snm-root {className}" aria-label={ariaLabel} data-state={openValue ? 'open' : 'closed'}>
	<ul class="snm-list" role="menubar" onpointerenter={clearCloseTimer} onpointerleave={scheduleClose} {onkeydown} {onfocusout}>
		{#each items as item, index (itemValue(item, index))}
			{@const value = itemValue(item, index)}
			{@const isOpen = openValue === value}
			{@const dropdown = hasLinks(item)}

			<li class="snm-item" role="none" data-state={isOpen ? 'open' : 'closed'}>
				{#if dropdown}
					<button class="snm-trigger" type="button" role="menuitem" disabled={item.disabled} aria-expanded={isOpen} aria-haspopup="true" aria-controls={`${idPrefix}-${index}`} data-active={item.active ? 'true' : undefined} data-state={isOpen ? 'open' : 'closed'} onpointerenter={() => openMenu(value)} onfocus={() => openMenu(value)} onclick={() => toggle(value)}>
						<span>{item.label}</span>
						<svg class="snm-chevron" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>

					{#if isOpen}
						<div id={`${idPrefix}-${index}`} class="snm-panel" role="group" data-state="open">
							{#each item.links ?? [] as link (link.href)}
								<a
									class="snm-link"
									role="menuitem"
									href={link.href}
									aria-current={link.active ? 'page' : undefined}
									data-active={link.active ? 'true' : undefined}
									data-disabled={link.disabled ? 'true' : undefined}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noreferrer' : undefined}
									onclick={() => {
										if (!link.disabled) closeMenu();
									}}>
									<span class="snm-link-label">{link.label}</span>
									{#if link.description}
										<span class="snm-link-description">{link.description}</span>
									{/if}
								</a>
							{/each}
						</div>
					{/if}
				{:else if item.href}
					<a class="snm-trigger snm-trigger-link" role="menuitem" href={item.href} aria-current={item.active ? 'page' : undefined} data-active={item.active ? 'true' : undefined} data-disabled={item.disabled ? 'true' : undefined} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
						{item.label}
					</a>
				{:else}
					<span class="snm-trigger" role="menuitem" data-disabled="true">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
