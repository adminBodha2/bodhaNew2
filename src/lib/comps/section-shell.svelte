<script lang="ts">
	import type { Snippet } from 'svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Blur from '$lib/svelteanim/components/Blur.svelte';

	type Props = {
		title: string;
		alternate?: boolean;
		animation?: 'slide' | 'reveal' | 'blur' | 'none';
		stagger?: number;
		classes?: string;
		children: Snippet;
	};

	let {
		title,
		alternate = false,
		animation = 'slide',
		stagger = 0,
		classes = '',
		children
	}: Props = $props();
</script>

<section class="wrapper-std growingline {alternate ? 'alternate' : ''} {classes}">
	<Title text={title} />
	{#if animation === 'slide'}
		<Slide targetSelector=".section-content" {stagger}>
			<div class="section-content">
				{@render children?.()}
			</div>
		</Slide>
	{:else if animation === 'reveal'}
		<Reveal>
			{@render children?.()}
		</Reveal>
	{:else if animation === 'blur'}
		<Blur>
			{@render children?.()}
		</Blur>
	{:else}
		{@render children?.()}
	{/if}
</section>
