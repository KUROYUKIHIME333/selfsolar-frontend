<script lang="ts">
	import './solarPompingStyle.css';
	import { slide } from 'svelte/transition';
	import Slider from '$components/atoms/Slider.svelte';
	import Input from '$components/atoms/Input.svelte';
	import type { ParametresOnduleur } from '$lib/types/pv.types';

	let {
		params = $bindable(),
		visibility = true,
		actionAfter
	}: {
		params: undefined | ParametresOnduleur;
		visibility?: boolean;
		actionAfter: () => void;
	} = $props();

	let onduleurCustom = $state(false);
	let inputWidth = $state('90%');

	$effect(() => {
		if (onduleurCustom) {
			if (!params) {
				params = {
					puissanceACNominale: undefined,
					tensionDCMax: undefined,
					tensionMPPTMin: undefined,
					tensionMPPTMax: undefined,
					courantDCMax: undefined,
					puissanceDCMax: undefined,
					puissanceSurcharge: undefined,
					rendementMPPT: undefined,
					tensionBatterieMin: undefined,
					tensionBatterieMax: undefined,
					puissanceChargeBatterieMax: undefined
				};
			} else {
				params.rendementMPPT = params.rendementMPPT ?? 0.96;
			}
		}
		if (!onduleurCustom) {
			params = undefined;
		}
	});
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<div class="section-content">
		<legend class="section-legend">
			<h2>Candidat Onduleur</h2>
		</legend>
		<!-- SÉLECTEUR DE TYPE DE PROJET -->
		<div class="project-selector">
			<div class="card-grid">
				<button
					type="button"
					class="type-card {onduleurCustom === false ? 'selected' : ''}"
					onclick={() => {
						onduleurCustom = false;
						actionAfter();
					}}
				>
					<!-- <span class="card-icon"></span> -->
					<div class="card-txt">
						<strong>Pas de candidat</strong>
						<span>Pas d'onduleur à imposer mais inclure son choix dans le dimensionnement</span>
					</div>
				</button>

				<button
					type="button"
					class="type-card {onduleurCustom === true ? 'selected' : ''}"
					onclick={() => {
						onduleurCustom = true;
					}}
				>
					<!-- <span class="card-icon"></span> -->
					<div class="card-txt">
						<strong>Onduleur candidat</strong>
						<span>Vérifier si le modèle disponible conviendra à l'installation</span>
					</div>
				</button>
			</div>
		</div>

		{#if onduleurCustom === true && params}
			<div class="pumping-fields" transition:slide>
				<p class="group-label">Caractéristiques de l'onduleur candidat</p>

				<div class="inputs-row">
					<Input
						name="onduleur-puissanceACNominale"
						label="Puissance nominale en sortie (AC)"
						type="number"
						bind:bindValue={params.puissanceACNominale}
						L={inputWidth}
					/>

					<Input
						name="onduleur-puissanceDCMax"
						label="Puissance maximale en entrée (DC)"
						type="number"
						bind:bindValue={params.puissanceDCMax}
						L={inputWidth}
					/>

					<Input
						name="onduleur-puissanceSurcharge"
						label="Pic soutenable (démarrage moteurs)"
						type="number"
						bind:bindValue={params.puissanceSurcharge}
						L={inputWidth}
					/>

					<Input
						name="onduleur-tensionDCMax"
						label="Tension maximum en entrée (DC)"
						type="number"
						bind:bindValue={params.tensionDCMax}
						L={inputWidth}
					/>

					<Input
						name="onduleur-tensionMPPTMin"
						label="Tension minimum pour fonctionnement MPPT"
						type="number"
						bind:bindValue={params.tensionMPPTMin}
						L={inputWidth}
					/>

					<Input
						name="onduleur-tensionMPPTMax"
						label="Maximum de la plage MPPT"
						type="number"
						bind:bindValue={params.tensionMPPTMax}
						L={inputWidth}
					/>

					<div class="normal-factor">
						<label class="normal-factor-label" for="rendement-mppt-slider">
							Rendement MPPT
							{#if params.rendementMPPT}
								<span class="normal-factor-value">{params.rendementMPPT.toFixed(2)}</span>
							{/if}
						</label>
						<Slider
							name="rendement-mppt-slider"
							min={0.8}
							max={0.99}
							step={0.05}
							bind:value={params.rendementMPPT}
						/>
					</div>

					<p class="info-paragraphe">
						Les champs qui suivent sont réservés aux systèmes hybrides :
					</p>

					<Input
						name="onduleur-tensionBatterieMin"
						label="Tension minimale - Batteries"
						type="number"
						bind:bindValue={params.tensionBatterieMin}
						L={inputWidth}
					/>

					<Input
						name="onduleur-tensionBatterieMax"
						label="Tension maximale - Batteries"
						type="number"
						bind:bindValue={params.tensionBatterieMax}
						L={inputWidth}
					/>

					<Input
						name="onduleur-puissanceChargeBatterieMax"
						label="Puissance maximale - Charge Batteries"
						type="number"
						bind:bindValue={params.puissanceChargeBatterieMax}
						L={inputWidth}
					/>
				</div>
			</div>
		{/if}
	</div>
</fieldset>
