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

<div class="blog-card {numbering}">
	<a class="card-media blank" href={link}>
		<img src={image} alt={title} />
		<div class="card-body">
			{#if date && date !== ' '}<p class="card-date">{date}</p>{/if}
			<h3 class="blog-title source-serif">{title}</h3>
			<p class="grey small-text">{excerpt}</p>
		</div>
	</a>
	<div class="row wrap xbetween rgap4 card-bottom">
		<div class="row wrap cgap4 rgap4 ycenter">
			<a class="small-text altcolor blank tt-u" href="/blog/writers/{author}">{author}</a>
			{#if words && words !== ' '}
			<span class="small-text altcolor"> | {words} words</span>
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
	transition: background 0.15s ease
	&:hover
		.blog-title
			color: var(--themeaccent)

.card-media
	display: flex
	flex-direction: column
	flex: 1
	
img
	width: 100%
	aspect-ratio: 16 / 9
	object-fit: cover
	display: block
	@media screen and (max-width: 1024px)
		height: 240px

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

a.altcolor
	&:hover
		color: var(--theme)

.card-words
	font-size: 0.72rem
	color: var(--themeaccent)


</style>
