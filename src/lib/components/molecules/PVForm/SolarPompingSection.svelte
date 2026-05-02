<script lang="ts">
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
		params: PompageCaracteristiques;
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
		if (pompageSolaire === true) {
			params.masseVolumique = params.masseVolumique ?? 1000;
			params.accelerationPesanteur = params.accelerationPesanteur ?? 9.81;
			if (params.batteries === undefined) params.batteries = false;
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

		{#if pompageSolaire === true}
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
							onclick={() => (params.batteries = false)}
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
							onclick={() => (params.batteries = true)}
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

<style>
	.project-selector {
		margin-bottom: 2rem;
	}
	.group-label {
		display: block;
		font-weight: bold;
		margin-bottom: 1rem;
		color: #444;
	}

	.card-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.type-card {
		display: flex;
		padding: 1.2rem;
		background: white;
		border: 2px solid #ddd;
		border-radius: 12px;
		cursor: pointer;
		text-align: left;
		transition: 0.2s;
	}

	.type-card:hover {
		scale: 1.005;
		background: var(--back-yellow-gray);
	}

	.type-card.selected {
		border-color: var(--tertiary-color);
		background: var(--back-yellow-gray);
	}

	.card-icon {
		font-size: 2rem;
		margin-right: 1rem;
	}
	.card-txt strong {
		display: block;
	}
	.card-txt span {
		font-size: 0.8rem;
		color: #777;
	}

	.inputs-row {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.storage-strategy {
		margin-top: 2rem;
	}
	.strategy-title {
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.strategy-options {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.strategy-btn {
		text-align: left;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		background: #fafafa;
		cursor: pointer;
		transition: 0.3s;
	}

	.strategy-btn.active {
		border-color: var(--tertiary-color);
		background: var(--back-yellow-gray);
		box-shadow: 0 2px 8px rgba(204, 146, 46, 0.2);
	}

	.strategy-btn strong {
		color: #333;
	}
	.strategy-btn p {
		font-size: 0.8rem;
		color: #666;
		margin: 4px 0 0 0;
	}
</style>
