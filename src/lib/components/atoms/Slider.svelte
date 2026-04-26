<script lang="ts">
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let value: number = min;
	export let name: string;

	let sliderRef: HTMLInputElement;

	function handleInput(e: Event) {
		value = parseFloat((e.target as HTMLInputElement).value);
	}

	$: percentage = ((value - min) / (max - min)) * 100;
</script>

<div class="slider-container">
	<input
		id={`slider-${name}`}
		name="name"
		type="range"
		bind:this={sliderRef}
		{min}
		{max}
		{step}
		{value}
		on:input={handleInput}
		class="slider-input"
		style="--progress: {percentage}%"
	/>
	<div class="slider-track">
		<div class="slider-fill" style="width: {percentage}%"></div>
	</div>
</div>

<style>
	.slider-container {
		position: relative;
		width: 100%;
		height: 24px;
		display: flex;
		align-items: center;
	}

	.slider-input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		z-index: 2;
		margin: 0;
	}

	.slider-track {
		position: relative;
		width: 100%;
		height: 6px;
		background: var(--back-dark);
		border-radius: 3px;
		overflow: visible;
	}

	.slider-fill {
		position: absolute;
		height: 100%;
		background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
		border-radius: 3px;
		transition: width 0.1s ease;
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
