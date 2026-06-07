<svelte:options runes={true} />

<script lang="ts">
	let { buttonId }: { buttonId: string } = $props();
	let container: HTMLDivElement;

	$effect(() => {
		if (!container) return;

		container.innerHTML = '';

		const form = document.createElement('form');
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
		script.setAttribute('data-payment_button_id', buttonId);
		script.async = true;
		form.appendChild(script);
		container.appendChild(form);
	});
</script>

<div bind:this={container}></div>
