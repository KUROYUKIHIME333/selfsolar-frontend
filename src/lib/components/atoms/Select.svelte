<script lang="ts">
	import type { ParametresPanneau, ModelePanneau } from '$lib/types/pv.types';
	import './inputs.css';

	type OptionSelect = {
		value: string | number | [index: number, array: ModelePanneau[]];
		label: string;
	};
	let {
		name,
		label = '',
		value = $bindable(),
		options = [],
		isRequired = false,
		L
	}: {
		name: string;
		label: string;
		value: ParametresPanneau | string | number | undefined;
		options: OptionSelect[];
		isRequired?: boolean;
		L?: string | undefined;
	} = $props();
</script>

<div class="select-wrapper">
	{#if label}
		<label for={name} class="select-label"
			>{label}{#if isRequired}<span class="required">*</span>{/if}</label
		>
	{/if}
	<div class="select-container">
		<select
			id={name}
			{name}
			bind:value
			required={isRequired}
			class="select-input"
			style={L ? `width: ${L}` : undefined}
		>
			{#each options as option (option.label)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.select-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: var(--small-text-size);
		font-weight: 500;
		color: var(--gray-text);
		letter-spacing: 0.5px;
	}

	.select-container {
		width: 100%;
	}

	.select-input {
		width: 100%;
		padding: 0.85rem 1rem;
		border: 2px solid var(--back-yellow-gray);
		border-radius: 5px;
		background: var(--back-dark);
		font-size: var(--text-size);
		color: var(--dark-text);
		transition: all 0.2s ease;
	}

	.select-input:hover {
		border-color: var(--secondary-color);
	}

	.select-input:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(153, 79, 8, 0.1);
	}
</style>
