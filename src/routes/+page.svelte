<script lang="ts">
	// import welcomeFallback from '$lib/images/svelte-welcome.png';
	// import welcome from '$lib/images/svelte-welcome.webp';

	import Button from '../lib/components/atoms/Button.svelte';
	import Header from '../lib/components/molecules/Header.svelte';

	let loading = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Header></Header>
	<!-- <h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2> -->

	<Button variant="primary" label="Click" {loading}>ici</Button>
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
