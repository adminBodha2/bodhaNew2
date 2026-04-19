<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte'
	export let data;
	const { path } = data;
</script>


<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Paths" item2Link="/paths" showT={true} title={path.title} showD={true} desc={path.description} showRow={true}>
			<p class="citation tt-u w500 blue">{path.subtitle}</p>
		</Crumb>
		<div class="grid three nodes">
			{#each path.steps as step, i}
				<a class="blank box node-box textbox card-padded lining{i}" href="{step.node.meta?.route}/{step.node.slug}">
					<p class="label">{i + 1}</p>
					<p class="citation-big thin tt-u lgrey">{step.node.type}</p>
					<h2 class="header-type-p">{step.node.title}</h2>
					<p class="small-text grey tight">{step.node.description}</p>
					{#if step.node.classification?.tags}
						<div class="row wrap cgap4 rgap4">
							{#each step.node.classification.tags as tag, i}
								{#if tag !== ""}
								<p class="tag-pill hollow tight tt-u">{#if i > 0} | {/if} {tag}</p>
								{/if}
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.nodes
	border: var(--stroke-medium)
	.node-box
		&:hover
			background: var(--stone)

.lining0, .lining1, .lining3, .lining4
	@media screen and (min-width: 1025px)
		border-right: var(--stroke-medium)

.lining0, .lining1, .lining2
	@media screen and (min-width: 1025px)
		border-bottom: var(--stroke-medium)

</style>