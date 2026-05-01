<script lang="ts">
	import Input from '$components/atoms/Input.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import type { ParametresOnduleur } from '$lib/types/pv.types';

	let {
		inputWidth = '90%',
		visibility = true,
		params = $bindable() as ParametresOnduleur
	}: {
		inputWidth?: string;
		visibility?: boolean;
		params: ParametresOnduleur;
	} = $props();
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Caractéristiques onduleur (votre candidat)</h2>
	</legend>

	<div class="section-content">
		<p class="section-datas-style">
			<span
				>Si vous avez déjà une idée sur l'onduleur à utiliser, ou un candidat, ou juste un sous la
				main.</span
			>
			<span>Juste pour vérifier qu'il est adapté.</span>
			<span>Si vous n'en avez pas, pas de soucis, passez cette partie.</span>
		</p>

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

			<!-- <p class="factor-help">
				<span>Prend en compte la non-simultanéité entre les usages.</span>
				<span>Résidentiel : entre 0.5 et 0.7. Standard : 0.8.</span>
			</p> -->
		</div>

		<p class="info-paragraphe">Les champs qui suivent sont réservés aux systèmes hybrides :</p>

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
</fieldset>

<style>
	.info-paragraphe {
		color: var(--super-gray-text);
		padding-top: 1rem;
	}
</style>
