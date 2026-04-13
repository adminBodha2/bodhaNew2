<script lang="ts">

  import { onMount } from 'svelte'
  import { anveshiFaqs } from '$lib/utils/supabaseClient'
  import autoAnimate from '@formkit/auto-animate'
  import Title from '$lib/comps/page-title.svelte'
  import ChevD from '$lib/icons/chevron-down.svelte'

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

<div class="column ytop rgap32">
	<Title anveshi={true} text="Frequently Asked Questions"/>
    {#if faqs && faqs.length > 0}
      <div class="grid two stacked-22">
        {#each faqs as item, i}
          <button class="blank column ytop rgap4 ta-l xleft acco-box" use:autoAnimate on:click={() => openIndex = openIndex === i ? null : i}>
            <div class="row ycenter cgap16 width100 inside-acco">
              <p class="tight bold">{item.question}</p>
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

.inside-acco
	@media screen and (min-width: 1025px)
		justify-content: space-between

.acco-box
	border-bottom: 1px solid var(--grey-sm)
	padding-bottom: 1.5rem
	&:last-child
		border-bottom: none
		padding-bottom: 0

</style>