<script lang="ts">
	import './solarPompingStyle.css';
	import type { PompageCaracteristiques } from '$lib/types/pv.types';
	import { slide } from 'svelte/transition';
	import Input from '$components/atoms/Input.svelte';
	import Select from '$components/atoms/Select.svelte';

	let {
		pompageSolaire = $bindable(),
		params = $bindable(),
		visibility = true,
		actionAfter
	}: {
		pompageSolaire: boolean | undefined;
		params: undefined | PompageCaracteristiques;
		visibility?: boolean;
		actionAfter: () => void;
	} = $props();

	let inputwidth = $state('90%');

	// Options pour le Select du rendement
	const rendementOptions = [
		{ label: 'Pompe immergée standard (~45%)', value: 0.45 },
		{ label: 'Pompe solaire optimisée (~60%)', value: 0.6 },
		{ label: 'Système haute performance (~70%)', value: 0.7 }
	];

	$effect(() => {
		if (pompageSolaire) {
			if (!params) {
				params = {
					batteries: undefined,
					masseVolumique: 1000,
					accelerationPesanteur: 9.81,
					debit: undefined,
					hauteurMano: undefined,
					rendementPompe: 0.45
				};
			} else {
				params.masseVolumique = params.masseVolumique ?? 1000;
				params.accelerationPesanteur = params.accelerationPesanteur ?? 9.81;
				if (params.batteries === undefined) params.batteries = false;
			}
		}
		if (!pompageSolaire) {
			params = undefined;
		}
	});
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<div class="section-content">
		<legend class="section-legend">
			<h2>Objectif de l'installation</h2>
		</legend>
		<!-- SÉLECTEUR DE TYPE DE PROJET -->
		<div class="project-selector">
			<div class="card-grid">
				<button
					type="button"
					class="type-card {pompageSolaire === false ? 'selected' : ''}"
					onclick={() => {
						pompageSolaire = false;
						actionAfter();
					}}
				>
					<span class="card-icon">🏠</span>
					<div class="card-txt">
						<strong>Usage Domestique ou Tiers</strong>
						<span
							>Alimenter des récepteurs électriques classiques (Éclairage, froid, multimédia, ...)</span
						>
					</div>
				</button>

				<button
					type="button"
					class="type-card {pompageSolaire === true ? 'selected' : ''}"
					onclick={() => {
						pompageSolaire = true;
					}}
				>
					<span class="card-icon">💧</span>
					<div class="card-txt">
						<strong>Alimenter un système de pompage (Solaire)</strong>
						<span
							>Extraire de l'eau via un système de pompage pour applications diverses (Irrigation,
							bétail, eau potable, ...)</span
						>
					</div>
				</button>
			</div>
		</div>

		{#if pompageSolaire === true && params}
			<div class="pumping-fields" transition:slide>
				<p class="group-label">Besoins hydroliques</p>

				<div class="inputs-row">
					<!-- Utilisation de ton composant Input -->
					<Input
						name="debit"
						label="Débit journalier requis"
						type="number"
						defaultName="m³/jour"
						bind:bindValue={params.debit}
						isRequired={true}
						L={inputwidth}
					/>

					<Input
						name="hmt"
						label="Hauteur Manométrique (HMT)"
						type="number"
						defaultName="mètres"
						bind:bindValue={params.hauteurMano}
						isRequired={true}
						L={inputwidth}
					/>

					<!-- Utilisation de ton composant Select -->
					<Select
						name="rendement"
						label="Rendement de la pompe"
						options={rendementOptions}
						bind:value={params.rendementPompe}
						isRequired={true}
					/>
				</div>

				<!-- LOGIQUE DE STOCKAGE (Explication pédagogique) -->
				<div class="storage-strategy">
					<p class="strategy-title">Stratégie de stockage de l'énergie :</p>

					<div class="strategy-options">
						<button
							type="button"
							class="strategy-btn {!params.batteries ? 'active' : ''}"
							onclick={() => {
								if (params) {
									params.batteries = false;
								}
							}}
						>
							<strong>Stockage Hydraulique (Conseillé)</strong>
							<p>
								L'eau est stockée dans un réservoir en hauteur. L'énergie est "conservée" sous forme
								de pression gravitaire.
							</p>
						</button>

						<button
							type="button"
							class="strategy-btn {params.batteries ? 'active' : ''}"
							onclick={() => {
								if (params) {
									params.batteries = true;
								}
							}}
						>
							<strong>Stockage Électrique (Batteries)</strong>
							<p>L'énergie est stockée chimiquement pour pomper à tout moment, même sans soleil.</p>
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</fieldset>
