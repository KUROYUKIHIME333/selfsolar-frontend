<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { initialDatasStore } from '$stores/initialDatas';

	import Header from '$components/molecules/Header.svelte';
	import Footer from '$components/molecules/Footer.svelte';

	let { data, children } = $props();

	$effect(() => {
		initialDatasStore.set(data);
	});
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
