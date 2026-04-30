<script lang="ts">
	export let title = ' '
	export let link = ' '
	export let image = ' '
	export let date = ' '
	export let excerpt = ' '
	export let author = ' '
	export let words = ' '
	export let numbering = ' '
</script>

<div class="blog-card {numbering} flowing">
	<a class="card-media blank img-title-desc" href={link}>
		<div class="image-box">
			<img src={image} alt={title} />
		</div>
		<div class="card-body">
			{#if date && date !== ' '}<p class="tag-text lgrey">{date}</p>{/if}
			<p class="card-title source-serif">{title}</p>
			<p class="grey descriptor-text">{excerpt}</p>
		</div>
	</a>
	<div class="column rgap8 card-bottom post-metadata">
		<div class="row wrap cgap4 rgap4 ycenter">
			<a class="descriptor-text grey blank tt-u" href="/blog/writers/{author}">{author}</a>
			{#if words && words !== ' '}
			<span class="descriptor-text lgrey"> | {words} words</span>
			{/if}
		</div>
		<div class="row wrap cgap4 rgap4">
			<slot />
		</div>
	</div>
</div>

<style lang="sass">

.blog-card
	display: flex
	flex-direction: column
	&:hover
		img
			transform: scale(1.05)
	&.slate
		background: var(--color-back)
		&:hover
			background: var(--color-stone)

.card-media
	display: flex
	flex-direction: column
	flex: 1
	
img
	width: 100%
	height: 100%
	object-fit: cover
	transition: all 0.22s cubic-bezier(0.145, 0.495, 0.955, 0.645)

.image-box
	overflow: hidden
	height: 240px
	@media screen and (max-width: 1024px)
		height: 200px

.card-body
	display: flex
	flex-direction: column
	gap: 0.5rem
	padding: 1.2rem 1.4rem
	flex: 1

.card-date
	font-size: 0.75rem
	color: var(--text-ghost)
	margin: 0

.card-bottom
	padding: 0.8rem 1.4rem
	border-top: 1px solid rgba(0,0,0,0.06)

.card-words
	font-size: 0.72rem
	color: var(--color-theme-4)


</style>
