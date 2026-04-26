<script lang="ts">
	import Input from './Input.svelte';
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let identifier: string = '0';
	export let nom: string = '';
	export let puissance: number = 0;
	export let duree: number = 0;
	export let simultaneite: number = 0.5;
	export let showRemove: boolean = true;

	const dispatch = createEventDispatcher();
</script>

<div class="equipement-card">
	<div class="card-header">
		<span class="card-number">#{parseInt(identifier) + 1}</span>
		{#if showRemove}
			<Button
				variant="clear"
				label="×"
				clickAction={() => dispatch('remove')}
				L="32px"
				l="32px"
				borderRadius="50%"
			/>
		{/if}
	</div>

	<div class="card-grid">
		<Input
			type="text"
			name={'nom-equipement-' + identifier}
			label="Nom"
			defaultName="Nom de l'équipement"
			bindValue={nom}
			icon="🔖"
		/>
		<Input
			type="number"
			name={'puissance-equipement-' + identifier}
			label="Puissance (W)"
			defaultName="Puissance nominale"
			bindValue={puissance}
			isRequired={true}
			minValue="0"
			icon="⚡"
		/>
		<Input
			type="number"
			name={'duree-utilisation-equipement-' + identifier}
			label="Durée (h/j)"
			defaultName="Durée journalière"
			bindValue={duree}
			isRequired={true}
			minValue="0"
			maxValue="24"
			icon="⏱️"
		/>
		<div class="slider-field">
			<label class="slider-field-label" for="slider-input">
				Simultanéité
				<span class="slider-field-value">{simultaneite}</span>
			</label>
			<input
				type="range"
				min="0"
				max="1"
				step="0.05"
				bind:value={simultaneite}
				class="mini-slider"
				name="slider-input"
				id="slider-input"
			/>
		</div>
	</div>
</div>

<style>
	.equipement-card {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
		border: 1px solid rgba(0, 0, 0, 0.06);
		transition: all 0.2s ease;
	}

	.equipement-card:hover {
		border-color: var(--tertiary-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.card-number {
		font-size: var(--small-text-size);
		font-weight: 600;
		color: var(--primary-color);
		background: var(--back-yellow);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 0.75rem;
	}

	.slider-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.slider-field-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--small-text-size);
		font-weight: 500;
		color: var(--gray-text);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.slider-field-value {
		background: var(--back-yellow);
		color: var(--primary-color);
		padding: 0.15rem 0.5rem;
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.mini-slider {
		width: 100%;
		height: 6px;
		-webkit-appearance: none;
		appearance: none;
		background: var(--back-dark);
		border-radius: 3px;
		outline: none;
	}

	.mini-slider::-webkit-slider-thumb {
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

	.mini-slider::-webkit-slider-thumb:hover {
		transform: scale(1.2);
	}
</style>
