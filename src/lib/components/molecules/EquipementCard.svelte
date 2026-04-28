<script lang="ts">
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	import { PLACEHOLDER_EQUIPEMENT } from '$lib/utils/textConstantes';
	import type { PlaceholderEquipementType } from '$lib/types/general.types';
	import { DEFAULT_FACTEUR_SIMULTANEITE } from '$lib/utils/textConstantes';

	// On utilise $bindable() pour que les changements remontent au parent
	let {
		identifier = 0,
		nom = $bindable(''),
		P = $bindable(undefined),
		h = $bindable(undefined),
		ks = $bindable(DEFAULT_FACTEUR_SIMULTANEITE),
		showRemove = true,
		remove
	}: {
		identifier?: number;
		nom?: string;
		P: number | undefined | string;
		h: number | undefined | string;
		ks: number;
		showRemove: boolean;
		remove: () => void;
	} = $props();

	const getRandomPlaceholder = (): PlaceholderEquipementType => {
		const placeholderNbr = PLACEHOLDER_EQUIPEMENT.length;
		const index = Math.floor(Math.random() * placeholderNbr);
		return PLACEHOLDER_EQUIPEMENT[index];
	};

	// On garde le placeholder constant pour la durée de vie de cette carte spécifique
	let placeholderGet = getRandomPlaceholder();
</script>

<div class="equipement-card">
	<div class="card-header">
		<span class="card-number">Equipement {identifier + 1}</span>
		{#if showRemove}
			<Button variant="clear" label="x" clickAction={remove} L="32px" l="32px" borderRadius="50%" />
		{/if}
	</div>

	<div class="card-grid">
		<Input
			type="text"
			name={'nom-equipement-' + identifier}
			label="Nom de l'équipement"
			defaultName="ex. {placeholderGet.nom}"
			bind:bindValue={nom}
			L="90%"
		/>
		<Input
			type="number"
			name={'puissance-equipement-' + identifier}
			label="Puissance nominale (Watts)"
			defaultName="ex. {placeholderGet.puissance} W"
			bind:bindValue={P}
			isRequired={true}
			minValue="0"
			inputMode="numeric"
			L="90%"
		/>
		<Input
			type="number"
			name={'duree-utilisation-equipement-' + identifier}
			label="Utilisation journalière (h/j)"
			defaultName="ex. 4 h/j"
			bind:bindValue={h}
			isRequired={true}
			minValue="0"
			maxValue="24"
			inputMode="numeric"
			L="90%"
		/>

		<div class="slider-field">
			<label class="slider-field-label" for={'ks-equipement-' + identifier}>
				Facteur de Simultanéité
				<span class="slider-field-value">{ks}</span>
			</label>
			<input
				type="range"
				min="0"
				max="1"
				step="0.05"
				bind:value={ks}
				class="mini-slider"
				name={'ks-equipement-' + identifier}
				id={'ks-equipement-' + identifier}
			/>
		</div>
	</div>
</div>

<style>
	.equipement-card {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
		padding-bottom: 50px;
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
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.slider-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.slider-field-label {
		display: flex;
		align-items: center;
		font-size: var(--small-text-size);
		font-weight: 500;
		color: var(--gray-text);
		letter-spacing: 0.5px;
		gap: 10px;
	}

	.slider-field-value {
		background: var(--back-dark);
		color: var(--dark-text);
		padding: 0.15rem 0.5rem;
		border-radius: 5px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.mini-slider {
		width: 95%;
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

