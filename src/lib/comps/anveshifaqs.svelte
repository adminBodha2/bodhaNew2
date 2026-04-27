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

<div class="box std">
	<Title isCenter={isCenter} anveshi={true} text="Frequently Asked Questions"/>
    {#if faqs && faqs.length > 0}
      <div class="grid standard-grid two whiten">
        {#each faqs as item, i}
          <button class="blank column ytop rgap4 ta-l xleft acco-box border{i}" class:openedbox={openIndex === i} use:autoAnimate on:click={() => openIndex = openIndex === i ? null : i}>
            <div class="row ycenter cgap16 width100 inside-acco radius">
              <p>{item.question}</p>
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

pre
	font-family: var(--fontface-sans)
	line-height: 1.5

.acco-box
	padding: 1rem
	border-bottom: 1px solid #e7e7e7
	&:last-child
		border-bottom: none
	&:hover
		background: var(--color-stone)
	&.openedbox
		background: var(--color-stone)
		row-gap: 0.5rem
		pre
			background: var(--color-white)
			border: var(--border-dark)
			padding: 1rem
	@media screen and (min-width: 1025px)
		padding: 1rem
		&.openedbox
			row-gap: 1rem
			pre
				padding: 1rem

.border0, .border2, .border4, .border6, .border8, .border10, .border12
	border-right: 1px solid #e7e7e7

</style>