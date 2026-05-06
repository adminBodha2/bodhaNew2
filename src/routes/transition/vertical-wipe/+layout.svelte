<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import { scenePath, wipeScenes } from './demoScenes';

	let { children }: { children: Snippet } = $props();

	const transitionClass = 'vertical-wipe-demo-transition';

	function isDemoPath(pathname: string) {
		return pathname === '/transition/vertical-wipe' || pathname.startsWith('/transition/vertical-wipe/');
	}

	function armWipeTransition() {
		if (!browser) return;
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		document.documentElement.classList.add(transitionClass);
	}

	onNavigate((navigation) => {
		const fromPath = navigation.from?.url.pathname;
		const toPath = navigation.to?.url.pathname;

		if (!toPath || fromPath === toPath) return;
		if (!isDemoPath(toPath)) return;

		armWipeTransition();
	});

	afterNavigate(() => {
		if (!browser) return;

		window.setTimeout(() => {
			document.documentElement.classList.remove(transitionClass);
		}, 720);
	});
</script>

<div class="wipe-demo-shell">
	<nav class="wipe-demo-nav" aria-label="Vertical wipe demo scenes">
		<a class="home-link" href="/transition/vertical-wipe">Wipe Demo</a>
		<div class="scene-links">
			{#each wipeScenes as scene}
				<a href={scenePath(scene)}>{scene.symbol}</a>
			{/each}
		</div>
	</nav>

	{@render children()}
</div>

<style lang="sass">
.wipe-demo-shell
	min-height: calc(100vh - 72px)
	background: #050506
	color: #f7f2e8
	overflow: clip

:global(.pos-fixed)
	display: none

:global(footer),
:global(button.for-mobile)
	display: none

.wipe-demo-nav
	position: fixed
	z-index: 30
	left: 50%
	top: 96px
	width: min(920px, calc(100vw - 32px))
	transform: translateX(-50%)
	display: flex
	align-items: center
	justify-content: space-between
	gap: 16px
	padding: 10px 12px
	border: 1px solid rgba(255,255,255,0.18)
	border-radius: 8px
	background: rgba(8,8,9,0.48)
	backdrop-filter: blur(16px)

.home-link,
.scene-links a
	color: #f7f2e8
	text-decoration: none
	font-size: 12px
	text-transform: uppercase
	letter-spacing: 0.08em

.scene-links
	display: flex
	gap: 8px
	a
		display: grid
		width: 36px
		height: 32px
		place-items: center
		border: 1px solid rgba(255,255,255,0.16)
		border-radius: 6px
		background: rgba(255,255,255,0.06)
		&:hover
			background: rgba(255,255,255,0.14)

:global(html.vertical-wipe-demo-transition::view-transition-old(page)),
:global(html.vertical-wipe-demo-transition::view-transition-new(page))
	animation: none
	mix-blend-mode: normal

:global(html.vertical-wipe-demo-transition::view-transition-old(page))
	z-index: 1

:global(html.vertical-wipe-demo-transition::view-transition-new(page))
	z-index: 2
	animation: vertical-wipe-demo 560ms cubic-bezier(0.76, 0, 0.24, 1) both

@keyframes vertical-wipe-demo
	from
		clip-path: inset(0 0 100% 0)
	to
		clip-path: inset(0 0 0 0)

@media (prefers-reduced-motion: reduce)
	:global(html.vertical-wipe-demo-transition::view-transition-new(page))
		animation: none

@media screen and (max-width: 720px)
	.wipe-demo-shell
		min-height: calc(100vh - 64px)

	.wipe-demo-nav
		top: 76px
		width: calc(100vw - 24px)

	.home-link,
	.scene-links a
		font-size: 11px

	.scene-links a
		width: 32px
		height: 30px
</style>
