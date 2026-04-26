<script lang="ts">
	export let type: string = 'number';
	export let defaultName: string = '...';
	export let name: string;
	export let label: string = '';
	export let bindValue: string | number | undefined = undefined;
	export let keydownAction: (e: KeyboardEvent) => false | Promise<void> | void = () => {};
	export let isLabeled: boolean = true;
	export let isHidden: boolean = false;
	export let isRequired: boolean = false;
	export let minValue: string | undefined = undefined;
	export let maxValue: string | undefined = undefined;
	export let icon: string = '';
	export let L: string | undefined = undefined;

	if (type !== 'number') {
		minValue = undefined;
		maxValue = undefined;
	}
</script>

<div class="input-wrapper" class:hidden={isHidden}>
	{#if isLabeled && label}
		<label for={name} class="input-label">
			{#if icon}<span class="input-icon">{icon}</span>{/if}
			{label}
			{#if isRequired}<span class="required">*</span>{/if}
		</label>
	{/if}

	<div class="input-container">
		<input
			id={name}
			{name}
			{type}
			placeholder={defaultName}
			bind:value={bindValue}
			on:keydown={keydownAction}
			min={minValue}
			max={maxValue}
			required={isRequired}
			class="artisan-input"
			style={`${L? `width: ${L}`: undefined}`}
		/>
	</div>
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.input-wrapper.hidden {
		display: none;
	}

	.input-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: var(--small-text-size);
		font-weight: 500;
		color: var(--gray-text);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.input-icon {
		font-size: 0.9rem;
	}

	.required {
		color: var(--danger);
		margin-left: 0.2rem;
	}

	.input-container {
		position: relative;
	}

	.artisan-input {
		width: 100%;
		padding: 0.85rem 1rem;
		border: 1.5px solid var(--back-dark);
		border-radius: 0.875rem;
		background: white;
		font-size: var(--text-size);
		color: var(--dark-text);
		transition: all 0.2s ease;
	}

	.artisan-input::placeholder {
		color: var(--gray-text);
		opacity: 0.6;
	}

	.artisan-input:hover {
		border-color: var(--secondary-color);
	}

	.artisan-input:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(153, 79, 8, 0.1);
	}

	/* Number input spinner styling */
	.artisan-input::-webkit-outer-spin-button,
	.artisan-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.artisan-input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
