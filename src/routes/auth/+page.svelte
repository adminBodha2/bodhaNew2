<script lang="ts">
	import type { PageData } from './$types';

	let { data, form }: { data: PageData; form: Record<string, string> | null } = $props();

	const isSignedIn = $derived(Boolean(data.user));
	const email = $derived(data.user?.email ?? '');
	const next = '/auth/test';
</script>

<svelte:head>
	<title>Auth | Bodha</title>
</svelte:head>

<section class="auth-page">
	<div class="auth-shell">
		<div class="auth-intro">
			<p class="eyebrow">Bodha account</p>
			<h1>{isSignedIn ? 'You are signed in' : 'Sign in or create an account'}</h1>
			<p>
				{isSignedIn
					? 'Your Supabase session is active and available to server routes.'
					: 'Use email and password, or continue with Google.'}
			</p>
		</div>

		{#if data.error}
			<p class="notice error">{data.error}</p>
		{/if}

		{#if data.message === 'signed-out'}
			<p class="notice">You have been signed out.</p>
		{/if}

		{#if form?.signupMessage}
			<p class="notice">{form.signupMessage}</p>
		{/if}

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
				<form class="auth-panel" method="POST" action="?/login">
					<input type="hidden" name="next" value={next} />
					<div>
						<p class="label">Email login</p>
						<h2>Existing account</h2>
					</div>
					<label>
						<span>Email</span>
						<input name="email" type="email" autocomplete="email" required />
					</label>
					<label>
						<span>Password</span>
						<input name="password" type="password" autocomplete="current-password" required />
					</label>
					<button type="submit">Log in</button>
					{#if form?.loginError}
						<p class="form-error">{form.loginError}</p>
					{/if}
				</form>

				<form class="auth-panel" method="POST" action="?/signup">
					<div>
						<p class="label">Create account</p>
						<h2>Email signup</h2>
					</div>
					<label>
						<span>Email</span>
						<input name="email" type="email" autocomplete="email" required />
					</label>
					<label>
						<span>Password</span>
						<input name="password" type="password" autocomplete="new-password" minlength="6" required />
					</label>
					<button type="submit">Sign up</button>
					{#if form?.signupError}
						<p class="form-error">{form.signupError}</p>
					{/if}
				</form>

				<form class="auth-panel oauth-panel" method="POST" action="?/google">
					<input type="hidden" name="next" value={next} />
					<div>
						<p class="label">Google</p>
						<h2>Continue with Google</h2>
					</div>
					<button type="submit">Use Google account</button>
					{#if form?.oauthError}
						<p class="form-error">{form.oauthError}</p>
					{/if}
				</form>
			</div>
		{/if}
	</div>
</section>

<style lang="sass">
.auth-page
	min-height: 100svh
	padding: 9rem 1.5rem 5rem
	background: var(--color-back)
	color: var(--color-text)

.auth-shell
	width: min(1040px, 100%)
	margin: 0 auto
	display: grid
	gap: 1.5rem

.auth-intro
	max-width: 680px
	display: grid
	gap: 0.75rem

h1,
h2,
p
	margin: 0

h1
	font-size: clamp(2.2rem, 5vw, 5rem)
	line-height: 0.95
	font-weight: 600

h2
	font-size: 1.25rem
	line-height: 1.2

.eyebrow,
.label
	text-transform: uppercase
	letter-spacing: 0.08em
	font-size: 0.75rem
	color: var(--color-grey-4)

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
	padding: 1.25rem
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

button,
a
	border: var(--border-main)
	background: var(--color-text)
	color: var(--color-back)
	text-decoration: none
	padding: 0.8rem 1rem
	font: inherit
	text-align: center
	cursor: pointer

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
