<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Container from '$lib/comps/wrapper.svelte';
	import Heading from '$lib/comps/page-header-one.svelte';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let writerName = $derived(data.writerName);
	let posts = $derived(data.posts ?? []);
	let mobileMenuOpen = $state(false);
	let firstMenuItem: HTMLButtonElement | undefined = $state();

	let title = $derived('Essays by ' + writerName + ' | Bodha Blog');
	let metaDescription = $derived('Read all essays by ' + writerName + ' at Bodha Blog.');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: posts.map((post: any) => ({
					name: post.meta.title,
					url: post.linkpath
			}))
			})
		)
	);

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMobileMenu();
		}
	}

	$effect(() => {
		if (!mobileMenuOpen) return;

		tick().then(() => {
			firstMenuItem?.focus();
		});
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />
<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />


<Container>
	<Heading title={writerName}/>
	<div class="textbox blog-wrapper">
		<Crumb/>
		<div class="row cgap8 rgap8 mwrap xleft selection-row ycenter">
			<p class="tag-text tt-u" style="margin-right: 1rem; font-weight: bold">Writings by {writerName}</p>
			<a class="small-button tt-u" href="/blog">Blog Main</a>
			<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
			<a class="small-button tt-u" href="/blog/writers">Writers</a>
			<a class="small-button tt-u" href="/blog/tags">Tags</a>
		</div>
		<div class="mobile-selection-menu">
			<button
				class="mobile-menu-trigger"
				type="button"
				aria-haspopup="menu"
				aria-expanded={mobileMenuOpen}
				aria-controls="test-anveshi-selection-menu"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<span class="row ycenter cgap8">
					<BlogMenu size="20" color="currentColor" />
					<span>Browse</span>
				</span>
				<span class="menu-state" aria-hidden="true">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
			</button>
			{#if mobileMenuOpen}
				<button class="mobile-menu-scrim" type="button" aria-label="Close menu" onclick={closeMobileMenu}></button>
				<div id="test-anveshi-selection-menu" class="mobile-menu-content" role="menu" aria-label="Blog navigation">
					<div class="mobile-menu-arrow"></div>
					<button
						bind:this={firstMenuItem}
						class="mobile-menu-item active"
						type="button"
						role="menuitem"
						onclick={closeMobileMenu}
					>
						<span>{writerName}</span>
					</button>
					<a class="mobile-menu-item" role="menuitem" href="/blog" onclick={closeMobileMenu}>
						<span>Blog Main</span>
					</a>
					<a class="mobile-menu-item" role="menuitem" href="/blog/external-posts" onclick={closeMobileMenu}>
						<span>External Posts</span>
					</a>
					<a class="mobile-menu-item" role="menuitem" href="/blog/writers" onclick={closeMobileMenu}>
						<span>Writers</span>
					</a>
					<a class="mobile-menu-item" role="menuitem" href="/blog/tags" onclick={closeMobileMenu}>
						<span>Tags</span>
					</a>
				</div>
			{/if}
		</div>
		<div class="grid four white-grid">
			{#each posts as item}
				<div class="box whitestone">
					<a class="blank blog-image-box" href={item.linkpath}>
						<img src={item.meta.image} alt={item.meta.title}/>
					</a>
					<div class="box blog-rest">
						<a class="blank labelbox blog-text-box tight-padded" href={item.linkpath}>
							<p class="paragraph-text bold tight">{item.meta.title}</p>
							<p class="descriptor-text grey tight">{item.meta.excerpt}</p>
							<p class="tag-text tt-u">{item.meta.words} words</p>
						</a>
					</div>
					<div class="row wrap self-bottom bordertop tight-padded rgap4 cgap4">
						{#each item.meta.tags as tag}
							<p class="tag-pill tt-u">{tag.replaceAll('-',' ')}</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.blog-image-box
	img
		object-fit: cover
		width: 100%
		height: 160px
	@media screen and (min-width: 1025px)
		img
			height: 200px

.blog-wrapper
	padding-top: 5rem
	@media screen and (min-width: 1025px)
		padding-top: 6rem

.mobile-selection-menu
	display: none
	position: relative
	z-index: 20

.mobile-menu-trigger
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.8rem 0.9rem
	border: var(--border-dark)
	border-radius: 5px
	background: var(--color-grey-4)
	color: var(--color-back)
	font-family: var(--fontface-sans)
	font-size: 0.78rem
	font-weight: 700
	letter-spacing: 0.02rem
	text-transform: uppercase
	box-shadow: var(--shadow11)
	&:hover
		background: var(--color-theme)

.menu-state
	font-size: 0.66rem
	font-weight: 600
	opacity: 0.72

.mobile-menu-scrim
	position: fixed
	inset: 0
	z-index: 18
	border: none
	background: rgba(0,0,0,0.18)
	backdrop-filter: blur(2px)

.mobile-menu-content
	position: absolute
	top: calc(100% + 0.55rem)
	left: 0
	right: 0
	z-index: 21
	display: flex
	flex-direction: column
	padding: 0.45rem
	border: var(--border-dark)
	border-radius: 7px
	background: var(--color-back)
	box-shadow: 0 18px 45px rgba(0,0,0,0.18)
	transform-origin: top center
	animation: menuIn 0.14s ease-out

.mobile-menu-arrow
	position: absolute
	top: -6px
	left: 22px
	width: 12px
	height: 12px
	border-left: var(--border-dark)
	border-top: var(--border-dark)
	background: var(--color-back)
	transform: rotate(45deg)

.mobile-menu-item
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.78rem 0.85rem
	border: none
	border-radius: 4px
	background: transparent
	color: var(--color-primary)
	font-family: var(--fontface-sans)
	font-size: 0.82rem
	font-weight: 650
	line-height: 1.1
	text-align: left
	text-transform: uppercase
	transition: background 0.08s ease, color 0.08s ease
	&:hover, &:focus-visible
		outline: none
		background: var(--color-stone)
		color: var(--color-theme-2)
	&.active
		background: var(--color-theme-6)
		color: var(--color-theme-2)

@keyframes menuIn
	from
		opacity: 0
		transform: translateY(-4px) scale(0.98)
	to
		opacity: 1
		transform: translateY(0) scale(1)

@media screen and (max-width: 1024px)
	.selection-row
		display: none
	.mobile-selection-menu
		display: block


</style>
