<script lang="ts">

  import FB from '$lib/icons/facebook.svelte'
  import Twitter from '$lib/icons/twitter.svelte'
  import Linkedin from '$lib/icons/linkedin.svelte'
  import Whatsapp from '$lib/icons/whatsapp.svelte'

	export let urlToShare;

	export let facebookShareUrl: any = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
	export let twitterShareUrl: any = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`;
	export let whatsappShareUrl: any = `https://api.whatsapp.com/send?text=${encodeURIComponent(urlToShare)}`;
	export let linkedInShareUrl: string = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlToShare)}`; // Define LinkedIn share URL

	function share(url: any) {
		window.open(url, '_blank', 'height=500,width=600');
	}

</script>

<div class="row ycenter cgap16">
  <button class="blank" on:click={() => share(facebookShareUrl)}>
    <FB color={'var(--color-alt)'} size=24/>
  </button>
  <button class="blank" on:click={() => share(twitterShareUrl)}>
    <Twitter color={'var(--color-alt)'} size=24/>
  </button>
  <button class="blank" on:click={() => share(whatsappShareUrl)}>
    <Whatsapp color={'var(--color-alt)'} size=24/>
  </button>
  <button class="blank" on:click={() => share(linkedInShareUrl)}>
    <Linkedin color={'var(--color-alt)'} size=24/>
  </button>
</div>

<style lang="sass">

button
  cursor: pointer

</style>