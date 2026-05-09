<script lang="ts">
	import type { WipeScene } from './demoScenes';
	import { scenePath, wipeScenes } from './demoScenes';

	let { scene }: { scene: WipeScene } = $props();
</script>

<section class="wipe-scene" style={`--accent:${scene.accent};--scene-background:${scene.background}`}>
	<div class="scene-content">
		<h1>{scene.title}</h1>
		<p class="description">{scene.description}</p>

		<div class="actions">
			{#each wipeScenes as item}
				<a class:active={item.slug === scene.slug} href={scenePath(item)}>
					<span>{item.symbol}</span>
					{item.title}
				</a>
			{/each}
		</div>
	</div>

	<div class="scene-mark" aria-hidden="true">
		<span>{scene.symbol}</span>
	</div>
</section>

<style lang="sass">
.wipe-scene
	position: relative
	min-height: calc(100vh - 80px)
	display: grid
	grid-template-columns: minmax(0, 1fr) minmax(280px, 0.7fr)
	align-items: center
	gap: 32px
	padding: 180px max(24px, calc((100vw - 1120px) / 2)) 80px
	background: var(--scene-background)
	overflow: hidden

.scene-content
	position: relative
	z-index: 2
	max-width: 720px

h1
	margin: 0
	color: #fffaf0
	font-size: clamp(56px, 9vw, 132px)
	line-height: 0.88
	letter-spacing: 0

.description
	max-width: 560px
	margin: 28px 0 0
	color: rgba(255,250,240,0.78)
	font-size: clamp(18px, 2vw, 24px)
	line-height: 1.35

.actions
	display: flex
	flex-wrap: wrap
	gap: 10px
	margin-top: 38px
	a
		display: inline-flex
		align-items: center
		gap: 10px
		min-height: 44px
		padding: 10px 14px
		border: 1px solid rgba(255,255,255,0.18)
		border-radius: 7px
		color: #fffaf0
		background: rgba(255,255,255,0.07)
		text-decoration: none
		font-size: 13px
		&:hover,
		&.active
			border-color: color-mix(in srgb, var(--accent), white 20%)
			background: color-mix(in srgb, var(--accent), transparent 82%)
		span
			color: var(--accent)
			font-weight: 700

.scene-mark
	position: relative
	z-index: 1
	justify-self: center
	display: grid
	width: min(34vw, 360px)
	aspect-ratio: 1
	place-items: center
	border: 1px solid rgba(255,255,255,0.12)
	border-radius: 50%
	background: radial-gradient(circle, color-mix(in srgb, var(--accent), transparent 70%), rgba(255,255,255,0.04))
	box-shadow: inset 0 0 90px rgba(255,255,255,0.08), 0 42px 120px rgba(0,0,0,0.36)
	span
		color: rgba(255,255,255,0.9)
		font-size: clamp(80px, 12vw, 150px)
		font-weight: 700
		letter-spacing: 0

@media screen and (max-width: 820px)
	.wipe-scene
		min-height: calc(100vh - 64px)
		grid-template-columns: 1fr
		align-content: center
		padding: 150px 20px 48px

	.scene-mark
		width: min(72vw, 300px)
		order: -1
		margin-top: 16px

	.actions
		a
			width: 100%
</style>
