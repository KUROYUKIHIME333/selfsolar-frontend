<script lang="ts">
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 0.01;
	export let value: number = min;
	export let name: string;

	function handleInput(e: Event) {
		value = parseFloat((e.target as HTMLInputElement).value);
	}

	$: percentage = ((value - min) / (max - min)) * 100;
</script>

<div class="slider-container">
	<input
		type="range"
		min="0"
		max="1"
		step={step}
		bind:value
		class="slider-input"
		{name}
		id={`slider-${name}`}
	/>
</div>

<style>


	.slider-input {
		width: 100%;
		height: 100%;
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;
		outline: none;
	}

	.slider-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		background: white;
		border: 2.5px solid var(--primary-color);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(153, 79, 8, 0.2);
		transition: transform 0.2s ease;
	}

	.slider-input::-webkit-slider-thumb:hover {
		transform: scale(1.2);
	}















	/* Thumb via pseudo-élément sur le container */
	.slider-container::after {
		content: '';
		position: absolute;
		left: var(--progress, 0%);
		top: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		background: white;
		border: 3px solid var(--primary-color);
		border-radius: 50%;
		box-shadow: 0 2px 8px rgba(153, 79, 8, 0.3);
		transition: all 0.2s ease;
		pointer-events: none;
		z-index: 1;
	}

	.slider-container:hover::after {
		transform: translate(-50%, -50%) scale(1.15);
		box-shadow: 0 4px 12px rgba(153, 79, 8, 0.4);
	}
</style>
