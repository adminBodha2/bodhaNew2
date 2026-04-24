<script lang="ts">
	type Props = {
		title: string;
		metaDescription: string;
		metaUrl: string;
		metaImage: string;
		imWidth?: string;
		imHeight?: string;
		ogType?: string;
		jsonld?: string;
	};
	let {
		title,
		metaDescription,
		metaUrl,
		metaImage,
		imWidth = "1200",
		imHeight = "675",
		ogType = "website",
		jsonld = ''
	}: Props = $props();
</script>

<svelte:head>
	{#if jsonld}
		{@html `<script type="application/ld+json">${jsonld}</script>`}
	{/if}
	<title>{title}</title>
	<meta name="description" content={metaDescription} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content="Bodha" />
	<meta property="og:url" content={metaUrl} />
	<meta property="og:image" content={metaImage} />
	<meta property="og:image:alt" content="{title} hero image" />
	<meta property="og:image:width" content={imWidth} />
	<meta property="og:image:height" content={imHeight} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:url" content={metaUrl} />
	<meta name="twitter:image" content={metaImage} />
	<meta name="twitter:image:alt" content="{title} hero image" />
	<meta name="twitter:creator" content="@bodharesearch" />
	<meta name="twitter:site" content="@bodharesearch" />
	<meta property="og:locale" content="en_IN" />
	<link rel="canonical" href={metaUrl} />
	<meta name="robots" content="index, follow" />
</svelte:head>
