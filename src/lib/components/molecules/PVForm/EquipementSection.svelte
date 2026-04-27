<script lang="ts">
	import EquipementCard from '$components/molecules/EquipementCard.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import type { Equipement } from '$lib/types/pv.types';
	// import PVFormSectionContent from '$components/atoms/PVFormSectionContent.svelte';
	import {
		DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL,
		DEFAULT_FACTEUR_SIMULTANEITE
	} from '$lib/utils/textConstantes';

	// Gestion équipements
	const addEquipement = (): void => {
		allEquipements = [...allEquipements, { P: 0, h: 0, ks: DEFAULT_FACTEUR_SIMULTANEITE }];
	};

	const removeEquipement = (index: number): void => {
		if (allEquipements.length > 1) {
			allEquipements = allEquipements.filter((_, i) => i !== index);
		}
	};

	// const goUpOfallEquipements = () => {};

	// const goDownOfallEquipements = () => {};

	let {
		allEquipements = [{ nom: '', P: NaN, h: NaN, ks: 0.5 }],
		facteurFoisonnementGlobal = DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL,
		visibility = true
	}: {
		allEquipements: Equipement[];
		facteurFoisonnementGlobal: number;
		visibility?: boolean;
	} = $props();
</script>

<fieldset class={`form-section ${visibility ? '' : 'is-hidden-now'}`}>
	<legend class="section-legend">
		<h2>Inventaire des équipements électriques</h2>
	</legend>

	<div class="section-content">
		<p class="section-description">
			<span
				>Avant tout, il faut un bilan de tous les appareils et équipements qui seront alimentés.</span
			>
			<span>Cela permettra de se faire une idée sur la consommation énergétique journalière</span>
		</p>
		{#each allEquipements as equipement, index (index)}
			<EquipementCard
				identifier={index}
				nom={equipement.nom}
				P={equipement.P}
				h={equipement.h}
				ks={equipement.ks}
				showRemove={allEquipements.length > 1}
				remove={() => removeEquipement(index)}
			/>
		{/each}

		<Button
			variant="secondary"
			label="+ Ajouter un équipement"
			clickAction={addEquipement}
			L="100%"
		/>

		<div class="global-factor">
			<label class="factor-label" for="facteurFoisonnementGlobalInput">
				Facteur de foisonnement global (Kf)
				<span class="factor-value">{facteurFoisonnementGlobal.toFixed(2)}</span>
			</label>

			<Slider
				name="facteurFoisonnementGlobalInput"
				min={0.5}
				max={1}
				step={0.05}
				bind:value={facteurFoisonnementGlobal}
			/>
			<p class="section-description">
				<span
					>Il s'agit d'un facteur qui permet de prendre en compte de la non-simultanéité entre
					usages</span
				>
				<span>Généralement, pour des milieux résidentiels, il oscille entre 0.5 et 0.7.</span>
				<span>En pratique, on utilise souvent 0.8 comme valeur standard</span>
			</p>
		</div>
	</div>
</fieldset>

<style>
</style>
