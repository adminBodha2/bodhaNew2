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
              <p class="para-text w500">{item.question}</p>
              {#if iW > 1024}
              <ChevD fill="var(--anveshi-color)" rotated={openIndex === i}/>
              {/if}
            </div>
            {#if openIndex === i}
              <pre class="grey">{item.answer}</pre>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
</div>

<style lang="sass">

pre
	font-family: var(--fontface-sans-flex)
	font-size: 0.875rem
	line-height: 1.5

.acco-box
	padding: 0.5rem
	border-bottom: 1px solid #e7e7e7
	&:last-child
		border-bottom: none
	&:hover
		background: var(--stone)
	&.openedbox
		background: var(--stone)
		row-gap: 0.5rem
		pre
			background: #FFFFFF
			border: var(--stroke-focus)
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