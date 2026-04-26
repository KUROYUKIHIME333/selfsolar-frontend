<script lang="ts">
	type OptionSelect = { value: string | number; label: string };
	let {
		name,
		label = '',
		value,
		options = [],
		isRequired = false
	}: {
		name: string;
		label: string;
		value: string | number | undefined;
		options: OptionSelect[];
		isRequired: boolean;
	} = $props();
</script>

<div class="select-wrapper">
	{#if label}
		<label for={name} class="select-label">{label}</label>
	{/if}
	<div class="select-container">
		<select id={name} {name} bind:value required={isRequired} class="select-input">
			{#each options as option (option.label)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<span class="select-arrow">▼</span>
	</div>
</div>

<style>
	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.select-label {
		font-size: var(--small-text-size);
		font-weight: 500;
		color: var(--gray-text);
		letter-spacing: 0.5px;
	}

	.select-container {
		position: relative;
	}

	.select-input {
		width: 100%;
		padding: 0.85rem 2.5rem 0.85rem 1rem;
		border: 1.5px solid var(--back-dark);
		border-radius: 0.875rem;
		background: white;
		font-size: var(--text-size);
		color: var(--dark-text);
		cursor: pointer;
		appearance: none;
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

	.select-arrow {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--gray-text);
		font-size: 0.7rem;
		pointer-events: none;
	}
</style>
