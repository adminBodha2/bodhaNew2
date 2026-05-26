<script lang="ts">

	import type { Snippet } from 'svelte';

type Props = { 
		children?: Snippet;
		image?: string;
		title?:string;
		link?:string;
		desc?:string;
		author?:string;
		words?:string;
		shutAuth?:boolean;
		shutTag?:boolean;
		className?:string;
}

	let {
		children,
		image =" ",
		title = " ",
		link = " ",
		desc = " ",
		author = " ",
		words = " ",
		shutAuth = false,
		shutTag = false,
		className = "slide-item",
	}: Props = $props();

</script>

<div class="box b-main blog-item {className}">
	<div class="p8">
		<img class="fitted landscape radius4" src={image} alt={title} />
	</div>
	<a class="blank box rgap16 p16" style="height: 100%" href={link}>
						<p class="txt-xl w600">{title}</p>
						<p class="lh14 grey1">{desc}</p>
	</a>
	<div class="box self-bottom bordertop ptop8 rgap4 p16">
		<p class="txt-sm tt-u w500">{#if !shutAuth}{author} | {/if} {words} words</p>
		{#if !shutTag}
						<div class="row wrap essay-tags rgap4 cgap4">
	{@render children?.()}
						</div>
		{/if}
	</div>
</div>