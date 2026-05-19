<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import type { PageData } from './$types';
	let { data, form }: { data: PageData; form: Record<string, string> | null } = $props();

	const isSignedIn = $derived(Boolean(data.user));
	const isResetMode = $derived(data.mode === 'reset');
	const email = $derived(data.user?.email ?? '');
	const next = '/members/signed-in';
	const statusMessage = $derived.by(() => {
		if (data.message === 'signed-up') return 'Thank you for signing up. You are now subscribed.';
		if (data.message === 'confirmed') return 'Thank you for confirming. You are now subscribed, and will receive our monthly newsletters and fortnightly releases of Scrolls of Aryavarta directly in your email inbox.';
		if (data.message === 'signed-out') return 'You have been signed out.';
		if (data.message === 'password-updated') return 'Your password has been updated.';
		return form?.signupMessage ?? '';
	});

	let signupPassword = $state('');
	let signupConfirmPassword = $state('');
	let resetPassword = $state('');
	let resetConfirmPassword = $state('');
	let showLoginPassword = $state(false);
	let showSignupPassword = $state(false);

	const signupPasswordMismatch = $derived(Boolean(signupConfirmPassword) && signupPassword !== signupConfirmPassword);
	const resetPasswordMismatch = $derived(Boolean(resetConfirmPassword) && resetPassword !== resetConfirmPassword);
</script>

<svelte:head>
	<title>Bodha Members | Newsletter, Aryavarta Releases, and Subscriber Access</title>
	<meta name="description" content="Sign in or create a Bodha member account to access newsletters, Scrolls of Aryavarta releases, and member-only updates." />
</svelte:head>

<Container>
	<section class="wrapper-std header-margin">
		<Crumb showT={true} title="Bodha Members Area" />
		{#if data.error || statusMessage}
			<div class="box rgap16">
				{#if data.error}
					<p class="highlight-text notice error">{data.error}</p>
				{/if}
				{#if statusMessage}
					<p class="highlight-text theme notice">{statusMessage}</p>
				{/if}
			</div>
		{/if}
		{#if isResetMode && isSignedIn}
			<div class="box rgap16">
				<p class="highlight-text">Set a new password</p>
				<form class="auth-panel box rgap16" method="POST" action="?/updatePassword">
					<label>
						<span>New password</span>
						<input name="password" type="password" autocomplete="new-password" minlength="6" bind:value={resetPassword} required />
					</label>
					<label>
						<span>Confirm new password</span>
						<input name="confirmPassword" type="password" autocomplete="new-password" minlength="6" bind:value={resetConfirmPassword} required />
					</label>
					{#if resetPasswordMismatch}
						<p class="form-error">Passwords do not match.</p>
					{/if}
					<button type="submit" class="primary" disabled={resetPasswordMismatch}>
						<span>Update password</span>
					</button>
					{#if form?.updatePasswordError}
						<p class="form-error">{form.updatePasswordError}</p>
					{/if}
				</form>
			</div>
		{:else if isSignedIn}
			<div class="box rgap8">
				<p class="highlight-text">Namaste,</p>
				<a class="txt-xl linked" href="/newsletter">Access Newsletter issues.</a>
				<a class="txt-xl linked" href="/aryavarta">Access Scrolls of Aryavarta.</a>
			</div>
			<div class="box rgap8">
				<p class="label">Current user: {email}</p>
				<div class="actions">
					<form method="POST" action="?/logout">
						<button class="primary" type="submit"><span>Sign out</span></button>
					</form>
				</div>
				{#if form?.logoutError}
					<p class="form-error">{form.logoutError}</p>
				{/if}
			</div>
		{:else}
			<div class="box rgap16">
				<p class="highlight-text width70">Namaste, please sign in or create an account. By subscribing to Bodha you will receive our monthly newsletters and fortnightly releases of Scrolls of Aryavarta directly in your email inbox.</p>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
				<div class="auth-panel box rgap16 b-main p32 radius">
					<form class="box rgap16" method="POST" action="?/login">
						<input type="hidden" name="next" value={next} />
						<p class="label">Sign In</p>
						<label>
							<span>Email</span>
							<input name="email" type="email" autocomplete="email" required />
						</label>
						<label>
							<span>Password</span>
							<input name="password" type={showLoginPassword ? 'text' : 'password'} autocomplete="current-password" required />
						</label>
						<label class="checkbox-row">
							<input type="checkbox" bind:checked={showLoginPassword} />
							<span>Show password</span>
						</label>
						<button type="submit" class="primary"><span>Sign In</span></button>
					</form>
					<form class="forgot-password" method="POST" action="?/requestPasswordReset">
						<p class="label">Forgot password?</p>
						<input name="resetEmail" type="email" autocomplete="email" placeholder="Enter your email" required />
						<button type="submit" class="primary black"><span>Send reset link</span></button>
					</form>
					{#if form?.loginError}
						<p class="form-error">{form.loginError}</p>
					{/if}
					{#if form?.resetError}
						<p class="form-error">{form.resetError}</p>
					{/if}
					{#if form?.resetMessage}
						<p class="notice">{form.resetMessage}</p>
					{/if}
				</div>
				<form class="auth-panel box b-main p32 rgap16 radius" method="POST" action="?/signup">
					<input type="hidden" name="next" value={next} />
					<p class="label">Sign Up</p>
					<label>
						<span>Email</span>
						<input name="email" type="email" autocomplete="email" required />
					</label>
					<label>
						<span>Password</span>
						<input name="password" type={showSignupPassword ? 'text' : 'password'} autocomplete="new-password" minlength="6" bind:value={signupPassword} required />
					</label>
					<label>
						<span>Confirm password</span>
						<input name="confirmPassword" type={showSignupPassword ? 'text' : 'password'} autocomplete="new-password" minlength="6" bind:value={signupConfirmPassword} required />
					</label>
					<label class="checkbox-row">
						<input type="checkbox" bind:checked={showSignupPassword} />
						<span>Show password</span>
					</label>
					{#if signupPasswordMismatch}
						<p class="form-error">Passwords do not match.</p>
					{/if}
					<button type="submit" class="primary themed-b" disabled={signupPasswordMismatch}>
						<span>Sign up</span>
					</button>
					{#if form?.signupError}
						<p class="form-error">{form.signupError}</p>
					{/if}
				</form>
				<form class="auth-panel oauth-panel box b-main p32 rgap16 radius" method="POST" action="?/google">
					<input type="hidden" name="next" value={next} />
					<p class="label">Google</p>
					<button type="submit" class="google-button row xbetween ycenter">
						<div class="google-row row ycenter xleft">
							<div class="logo-wrapper">
								<img src="https://developers.google.com/identity/images/g-logo.png" alt="google logo" />
							</div>
							<p class="text-container white">Use Google Account</p>
						</div>
					</button>
					{#if form?.oauthError}
						<p class="form-error">{form.oauthError}</p>
					{/if}
				</form>
			</div>
		{/if}
	</section>
</Container>

<style lang="sass">

.google-button
	height: 50px
	background-color: #4285f4
	color: #fff
	border-radius: 1px
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.25)
	transition: background-color .218s, border-color .218s, box-shadow .218s
	border: none
	padding: 0
	&:hover
		cursor: pointer
		-webkit-box-shadow: 0 0 3px 3px rgba(66,133,244,.3)
		box-shadow: 0 0 3px 3px rgba(66,133,244,.3)
	&:active
		background-color: #3367D6
		transition: background-color 0.2s
	.google-row
		height: 100%
		width: 100%
		border: 1px solid transparent
	img
		width: 18px
		height: 18px
	.logo-wrapper
		padding: 15px
		background:#fff
		width: 48px
		height: 100%
		border-radius: 1px
	.text-container
		font-weight: 500
		font-size: 16px
		width: calc(100% - 48px)
		text-align: left
		padding-left: 16px

.label
	text-transform: uppercase
	letter-spacing: 0.08em
	font-size: 0.75rem
	color: var(--color-grey-2)

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

.checkbox-row
	display: flex
	align-items: center
	gap: 0.6rem
	width: fit-content
	cursor: pointer
	input
		width: auto
		margin: 0
		cursor: pointer

.actions
	display: flex
	flex-wrap: wrap
	gap: 0.75rem

.forgot-password
	display: grid
	gap: 0.75rem
	border-top: var(--border-main)
	padding-top: 1rem

.form-error
	color: var(--color-grey-5)

.error,
.form-error
	color: #b42318

</style>
