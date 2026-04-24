<script lang="ts">
	import '../app.css';
	import './layout.css';
	
	
	import Header from '$components/molecules/Header.svelte';
	import Footer from '$components/molecules/Footer.svelte';

	let { children } = $props();
	
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (min-width: 480px) {
	}
</style>
