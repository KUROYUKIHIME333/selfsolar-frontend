<script lang="ts">
	import './pannelsBatteries.css';
	import './solarPompingStyle.css';
	import { slide } from 'svelte/transition';
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
		params = $bindable()
	}: {
		visibility: boolean;
		params: Cablage | undefined;
	} = $props();

	let inputWidth = $state('90%');
	let valuesDefined = $state(false);

	$effect(() => {
		if (valuesDefined) {
			params = {
				materiau: undefined,
				longueurString: NaN,
				longueurPrincipalDC: NaN,
				longueurAC: NaN,
				methodePoseDC: undefined,
				methodePoseAC: undefined,
				conditionEnvironnement: undefined
			};
		}
		if (!valuesDefined) {
			params = undefined;
		}
	});
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Câblage de l'installation</h2>
	</legend>

	<div class="section-content">
		<div class="project-selector">
			<div class="card-grid">
				<button
					type="submit"
					class="type-card {valuesDefined === false ? 'selected' : ''}"
					onclick={() => {
						valuesDefined = false;
					}}
				>
					<!-- <span class="card-icon"></span> -->
					<div class="card-txt">
						<strong>Calculer sans le câblage</strong>
						<span>Se passer de cette partie, et dimensionner sans le câblage</span>
					</div>
				</button>

				<button
					type="button"
					class="type-card {valuesDefined === true ? 'selected' : ''}"
					onclick={() => {
						valuesDefined = true;
					}}
				>
					<!-- <span class="card-icon"></span> -->
					<div class="card-txt">
						<strong>Définir le câblage</strong>
						<span
							>Entrer les caractéristiques de l'installation pour dimensionner son câblage
							(sections, protections, ...)</span
						>
					</div>
				</button>
			</div>
		</div>

		{#if valuesDefined && params}
			<div class="custom-editor" transition:slide>
				<div class="inputs-grid">
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
						label="câble champ PV (strings) → boîte jonction"
						defaultName="m"
						bind:bindValue={params.longueurString}
						minValue="1"
						inputMode="numeric"
						L={inputWidth}
						isRequired={true}
					/>

					<Input
						type="number"
						name="cable-longueur-DC"
						label="câble DC (boîte de jonction → onduleur)"
						defaultName="m"
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
						label="câble AC (onduleur → tableau)"
						defaultName="m"
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
						label="Environnement des câbles (dé-rating)"
						bind:value={params.conditionEnvironnement}
						options={CONDITION_ENVIRONNEMENT_OPTIONS}
						isRequired={true}
					/>
				</div>
			</div>
		{/if}
	</div>
</fieldset>
