import { getContext, setContext } from 'svelte'

const ROOT_KEY = Symbol('navmenu-root')
const ITEM_KEY = Symbol('navmenu-item')

export class NavMenuState {
	value = $state<string | null>(null)
	hoverDelay: number
	private closeTimer: ReturnType<typeof setTimeout> | null = null

	constructor(opts: { hoverDelay?: number } = {}) {
		this.hoverDelay = opts.hoverDelay ?? 200
	}

	open = (v: string) => {
		this.cancelClose()
		this.value = v
	}

	close = () => {
		this.cancelClose()
		this.value = null
	}

	toggle = (v: string) => {
		this.value === v ? this.close() : this.open(v)
	}

	scheduleClose = () => {
		this.cancelClose()
		this.closeTimer = setTimeout(() => {
			this.value = null
			this.closeTimer = null
		}, this.hoverDelay)
	}

	cancelClose = () => {
		if (this.closeTimer) {
			clearTimeout(this.closeTimer)
			this.closeTimer = null
		}
	}
}

export function setNavMenuContext(s: NavMenuState) {
	setContext(ROOT_KEY, s)
}

export function getNavMenuContext(): NavMenuState {
	const ctx = getContext<NavMenuState>(ROOT_KEY)
	if (!ctx) throw new Error('NavigationMenu component must be used inside <NavigationMenu>')
	return ctx
}

export function setNavItemContext(value: string) {
	setContext(ITEM_KEY, value)
}

export function getNavItemContext(): string {
	const v = getContext<string>(ITEM_KEY)
	if (!v) throw new Error('Component must be used inside <NavigationMenuItem>')
	return v
}

let idCounter = 0
export function autoItemValue() {
	return `nm-item-${++idCounter}`
}
