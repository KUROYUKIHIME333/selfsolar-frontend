<script lang="ts">
	import MainLogo from '../atoms/MainLogo.svelte';
	import NavHeader from '$components/atoms/NavHeader.svelte';
	import Button from '$components/atoms/Button.svelte';
</script>

<header>
	<MainLogo />
	<NavHeader />
	<div>
		<Button L="2rem" l="2rem" borderRadius="50%" label="P" />
		<Button L="2rem" l="2rem" borderRadius="50%" label="S" />
	</div>
</header>

<style>
	header {
		width: var(--max-width);
		height: var(--header-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
