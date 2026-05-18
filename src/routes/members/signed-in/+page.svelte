<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import type { PageData } from './$types';

	let { data, form }: { data: PageData; form: Record<string, string> | null } = $props();
</script>

<svelte:head>
	<title>Members Area | Bodha</title>
</svelte:head>

<Container>
	<section class="wrapper-std header-margin">
		<Crumb showT={true} title="Bodha Members Area" />
		<div class="box rgap8">
			<p class="highlight-text">Namaste,</p>
			<a class="txt-xl linked" href="/newsletter">Access Newsletter issues.</a>
			<a class="txt-xl linked" href="/aryavarta">Access Scrolls of Aryavarta.</a>
		</div>
		<div class="box rgap8">
			<p class="label">Current user: {data.user.email}</p>
			<div class="actions">
				<form method="POST" action="?/logout">
					<button class="primary" type="submit"><span>Sign out</span></button>
				</form>
			</div>
			{#if form?.logoutError}
				<p class="form-error">{form.logoutError}</p>
			{/if}
		</div>
	</section>
</Container>

<style lang="sass">

.label
	text-transform: uppercase
	letter-spacing: 0.08em
	font-size: 0.75rem
	color: var(--color-grey-2)

.actions
	display: flex
	flex-wrap: wrap
	gap: 0.75rem

.form-error
	border: var(--border-main)
	padding: 0.85rem 1rem
	color: #b42318

</style>
