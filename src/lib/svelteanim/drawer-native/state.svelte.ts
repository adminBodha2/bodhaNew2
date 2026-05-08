import { getContext, setContext } from 'svelte'

const KEY = Symbol('drawer')

export type DrawerDirection = 'bottom' | 'top' | 'left' | 'right'

export class DrawerState {
	open = $state(false)
	direction: DrawerDirection = $state('bottom')
	dismissible = $state(true)
	closeThreshold = $state(0.4)

	dragOffset = $state(0)
	dragging = $state(false)

	constructor(opts: {
		direction?: DrawerDirection
		dismissible?: boolean
		closeThreshold?: number
	} = {}) {
		this.direction = opts.direction ?? 'bottom'
		this.dismissible = opts.dismissible ?? true
		this.closeThreshold = opts.closeThreshold ?? 0.4
	}

	openDrawer = () => {
		this.open = true
	}

	closeDrawer = () => {
		this.open = false
		this.dragOffset = 0
		this.dragging = false
	}

	toggle = () => {
		this.open ? this.closeDrawer() : this.openDrawer()
	}
}

export function setDrawerContext(s: DrawerState) {
	setContext(KEY, s)
}

export function getDrawerContext(name = 'Drawer component'): DrawerState {
	const ctx = getContext<DrawerState>(KEY)
	if (!ctx) throw new Error(`${name} must be used inside <Drawer.Root>`)
	return ctx
}
