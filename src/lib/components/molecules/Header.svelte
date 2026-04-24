<script lang="ts">
	import '../../../app.css';
	import MainLogo from '../atoms/MainLogo.svelte';
	import NavHeader from '$components/atoms/NavHeader.svelte';
	// import { IMPLEMENTED } from '$lib/utils/fonctionnalities';
	// const items = IMPLEMENTED;
</script>

<header>
	<MainLogo />
	<NavHeader />
</header>

<style>
	header {
		width: 90vw;
		height: 50px;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
