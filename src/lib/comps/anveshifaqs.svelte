<script lang="ts">

  import { onMount } from 'svelte'
  import { anveshiFaqs } from '$lib/utils/supabaseClient'
  import autoAnimate from '@formkit/auto-animate'
  import Title from '$lib/comps/page-title.svelte'
  import ChevD from '$lib/icons/chevron-down.svelte'
	export let isCenter = false

  let faqs:any
  let openIndex: number | null = null;
  let iW:number

  onMount(() => {
    (async() => {
      faqs = await anveshiFaqs();
    })();
  })

</script>

<svelte:window bind:innerWidth={iW}/>

<div class="box rgap32 lg:rgap64">
	<Title isCenter={isCenter} anveshi={true} text="Frequently Asked Questions"/>
    {#if faqs && faqs.length > 0}
      <div class="grid grid-cols-1 lg:grid-cols-2 white-grid" use:autoAnimate>
        {#each faqs as item, i}
          <button class="blank box ytop rgap4 ta-l xleft acco-box border{i}" class:openedbox={openIndex === i} use:autoAnimate on:click={() => openIndex = openIndex === i ? null : i}>
            	<div class="row ycenter xbetween cgap16 inside-acco radius">
              		<p class="paragraph-text w500">{item.question}</p>
             	 			{#if iW > 1024}
              				<ChevD fill="var(--color-anveshi)" rotated={openIndex === i}/>
              				{/if}
            	</div>
            {#if openIndex === i}
              <pre class="altprim">{item.answer}</pre>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
</div>

<style lang="sass">

.acco-box
	padding: 1rem
	border-bottom: 1px solid var(--color-stone-2)
	width: 100%
	background: var(--color-back)
	&:last-child
		border-bottom: none
	&:hover
		background: var(--color-stone-0)
	.inside-acco
		width: 100%
	&.openedbox
		background: var(--color-stone-0)
		row-gap: 0.5rem
		pre
			background: var(--color-back)
			border: var(--border-dark)
			padding: 1rem
	@media screen and (min-width: 1025px)
		padding: 1rem
		width: 100%
		.inside-acco
			width: 100%
		&.openedbox
			row-gap: 1rem
			pre
				padding: 1rem

.border0, .border2, .border4, .border6, .border8, .border10, .border12
	border-right: 1px solid var(--color-stone-2)


pre
	font-family: var(--fontface-sans)
	line-height: 1.5
	font-size: 1.1rem
	border-radius: 8px

</style>
