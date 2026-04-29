<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { initialDatasStore } from '$stores/initialDatas';

	import Header from '$components/molecules/Header.svelte';
	import HeaderKimi from '$components/molecules/HeaderKimi.svelte';
	import Footer from '$components/molecules/Footer.svelte';
	import FooterKimi from '$components/molecules/FooterKimi.svelte';
	import { HEADER_MENU, FOOTER_MENU } from '$lib/utils/fonctionnalities.js';

	let { data, children } = $props();

	$effect(() => {
		initialDatasStore.set(data);
	});
</script>

<div class="app">
	<HeaderKimi menu={HEADER_MENU} />

	<main>
		{@render children()}
	</main>

	<FooterKimi />
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
