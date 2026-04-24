<script lang="ts">
	// import welcomeFallback from '$lib/images/svelte-welcome.png';
	// import welcome from '$lib/images/svelte-welcome.webp';

	import Button from '../lib/components/atoms/Button.svelte';
	import Header from '../lib/components/molecules/Header.svelte';

	let loading = true;
	let disabled = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Header />

	<Button variant="primary" label="Click" {loading} {disabled}>ici</Button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
