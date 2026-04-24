<script lang="ts">
	import type { FunctionnalityType } from '../../../lib/utils/fonctionnalities';
	import { IMPLEMENTED } from '../../../utils/fonctionnalities';
	const items: FunctionnalityType[] = IMPLEMENTED;
</script>

<nav>
	{#each items as item (item.label)}
		<a class="nav-link" href={item.link}>{item.label}</a>
	{/each}
</nav>

<style>
	.nav-link {
		color: var(--primary-color);
		text-decoration: none;
		border-radius: 5px;
		text-align: center;
	}

	.nav-link:hover {
		color: var(--secondary-color);
		font-weight: bold;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 5%;
	}
</style>
