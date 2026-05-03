<script lang="ts">
	import './pannelsBatteries.css';
	import Input from '$components/atoms/Input.svelte';
	import Select from '$components/atoms/Select.svelte';
	import type { Cablage } from '$lib/types/pv.types';
	import {
		MATERIAUX_OPTIONS,
		CONDITION_ENVIRONNEMENT_OPTIONS,
		METHODE_POSE_OPTIONS
	} from '$lib/utils/textConstantes';

	let {
		visibility = true,
		params = $bindable() as Cablage
	}: { visibility: boolean; params: Cablage } = $props();
	let inputWidth = $state('90%');
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Câblage de l'installation</h2>
	</legend>

	<div class="section-content">
		<Select
			name="cable-materiau"
			label="Conducteur"
			bind:value={params.materiau}
			options={MATERIAUX_OPTIONS}
			isRequired={true}
		/>

		<Input
			type="number"
			name="cable-longueur-string"
			label="Longueur des câble champ PV (strings) → boîte jonction , en m."
			defaultName="ex. 15"
			bind:bindValue={params.longueurString}
			minValue="1"
			inputMode="numeric"
			L={inputWidth}
			isRequired={true}
		/>

		<Input
			type="number"
			name="cable-longueur-DC"
			label="Longueur du câble DC principal (boîte de jonction → onduleur) , en m."
			defaultName="ex. 10"
			bind:bindValue={params.longueurPrincipalDC}
			minValue="1"
			inputMode="numeric"
			L={inputWidth}
			isRequired={true}
		/>

		<Select
			name="cable-methode-pose-dc"
			label="Méthode de pose - cable DC"
			bind:value={params.methodePoseDC}
			options={METHODE_POSE_OPTIONS}
			isRequired={true}
		/>

		<Input
			type="number"
			name="cable-longueur-AC"
			label="Longueur du câble AC (onduleur → tableau/tableau divisionnaire) , en m."
			defaultName="ex. 20"
			bind:bindValue={params.longueurAC}
			minValue="1"
			inputMode="numeric"
			L={inputWidth}
			isRequired={true}
		/>

		<Select
			name="cable-methode-pose-dc"
			label="Méthode de pose - cable AC"
			bind:value={params.methodePoseAC}
			options={METHODE_POSE_OPTIONS}
			isRequired={true}
		/>

		<Select
			name="cable-conditions-environnement"
			label="Conditions de l'environnement des câbles (ayant un impact ou dé-rating)"
			bind:value={params.conditionEnvironnement}
			options={CONDITION_ENVIRONNEMENT_OPTIONS}
			isRequired={true}
		/>
	</div>
</fieldset>
