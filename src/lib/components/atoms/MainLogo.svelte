<script lang="ts">
	import '../../../app.css';
	import { MAIN_NAME } from '../../utils/textConstantes.js';
</script>

<span>
	{MAIN_NAME}
</span>

<style>
	span {
		background: linear-gradient(
			90deg,
			var(--primary-color) 0%,
			var(--secondary-color) 51%,
			var(--tertiary-color) 100%
		);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		font-size: var(--big-title-size);
		font-weight: var(--big-title-weight);
		color: var(--primary-color);
	}
</style>
