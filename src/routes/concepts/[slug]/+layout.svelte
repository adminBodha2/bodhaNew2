<script lang="ts">
	import type { LayoutProps } from './$types';
	import Container from '$lib/comps/wrapper.svelte'
	import '$lib/styles/system/document-layout.sass';

	let { data, children }: LayoutProps = $props();
</script>

<Container>
	<section class="docgrid scrollside">
		<div class="docside">
			<div class="doclist">
				<div class="box rgap16 ptop16">
					{#each data.domains as domain (domain.id)}
						<a class="doclink blank box rgap4 p12" href={`/concepts/${domain.slug}`}>
							{domain.title}
						</a>
					{/each}
				</div>
			</div>
		</div>
		<div class="docmain rgap32 box pbot32">
			{@render children?.()}
		</div>
	</section>
</Container>
