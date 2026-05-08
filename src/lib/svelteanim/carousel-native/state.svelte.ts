import { getContext, setContext } from 'svelte'

const KEY = Symbol('carousel')

export type Orientation = 'horizontal' | 'vertical'

export class CarouselState {
	orientation: Orientation = $state('horizontal')
	loop: boolean = $state(false)
	containerEl: HTMLElement | null = $state(null)

	scrollPosition = $state(0)
	viewSize = $state(0)
	contentSize = $state(0)

	canScrollPrev = $derived(this.loop ? true : this.scrollPosition > 1)
	canScrollNext = $derived(
		this.loop ? true : this.scrollPosition + this.viewSize < this.contentSize - 1
	)

	selectedIndex = $derived(
		this.viewSize > 0 ? Math.round(this.scrollPosition / this.viewSize) : 0
	)

	private axis() {
		return this.orientation === 'horizontal' ? 'x' : 'y'
	}

	measure = () => {
		const el = this.containerEl
		if (!el) return
		if (this.axis() === 'x') {
			this.scrollPosition = el.scrollLeft
			this.viewSize = el.clientWidth
			this.contentSize = el.scrollWidth
		} else {
			this.scrollPosition = el.scrollTop
			this.viewSize = el.clientHeight
			this.contentSize = el.scrollHeight
		}
	}

	scrollTo = (index: number, smooth = true) => {
		const el = this.containerEl
		if (!el || this.viewSize === 0) return
		const target = index * this.viewSize
		const max = Math.max(0, this.contentSize - this.viewSize)
		const clamped = this.loop
			? ((target % this.contentSize) + this.contentSize) % this.contentSize
			: Math.min(Math.max(0, target), max)
		const opts: ScrollToOptions = { behavior: smooth ? 'smooth' : 'auto' }
		if (this.axis() === 'x') opts.left = clamped
		else opts.top = clamped
		el.scrollTo(opts)
	}

	scrollPrev = () => this.scrollTo(this.selectedIndex - 1)
	scrollNext = () => this.scrollTo(this.selectedIndex + 1)

	handleKeyDown = (e: KeyboardEvent) => {
		const prevKey = this.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
		const nextKey = this.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
		if (e.key === prevKey) {
			e.preventDefault()
			this.scrollPrev()
		} else if (e.key === nextKey) {
			e.preventDefault()
			this.scrollNext()
		}
	}
}

export function setCarouselContext(s: CarouselState) {
	setContext(KEY, s)
}

export function getCarouselContext(name = 'Carousel component'): CarouselState {
	const ctx = getContext<CarouselState>(KEY)
	if (!ctx) throw new Error(`${name} must be used inside <Carousel.Root>`)
	return ctx
}
