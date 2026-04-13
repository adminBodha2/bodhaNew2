<script lang="ts">

  import { onMount } from 'svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  import Head from '$lib/comps/headcomponent.svelte'
  import { fullLab } from '$lib/utils/localpulls'

  $metaTitle = 'Bodha Lab'
  $metaDescription = 'Bodha Lab documents our ongoing work, opinions, readings, and deep research.'
  $metaUrl = 'https://www.bodharesearch.in/lab'
  $metaImage = '/images/bodhacover.png'

  let labItems: any[] = []
  let categoryCount = 0

  onMount(async () => {
    labItems = await fullLab()
    const cats = new Set(labItems.map((i: any) => i.meta.category))
    categoryCount = cats.size
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}/>

<section class="lab-landing content-area">
	<h2 class="source-serif tight pbot16">Working notes, <br>ongoing inquiries, and more...</h2>
  	<p class="grey sm pbot32">Ongoing opinions, readings, reports, and deep research notes — published as they develop.</p>
	<div class="box-2">
		{#if labItems.length > 0}
			<div class="grid three stacked-2">
				{#each labItems as item}
					<div class="column">
						<div class="row ycenter xbetween">
							<small class="blue tt-u">{item.meta.category}</small>
							<small class="lgrey">{item.formattedDate}</small>
						</div>
						<p class="big"><a href={item.linkpath} class="blank"><b>{item.meta.title}</b></a></p>
						<p class="sm grey">{item.meta.excerpt}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
