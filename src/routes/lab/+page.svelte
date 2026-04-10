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

<div class="lab-landing">
  <p class="lab-landing-eyebrow">Bodha Lab</p>
  <h1 class="lab-landing-title">Working notes,<br>in the open.</h1>
  <p class="lab-landing-desc">Ongoing opinions, readings, reports, and deep research notes — published as they develop.</p>

  {#if labItems.length > 0}
    <!--
    <div class="lab-stats-row">
      <div class="lab-stat">
        <span class="lab-stat-num">{labItems.length}</span>
        <span class="lab-stat-label">notes</span>
      </div>
      <div class="lab-stat">
        <span class="lab-stat-num">{categoryCount}</span>
        <span class="lab-stat-label">categories</span>
      </div>
    </div>
    -->
    <div class="lab-cards-wrap">
      <div class="lab-cards-grid">
        {#each labItems as item}
          <a class="lab-card p32" href={item.linkpath}>
            <div class="lab-card-meta">
              <span class="lab-card-cat">
                <i class={
                  item.meta.category === 'Books' ? 'ri-book-2-fill ri-1x' :
                  item.meta.category === 'Opinions' ? 'ri-chat-voice-fill ri-1x' :
                  'ri-sticky-note-fill ri-1x'
                }></i>
                {item.meta.category}
              </span>
              <span class="lab-card-date">{item.formattedDate}</span>
            </div>
            <p class="lab-card-title">{item.meta.title}</p>
            <p class="lab-card-excerpt">{item.meta.excerpt}</p>
          </a>
        {/each}
      </div>
    </div>

  {/if}

</div>
