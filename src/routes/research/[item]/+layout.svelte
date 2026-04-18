<script lang="ts">
	import { onMount } from 'svelte';
	import { allResearch } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Title from '$lib/comps/page-title.svelte'

	let projects: any;

	onMount(async () => {
		projects = await allResearch();
	});
</script>

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<slot />
	{#if projects && projects.length > 0}
	<div class="box std bordertop ptop64">
		<Title text="All Projects"/>
		<div class="grid three standard-grid">
			{#each projects as item}
			<a class="project-card box textbox blank number" href={item.linkpath}>
				<p class="card-title">{item.meta.title}</p>
				<p class="project-desc">{item.meta.description}</p>
				{#if item.meta.tags?.length}
				<div class="project-tags row wrap cgap8">
					{#each item.meta.tags as tag}
					<span class="tag-pill tt-u">{tag.replaceAll('-', ' ')}</span>
					{/each}
				</div>
				{/if}
			</a>
			{/each}
		</div>
	</div>
	{/if}

</div>
</Container>

<style lang="sass">

.section-block
	display: flex
	flex-direction: column
	gap: var(--gap-text)
	padding-top: var(--gap-std)
	border-top: 1px solid rgba(0,0,0,0.06)


.projects-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (min-width: 631px) and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)

.project-card
	padding: 1.4rem

.project-title
	font-size: 0.95rem
	font-weight: 400
	line-height: 1.3
	letter-spacing: -0.01em
	color: #111
	margin: 0
	transition: color 0.15s ease

.project-desc
	font-size: 0.82rem
	line-height: 1.65
	color: #777
	margin: 0

.project-tags
	margin-top: auto

.tag-pill
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--text-ghost)

</style>
