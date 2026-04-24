<script lang="ts">
	import '../../../app.css';
	import MainLogo from '../atoms/MainLogo.svelte';
	import NavHeader from '$components/atoms/NavHeader.svelte';
</script>

<header>
	<MainLogo />
	<NavHeader />
</header>

<style>
	header {
		width: var(--max-width);
		height: fit-content;
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* border: 2px solid red; */
	}
</style>
