<svelte:options runes={true} />

<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		buttonId: string;
		type?: 'payment' | 'subscription';
		theme?: string;
	}

	let {
		buttonId,
		type = 'payment',
		theme
	}: Props = $props();

	let container = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (!browser || !container) return;

		// Razorpay's scripts expect errorQueue to exist globally
		if (typeof window !== 'undefined' && !(window as any).errorQueue) {
			(window as any).errorQueue = [];
		}

		// Clear any previous content
		container.innerHTML = '';

		const isSubscription = type === 'subscription';
		const scriptSrc = isSubscription
			? 'https://cdn.razorpay.com/static/widget/subscription-button.js'
			: 'https://checkout.razorpay.com/v1/payment-button.js';

		const dataAttr = isSubscription ? 'data-subscription_button_id' : 'data-payment_button_id';

		// Create the form and append to container while live in the DOM
		const form = document.createElement('form');
		container.appendChild(form);

		// Create Razorpay script element
		const script = document.createElement('script');
		script.src = scriptSrc;
		script.async = true;
		script.setAttribute(dataAttr, buttonId);
		if (theme && isSubscription) {
			script.setAttribute('data-button_theme', theme);
		}

		form.appendChild(script);

		return () => {
			if (container) {
				container.innerHTML = '';
			}
		};
	});
</script>

<div bind:this={container} class="razorpay-embed-container"></div>
