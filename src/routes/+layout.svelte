<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { initialDatasStore } from '$stores/initialDatas';

	import HeaderKimi from '$components/molecules/HeaderKimi.svelte';
	import FooterKimi from '$components/molecules/FooterKimi.svelte';
	import { HEADER_MENU } from '$lib/utils/fonctionnalities.js';

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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (min-width: 480px) {
	}
</style>
