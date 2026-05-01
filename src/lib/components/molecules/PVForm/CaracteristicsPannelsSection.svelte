<script lang="ts">
	import './pannelsBatteries.css';
	import { fade, slide, fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { initialDatasStore } from '$stores/initialDatas';
	import Button from '$components/atoms/Button.svelte';
	import Input from '$components/atoms/Input.svelte';
	import type { ModelePanneau, ParametresPanneau } from '$lib/types/pv.types';

	// Props avec Svelte 5 runes
	let {
		visibility = true,
		params = $bindable() as ParametresPanneau
	}: {
		visibility?: boolean;
		params: ParametresPanneau;
	} = $props();

	// États locaux typés
	let viewMode = $state<'selection' | 'catalogue' | 'custom'>('selection');
	let activeBrand = $state<string>('');
	let selectedModelName = $state<string>('');
	let inputWidth = $state('90%');

	// Dérivations typées
	const catalogue = $derived($initialDatasStore.liste_panneaux?.catalogue_pv || {});
	const brands = $derived($initialDatasStore.liste_panneaux?.liste_marques || []);

	const filteredModels = $derived.by((): ModelePanneau[] => {
		if (!activeBrand) return [];
		return catalogue[activeBrand]?.modeles || [];
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

<fieldset class="panel-explorer {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Caractéristiques des panneaux</h2>
	</legend>

	<div class="content-body">
		{#if viewMode === 'selection'}
			<div in:fade={{ duration: 200 }} class="hero-selection">
				<button type="button" class="choice-card" onclick={() => (viewMode = 'catalogue')}>
					<span class="icon">🔍</span>
					<div class="text">
						<h3>Catalogue constructeurs</h3>
						<p>Jinko, Trina, Longi, JA Solar...</p>
					</div>
				</button>
				<button type="button" class="choice-card" onclick={() => (viewMode = 'custom')}>
					<span class="icon">✏️</span>
					<div class="text">
						<h3>Saisie manuelle</h3>
						<p>Renseigner une fiche technique spécifique</p>
					</div>
				</button>
			</div>
		{:else if viewMode === 'catalogue'}
			<div in:fly={{ y: 10, duration: 300 }} class="catalogue-container">
				<div class="nav-row">
					<Button
						variant="tertiary"
						label="← Changer de mode"
						clickAction={() => (viewMode = 'selection')}
					/>
					<div class="brand-tabs">
						{#each brands as bKey (bKey)}
							<button
								type="button"
								class="tab"
								class:active={activeBrand === bKey}
								onclick={() => (activeBrand = bKey)}
							>
								{catalogue[bKey].nom_afic}
							</button>
						{/each}
					</div>
				</div>

				{#if activeBrand}
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
		{:else if viewMode === 'custom'}
			<div in:fly={{ y: 10, duration: 300 }} class="custom-editor">
				<Button variant="tertiary" label="← Retour" clickAction={() => (viewMode = 'selection')} />
				<div class="inputs-grid">
					<Input
						name="pannel-puissance"
						label="Puissance Crête (Wp)"
						type="number"
						bind:bindValue={params.puissanceCreteModule}
						L={inputWidth}
					/>
					<Input
						name="pannel-uoc"
						label="Tension Voc (V)"
						type="number"
						bind:bindValue={params.tensionVoc}
						L={inputWidth}
					/>
					<Input
						name="pannel-isc"
						label="Courant Icc (A)"
						type="number"
						bind:bindValue={params.courantCourtCircuit}
						L={inputWidth}
					/>
					<Input
						name="pannel-umpp"
						label="Tension MPP (V)"
						type="number"
						bind:bindValue={params.tensionMPP}
						L={inputWidth}
					/>
					<Input
						name="pannel-impp"
						label="Courant MPP (A)"
						type="number"
						bind:bindValue={params.courantMPP}
						L={inputWidth}
					/>
					<Input
						name="pannel-coeff-v"
						label="Coeff. Temp Tension"
						type="number"
						bind:bindValue={params.coeffTempTension}
						L={inputWidth}
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
