<script lang="ts">
	import { Accordion } from 'bits-ui';
	import Container from '$lib/comps/wrapper.svelte';

	const items = [
		{
			value: 'temple-memory',
			title: 'Temple memory',
			content:
				'Anveshi routes can use accordions to hold layered notes without forcing every detail onto the first screen.'
		},
		{
			value: 'journey-context',
			title: 'Journey context',
			content:
				'Each panel can carry itinerary context, sthala notes, visiting guidance, or links to deeper research pages.'
		},
		{
			value: 'headless-control',
			title: 'Headless control',
			content:
				'Bits UI provides the accessibility and state behavior while the page keeps full control of local Sass styling.'
		}
	];
</script>

<Container>
	<div class="box padded wraps is-first">
		<section class="bits-demo box rgap24">
			<div class="box rgap8">
				<p class="tag-text green tt-u bold tight">Bits UI Demo</p>
				<h5 class="tight">Accordion</h5>
			</div>
			<Accordion.Root class="accordion-root" type="multiple" value={['temple-memory']}>
				{#each items as item}
					<Accordion.Item class="accordion-item" value={item.value}>
						<Accordion.Header>
							<Accordion.Trigger class="accordion-trigger">
								<span>{item.title}</span>
								<span class="accordion-icon" aria-hidden="true">⌄</span>
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content class="accordion-content">
							<p>{item.content}</p>
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</section>
		<section>
			<p class="tag-text">orm 7 creator Takayuki Miyoshi announced at WordCamp Asia 2</p>
			<p class="citation">orm 7 creator Takayuki Miyoshi announced at WordCamp Asia 2orm 7 creator Takayuki Miyoshi announced at WordCamp Asia 2orm 7 creator Takayuki Miyoshi announced at WordCamp Asia 2orm 7 creator Takayuki Miyoshi announced at WordCamp Asia 2</p>
			<p>Contact Form 7 creator Takayuki Miyoshi announced at WordCamp Asia 2026 that version 6.2 will be the plugin's final major release, entering a feature freeze with only security patches going forward. The successor project Contactable.io isn't expected until 2028. A step-by-step migration guide walks WordPress users through switching to WPForms using its built-in Contact Form 7 importer, covering installation, running the import wizard, reviewing migrated forms, replacing old shortcodes/blocks, testing submissions, and finally deactivating Contact Form 7. The free WPForms Lite version </p>
			<p class="paragraph-text">PARAGRAPH -Contact Form 7 creator Takayuki Miyoshi announced at WordCamp Asia 2026 that version 6.2 will be the plugin's final major release, entering a feature freeze with only security patches going forward. The successor project Contactable.io isn't expected until 2028. A step-by-step migration guide walks WordPress users through switching to WPForms using its built-in Contact Form 7 importer, covering installation, running the import wizard, reviewing migrated forms, replacing old shortcodes/blocks, testing submissions, and finally deactivating Contact Form 7. The free WPForms Lite version </p>
			<p class="highlight-text">HIGHLIGHT - Contact Form 7 creator Takayuki Miyoshi announced at WordCamp Asia 2026 that version 6.2 will be the plugin's final major release, entering a feature freeze with only security patches going forward. The successor project Contactable.io isn't expected until 2028. A step-by-step migration guide walks WordPress users through switching to WPForms using its built-in Contact Form 7 importer, covering installation, running the import wizard, reviewing migrated forms, replacing old shortcodes/blocks, testing submissions, and finally deactivating Contact Form 7. The free WPForms Lite version </p>
			<p class="card-title">CARDTITLE - Contact Form 7 creator Takayuki Miyoshi announced at WordCamp Asia 2026 that version 6.2 will be the plugin's final major release, entering a feature freeze with only security patches going forward. The successor project Contactable.io isn't expected until 2028. A step-by-step migration guide walks WordPress users through switching to WPForms using its built-in Contact Form 7 importer, covering installation, running the import wizard, reviewing migrated forms, replacing old shortcodes/blocks, testing submissions, and finally deactivating Contact Form 7. The free WPForms Lite version </p>
		</section>
	</div>
</Container>

<style lang="sass">

	.bits-demo
		max-width: 760px
		margin-inline: auto

	:global(.accordion-root)
		display: grid
		gap: 8px

	:global(.accordion-item)
		overflow: hidden
		border: 1px solid rgba(0, 0, 0, 0.12)
		border-radius: 8px
		background: rgba(255, 255, 255, 0.72)
		width: 400px

	:global(.accordion-trigger)
		width: 100%
		display: flex
		align-items: center
		justify-content: space-between
		gap: 16px
		border: 0
		padding: 16px 18px
		color: var(--color-primary)
		background: transparent
		font: inherit
		font-weight: 700
		text-align: left
		cursor: pointer
		&:hover
			background: rgba(0, 0, 0, 0.04)

	:global(.accordion-trigger[data-state="open"] .accordion-icon)
		transform: rotate(180deg)

	:global(.accordion-icon)
		display: inline-grid
		place-items: center
		width: 24px
		height: 24px
		flex: 0 0 auto
		transition: transform 160ms ease

	:global(.accordion-content)
		padding: 0 18px 18px
		color: #4f4f4f
		p
			margin: 0
			font-size: 14px
			line-height: 1.55
</style>
