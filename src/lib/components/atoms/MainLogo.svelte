<script lang="ts">
	import { MAIN_NAME } from '../../utils/textConstantes.js';

	let { onClickAction = () => {} }: { onClickAction?: (e: MouseEvent) => void } = $props();
</script>

<span class="main-logo-container moving-gradient-text title-font">
	<a href="/" onclick={onClickAction}>
		<span>{MAIN_NAME}</span>
	</a>
</span>

<style>
	a {
		text-decoration: none;
	}
	span {
		font-size: var(--big-title-size);
		font-weight: var(--big-title-weight);
		color: var(--primary-color);
	}

	@media (max-width: 480px) {
		/* .main-logo-container{
			
		} */
		span {
			font-size: var(--title-size);
		}
	}
</style>
