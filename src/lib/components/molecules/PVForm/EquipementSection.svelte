<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import EquipementCard from '$components/molecules/EquipementCard.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import type { Equipement } from '$lib/types/pv.types';
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
		visibility = true,
	}: {
		allEquipements: Equipement[];
		facteurFoisonnementGlobal: number;
		visibility?: boolean;
	} = $props();
</script>

<fieldset class={`form-section ${visibility ? '' : 'is-hidden-now'}`}>
	<legend class="section-legend">
		<span>Inventaire des équipements électriques</span>
	</legend>

	<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
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
				Facteur de foisonnement global
				<span class="factor-value">{facteurFoisonnementGlobal.toFixed(2)}</span>
			</label>
			<Slider
				name="facteurFoisonnementGlobalInput"
				min={0.5}
				max={1}
				step={0.05}
				bind:value={facteurFoisonnementGlobal}
			/>
		</div>

		
	</div>
</fieldset>

<style>
</style>
