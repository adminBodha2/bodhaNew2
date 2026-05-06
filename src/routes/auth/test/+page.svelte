<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Protected Auth Test | Bodha</title>
</svelte:head>

<section class="test-page">
	<div class="test-shell">
		<p class="eyebrow">Protected route</p>
		<h1>Supabase session verified</h1>
		<p>This page is served only after `safeGetSession()` validates the user on the server.</p>
		<div class="session-box">
			<span>User</span>
			<strong>{data.user.email}</strong>
		</div>
		<a href="/auth">Back to auth</a>
	</div>
</section>

<style lang="sass">
.test-page
	min-height: 100svh
	padding: 9rem 1.5rem 5rem
	background: var(--color-back)
	color: var(--color-text)

.test-shell
	width: min(760px, 100%)
	margin: 0 auto
	display: grid
	gap: 1rem

h1,
p
	margin: 0

h1
	font-size: clamp(2.4rem, 6vw, 5.5rem)
	line-height: 0.95
	font-weight: 600

p:not(.eyebrow)
	font-size: 1.1rem
	color: var(--color-grey-5)
	line-height: 1.5

.eyebrow
	text-transform: uppercase
	letter-spacing: 0.08em
	font-size: 0.75rem
	color: var(--color-grey-4)

.session-box
	border: var(--border-main)
	padding: 1rem
	display: grid
	gap: 0.35rem

span
	color: var(--color-grey-4)
	font-size: 0.85rem

strong
	overflow-wrap: anywhere

a
	width: fit-content
	border: var(--border-main)
	background: var(--color-text)
	color: var(--color-back)
	text-decoration: none
	padding: 0.8rem 1rem
</style>
