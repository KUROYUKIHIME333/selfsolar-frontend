<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { MAIN_NAME } from '$lib/utils/textConstantes';
	import { FOOTER_LINKS } from '$lib/utils/fonctionnalities';
	import type { FooterLinkType } from '$lib/utils/fonctionnalities';

	let { children } = $props();
	const items: FooterLinkType[] = FOOTER_LINKS;
</script>

<div class="app">
	<main>
		{@render children()}
	</main>

	<footer>
		<div>
			<p class="footer-title">
				{MAIN_NAME}
			</p>
			<p class="footer-small">
				<span>copyright 2026</span><span>{MAIN_NAME}.</span><span
					>La securité energetique enfin en vue</span
				>
			</p>
		</div>

		<nav>
			{#each items as item (item.label)}
				<span class="nav-link-container">
					<a class="nav-link footer-small" href={item.link}>{item.label}</a>
				</span>
			{/each}
		</nav>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	footer {
		width: var(--max-width);
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border: 2px solid red; */
	}

	.footer-title {
		font-size: var(--little-big-title-size);
		font-weight: var(--title-weight);
	}

	.footer-small {
		font-size: var(--small-text-size);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 5%;
	}

	span{

	}

	@media (min-width: 480px) {
	}
</style>
