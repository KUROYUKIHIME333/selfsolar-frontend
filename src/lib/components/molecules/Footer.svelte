<script>
	import { MAIN_NAME } from '$lib/utils/textConstantes';
	import NavFooter from '$components/atoms/NavFooter.svelte';
</script>

<div class="horizontal-line-full"></div>
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
	<NavFooter />
</footer>

<style>
	footer {
		width: var(--max-width);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-title {
		font-size: var(--little-big-title-size);
		font-weight: var(--title-weight);
	}

	.footer-small {
		font-size: var(--small-text-size);
	}
</style>
