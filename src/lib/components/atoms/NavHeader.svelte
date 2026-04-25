<script lang="ts">
	import type { FunctionnalityType } from '$lib/utils/fonctionnalities';
	import { IMPLEMENTED } from '$lib/utils/fonctionnalities';
	const items: FunctionnalityType[] = IMPLEMENTED;
</script>

<nav>
	{#each items as item (item.label)}
		<span class="nav-link-container">
			<a class="nav-link" href={item.link}>{item.label}</a>
		</span>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		gap: 5%;
	}
</style>
