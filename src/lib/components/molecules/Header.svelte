<script>
	import MainLogo from '../atoms/MainLogo.svelte';
	import NavHeader from '$components/atoms/NavHeader.svelte';
</script>

<header>
	<MainLogo />
	<NavHeader />
</header>

<style>
	header {
		width: 90vw;
		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: space-between;

		border: 2px solid greenyellow;
	}
</style>
