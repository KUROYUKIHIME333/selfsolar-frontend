<script lang="ts">
	// On utilise la rune $props() et on marque bindValue comme $bindable()
	let {
		type = 'number',
		defaultName = '...',
		name,
		label = '',
		bindValue = $bindable(undefined), // CRUCIAL pour la remontée de données
		keydownAction = () => {},
		isLabeled = true,
		isHidden = false,
		isRequired = false,
		minValue = undefined,
		maxValue = undefined,
		icon = '',
		L = undefined,
		inputMode = undefined,
		writingPattern = undefined
	}: {
		type?: string;
		defaultName?: string;
		name: string;
		label?: string;
		bindValue?: string | number | undefined;
		keydownAction?: (e: KeyboardEvent) => false | Promise<void> | void;
		isLabeled?: boolean;
		isHidden?: boolean;
		isRequired?: boolean;
		minValue?: string | number | undefined;
		maxValue?: string | number | undefined;
		icon?: string;
		L?: string | undefined;
		inputMode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | null;
		writingPattern?: string | undefined;
	} = $props();

	// Logique de validation dérivée
	const actualMin = $derived(type === 'number' ? minValue : undefined);
	const actualMax = $derived(type === 'number' ? maxValue : undefined);
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
			/* Le lien magique Svelte 5 */
			bind:value={bindValue}
			onkeydown={keydownAction}
			min={actualMin}
			max={actualMax}
			required={isRequired}
			class="artisan-input"
			style={L ? `width: ${L}` : undefined}
			inputmode={inputMode}
			pattern={writingPattern}
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
		border: 2px solid var(--back-yellow-gray);
		border-radius: 5px;
		background: var(--back-dark);
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
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		appearance: none;
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox (the GOAT) */
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
