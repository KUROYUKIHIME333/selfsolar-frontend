<script lang="ts">
	import EquipementCard from '$components/molecules/EquipementCard.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import type { Equipement } from '$lib/types/pv.types';
	import {
		DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL,
		DEFAULT_FACTEUR_SIMULTANEITE
	} from '$lib/utils/textConstantes';

	// On définit les props avec $bindable()
	let {
		allEquipements = $bindable([{ nom: '', P: NaN, h: NaN, ks: 0.5 }]),
		facteurFoisonnementGlobal = $bindable(DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL),
		visibility = true
	}: {
		allEquipements: Equipement[];
		facteurFoisonnementGlobal: number;
		visibility?: boolean;
	} = $props();

	// Gestion équipements : On modifie directement la référence bindable
	const addEquipement = (): void => {
		allEquipements = [
			...allEquipements,
			{ nom: '', P: NaN, h: NaN, ks: DEFAULT_FACTEUR_SIMULTANEITE }
		];
	};

	const removeEquipement = (index: number): void => {
		if (allEquipements.length > 1) {
			allEquipements = allEquipements.filter((_, i) => i !== index);
		}
	};
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Inventaire des équipements électriques</h2>
	</legend>

	<div class="section-content">
		<div class="section-description">
			<p>Avant tout, il faut un bilan de tous les appareils et équipements qui seront alimentés.</p>
			<p>Cela permettra de se faire une idée sur la consommation énergétique journalière.</p>
		</div>

		<div class="equipement-list">
			{#each allEquipements as equipement, index (index)}
				<EquipementCard
					identifier={index}
					bind:nom={equipement.nom}
					bind:P={equipement.P}
					bind:h={equipement.h}
					bind:ks={equipement.ks}
					showRemove={allEquipements.length > 1}
					remove={() => removeEquipement(index)}
				/>
			{/each}
		</div>

		<Button
			variant="secondary"
			label="+ Ajouter un équipement"
			clickAction={addEquipement}
			L="100%"
		/>

		<div class="global-factor">
			<label class="factor-label" for="kf-slider">
				Facteur de foisonnement global (Kf)
				<span class="factor-value">{facteurFoisonnementGlobal.toFixed(2)}</span>
			</label>

			<Slider
				name="kf-slider"
				min={0.5}
				max={1}
				step={0.05}
				bind:value={facteurFoisonnementGlobal}
			/>

			<div class="factor-help">
				<p>Prend en compte la non-simultanéité entre les usages.</p>
				<p>Résidentiel : entre 0.5 et 0.7. Standard : 0.8.</p>
			</div>
		</div>
	</div>
</fieldset>
