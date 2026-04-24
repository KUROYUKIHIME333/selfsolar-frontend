<script lang="ts">
	import type { FunctionnalityType } from '../../../lib/utils/fonctionnalities';
	import { IMPLEMENTED } from '../../../lib/utils/fonctionnalities';
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
	.nav-link {
		color: var(--gray-text);
		text-decoration: none;
		border-radius: 5px;
		text-align: center;
		font-size: 0.9rem;
	}

	.nav-link:hover {
		color: var(--primary-color);
	}

	.nav-link-container {
		display: flex;
		align-items: center;
		height: 50px;
		border: 1.5px solid transparent;
	}

	.nav-link-container:hover {
		height: 50px;
		color: var(--primary-color);
		border-bottom: 1.5px solid var(--primary-color);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 5%;
	}
</style>
