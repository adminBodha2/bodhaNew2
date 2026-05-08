<script lang="ts">
	import * as Carousel from './index.js'
</script>

<div style="max-width: 24rem; margin: 0 auto;">
	<Carousel.Root>
		<Carousel.Content>
			{#each Array(5) as _, i}
				<Carousel.Item>
					<div
						style="display:flex;align-items:center;justify-content:center;height:12rem;border:1px solid #ddd;border-radius:0.5rem;font-size:2rem;font-weight:600;"
					>
						{i + 1}
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
