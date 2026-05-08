export function portal(node: HTMLElement, target: HTMLElement | string = 'body') {
	let resolved: HTMLElement | null = null

	function update(t: HTMLElement | string) {
		if (typeof document === 'undefined') return
		const el = typeof t === 'string' ? document.querySelector<HTMLElement>(t) : t
		if (!el) throw new Error(`portal: target ${t} not found`)
		resolved = el
		resolved.appendChild(node)
	}

	update(target)

	return {
		update,
		destroy() {
			if (node.parentNode) node.parentNode.removeChild(node)
		}
	}
}
