<script lang="ts">
	import './solarPompingStyle.css';
	import './pannelsBatteries.css';
	import { slide, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { initialDatasStore } from '$stores/initialDatas';
	import Input from '$components/atoms/Input.svelte';
	import type { ModelePanneau, ParametresPanneau } from '$lib/types/pv.types';

	let {
		visibility = true,
		params = $bindable() as ParametresPanneau
	}: {
		visibility?: boolean;
		params: ParametresPanneau;
	} = $props();

	let viewMode = $state<undefined | 'catalogue' | 'custom'>(undefined);
	let activeBrandKey = $state<string>(''); // Initialisé à vide pour le typage
	let selectedModelName = $state<string | undefined>('');
	let inputWidth = $state('90%');
	let pannelsConfig = $state();

	// Dérivations typées
	const catalogue = $derived($initialDatasStore.liste_panneaux?.catalogue_pv || {});
	const brands = $derived($initialDatasStore.liste_panneaux?.liste_marques || []);

	const filteredModels = $derived.by((): ModelePanneau[] => {
		if (!activeBrandKey) return [];
		return catalogue[activeBrandKey]?.modeles || [];
	});

	// Met à jour les paramètres globaux à partir d'un modèle du catalogue

	const handleSelectModel = (mod: ModelePanneau): void => {
		selectedModelName = mod.nom;
		params = {
			puissanceCreteModule: mod.puissance_max,
			tensionVoc: mod.tension_vide,
			courantCourtCircuit: mod.courant_cc,
			tensionMPP: mod.tension_mpp,
			courantMPP: mod.courant_mpp,
			coeffTempTension: mod.coeff_v,
			coeffTempPuissance: mod.coeff_p,
			noct: mod.noct
		};
	};
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<div class="section-content">
		<legend class="section-legend">
			<h2>Choix des panneaux</h2>
		</legend>
		<!-- SÉLECTEUR DE TYPE DE PROJET -->
		<div class="project-selector">
			<div class="card-grid">
				<button
					type="button"
					class="type-card {pannelsConfig && viewMode === 'catalogue' ? 'selected' : ''}"
					onclick={() => {
						pannelsConfig = true;
						viewMode = 'catalogue';
					}}
				>
					<span class="card-icon">🔍</span>
					<div class="card-txt">
						<strong>Catalogue constructeur</strong>
						<span>Choisir parmi les marques référencées (Jinko, Trina, Longi, JA Solar...)</span>
					</div>
				</button>

				<button
					type="button"
					class="type-card {pannelsConfig && viewMode === 'custom' ? 'selected' : ''}"
					onclick={() => {
						pannelsConfig = true;
						viewMode = 'custom';
					}}
				>
					<span class="card-icon">✏️</span>
					<div class="card-txt">
						<strong>Saisie manuelle</strong>
						<span>Renseigner une fiche technique spécifique</span>
					</div>
				</button>
			</div>
		</div>

		{#if viewMode === 'catalogue'}
			<div class="catalogue-container" transition:slide>
				<div class="nav-row">
					<div class="brand-tabs">
						{#each brands as bKey (bKey)}
							<button
								type="button"
								class="tab"
								class:active={activeBrandKey === bKey}
								onclick={() => (activeBrandKey = bKey)}
							>
								{catalogue[bKey].nom_afic}
							</button>
						{/each}
					</div>
				</div>

				{#if activeBrandKey}
					<div class="model-grid" transition:slide>
						{#each filteredModels as mod (mod.nom)}
							<button
								type="button"
								class="model-card"
								class:is-active={selectedModelName === mod.nom}
								onclick={() => handleSelectModel(mod)}
								animate:flip={{ duration: 200 }}
							>
								<div class="card-top">
									<span class="power-badge">{mod.puissance_max} Wp</span>
									<h4>{mod.nom}</h4>
								</div>
								<div class="card-details">
									<span>Voc <b>{mod.tension_vide}V</b></span>
									<span>Icc <b>{mod.courant_cc}A</b></span>
								</div>
								{#if selectedModelName === mod.nom}
									<div class="check" in:scale>✔</div>
								{/if}
							</button>
						{/each}
					</div>
				{:else}
					<div class="empty-state">Sélectionnez une marque pour voir les modèles</div>
				{/if}
			</div>
		{/if}

		{#if viewMode === 'custom'}
			<div class="custom-editor" transition:slide>
				<div class="inputs-grid">
					<Input
						name="pannel-puissance"
						label="Puissance Crête (Wp)"
						type="number"
						bind:bindValue={params.puissanceCreteModule}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-uoc"
						label="Tension Voc (V)"
						type="number"
						bind:bindValue={params.tensionVoc}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-isc"
						label="Courant Icc (A)"
						type="number"
						bind:bindValue={params.courantCourtCircuit}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-umpp"
						label="Tension MPP (V)"
						type="number"
						bind:bindValue={params.tensionMPP}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-impp"
						label="Courant MPP (A)"
						type="number"
						bind:bindValue={params.courantMPP}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-coeff-v"
						label="Coeff. Temp Tension"
						type="number"
						bind:bindValue={params.coeffTempTension}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-coeff-p"
						label="Coeff. Temp Puissance"
						type="number"
						bind:bindValue={params.coeffTempPuissance}
						L={inputWidth}
						isRequired={true}
					/>
					<Input
						name="pannel-noct"
						label="NOCT (°C)"
						type="number"
						bind:bindValue={params.noct}
						L={inputWidth}
					/>
				</div>
			</div>
		{/if}
	</div>
</fieldset>
