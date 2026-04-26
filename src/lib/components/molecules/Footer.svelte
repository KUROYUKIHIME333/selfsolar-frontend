<script>
	import { MAIN_NAME } from '$lib/utils/textConstantes';
	import NavFooter from '$components/atoms/NavFooter.svelte';
</script>

<div class="horizontal-line-full-less-gray"></div>
<footer>
	<div class="footer-container">
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
		<NavFooter />
	</div>
</footer>

<style>
	footer {
		width: var(--full-width);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* border: var(--test-border-2); */
	}

	.footer-container {
		width: var(--max-width);
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* border: var(--test-border); */
	}

	.footer-title {
		font-size: var(--little-big-title-size);
		font-weight: var(--title-weight);
	}

	.footer-small {
		font-size: var(--small-text-size);
	}
</style>
