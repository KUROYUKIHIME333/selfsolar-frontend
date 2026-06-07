<script lang="ts">
	import './inputs.css';
	// On utilise la rune $props() et on marque bindValue comme $bindable()
	let {
		customClass = '',
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
		writingPattern = undefined,
		changeAction = () => {}
	}: {
		customClass?: string;
		type?: string;
		defaultName?: string;
		name: string;
		label?: string;
		bindValue?: string | number | undefined;
		keydownAction?: (e: KeyboardEvent) => false | Promise<void> | void;
		changeAction?: () => false | Promise<void> | void;
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

<div class="input-wrapper {customClass}" class:hidden={isHidden}>
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
			onchange={changeAction}
		/>
	</div>
</div>
