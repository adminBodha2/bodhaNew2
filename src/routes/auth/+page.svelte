<script lang="ts">
	import Wrapper from '$lib/comps/wrapper.svelte';
	import type { PageData } from './$types';
	import Crumb from '$lib/comps/breadcrumb.svelte';

	let { data, form }: { data: PageData; form: Record<string, string> | null } = $props();

	const isSignedIn = $derived(Boolean(data.user));
	const email = $derived(data.user?.email ?? '');
	const next = '/auth/test';
</script>

<svelte:head>
	<title>Auth | Bodha</title>
</svelte:head>

<Wrapper>
	<section class="wrapper-std header-margin">
		<Crumb showT={true} title="Subscribe" showD={true} desc="Subscribe to receive our monthly newsletters, and fortnightly issues of Scrolls of Aryavarta." />
		<div class="auth-shell box rgap32">
			<div class="box">
				<p>{isSignedIn ? 'You are signed in' : 'Sign in or create an account'}</p>
				<p>{isSignedIn ? 'Your Supabase session is active and available to server routes.' : 'Use email and password, or continue with Google.'}</p>
				{#if data.error}<p class="notice error">{data.error}</p>{/if}
				{#if data.message === 'signed-out'}<p class="notice">You have been signed out.</p>{/if}
				{#if form?.signupMessage}<p class="notice">{form.signupMessage}</p>{/if}
			</div>
			{#if isSignedIn}
				<div class="auth-panel">
					<p class="label">Current user</p>
					<p class="user-email">{email}</p>
					<div class="actions">
						<a href="/auth/test">Open protected test route</a>
						<form method="POST" action="?/logout">
							<button type="submit">Sign out</button>
						</form>
					</div>
					{#if form?.logoutError}
						<p class="form-error">{form.logoutError}</p>
					{/if}
				</div>
			{:else}
				<div class="auth-grid">
					<form class="box auth-panel radius8" method="POST" action="?/login">
						<input type="hidden" name="next" value={next} />
						<div class="box self-top">
							<p class="citation tt-u grey">Email login</p>
							<p class="highlight-text w600">Existing account</p>
						</div>
						<label>
							<span>Email</span>
							<input name="email" type="email" autocomplete="email" required />
						</label>
						<label>
							<span>Password</span>
							<input name="password" type="password" autocomplete="current-password" required />
						</label>
						<button class="primary width" type="submit"><span>Log in</span></button>
						{#if form?.loginError}
							<p class="form-error">{form.loginError}</p>
						{/if}
					</form>
					<form class="box auth-panel radius8" method="POST" action="?/signup">
						<input type="hidden" name="next" value={next} />
						<div class="box self-top">
							<p class="citation tt-u grey">Create account</p>
							<p class="highlight-text w600">Email signup</p>
						</div>
						<label>
							<span>Email</span>
							<input name="email" type="email" autocomplete="email" required />
						</label>
						<label>
							<span>Password</span>
							<input name="password" type="password" autocomplete="new-password" minlength="6" required />
						</label>
						<button class="primary" type="submit"><span>Sign up</span></button>
						{#if form?.signupError}
							<p class="form-error">{form.signupError}</p>
						{/if}
					</form>
					<form class="box auth-panel radius8 oauth-panel" method="POST" action="?/google">
						<input type="hidden" name="next" value={next} />
						<div class="box self-top">
							<p class="citation grey tt-u">Google</p>
							<p class="highlight-text w600">Continue with Google</p>
						</div>
						<button class="primary" type="submit"><span>Use Google account</span></button>
						{#if form?.oauthError}
							<p class="form-error">{form.oauthError}</p>
						{/if}
					</form>
				</div>
			{/if}
		</div>
	</section>
</Wrapper>

<style lang="sass">

button.primary
	width: 100%

.auth-intro
	max-width: 680px
	display: grid
	gap: 0.75rem

.eyebrow,
.label
	text-transform: uppercase
	letter-spacing: 0.08em
	font-size: 0.75rem
	color: var(--color-grey-2)

.auth-intro p:not(.eyebrow)
	font-size: 1.1rem
	color: var(--color-grey-5)
	line-height: 1.5

.auth-grid
	display: grid
	grid-template-columns: repeat(3, minmax(0, 1fr))
	gap: 1rem

.auth-panel
	border: var(--border-main)
	background: var(--color-back)
	padding: 4rem 1.25rem
	display: grid
	gap: 1rem
	align-content: start

label
	display: grid
	gap: 0.4rem
	font-size: 0.86rem
	color: var(--color-grey-5)

input
	width: 100%
	border: var(--border-main)
	background: transparent
	color: inherit
	padding: 0.8rem 0.9rem
	font: inherit

a
	display: inline-flex
	justify-content: center

.actions
	display: flex
	flex-wrap: wrap
	gap: 0.75rem

.notice,
.form-error
	border: var(--border-main)
	padding: 0.85rem 1rem
	color: var(--color-grey-5)

.error,
.form-error
	color: #b42318

.user-email
	font-size: 1.15rem
	overflow-wrap: anywhere

@media screen and (max-width: 900px)
	.auth-page
		padding-top: 7rem

	.auth-grid
		grid-template-columns: 1fr
</style>
