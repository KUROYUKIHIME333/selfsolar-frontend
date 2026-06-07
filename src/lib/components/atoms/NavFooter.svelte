<script lang="ts">
	import { FOOTER_LINKS } from '$lib/utils/fonctionnalities';
	import type { FooterLinkType } from '$lib/utils/fonctionnalities';
	const items: FooterLinkType[] = FOOTER_LINKS;
</script>

<nav>
	{#each items as item (item.label)}
		<span class="nav-link-container">
			<a class="nav-link footer-small" href={item.link}>{item.label}</a>
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
