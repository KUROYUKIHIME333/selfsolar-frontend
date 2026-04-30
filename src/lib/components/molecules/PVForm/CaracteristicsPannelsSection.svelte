<script lang="ts">
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
						<p>Utiliser les valeurs d'une fiche technique</p>
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

<style>
	.panel-explorer {
		border: none;
		padding: 0;
		margin-top: 2rem;
		width: 100%;
		max-width: 100%;
		overflow: hidden;
	}

	.content-body {
		width: 100%;
	}

	.hero-selection {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: 1rem;
	}

	.choice-card {
		background: var(--bg-secondary, #f9fafb);
		border: 1.5px solid #e5e7eb;
		border-radius: 12px;
		padding: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: left;
	}

	.choice-card:hover {
		border-color: var(--color-primary, #3b82f6);
		background: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.choice-card .icon {
		font-size: 2rem;
	}
	.choice-card h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}
	.choice-card p {
		margin: 0;
		font-size: 0.85rem;
		color: #6b7280;
	}

	.catalogue-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.nav-row {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.brand-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		overflow-x: auto;
		padding: 0.75rem 0;
		max-width: 100%;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}

	.brand-tabs::-webkit-scrollbar {
		display: none;
	}

	.tab {
		padding: 0.4rem 1rem;
		background: #eee;
		border-radius: 20px;
		border: none;
		white-space: nowrap;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		transition:
			background 0.2s,
			color 0.2s;
	}

	.tab:hover {
		background: linear-gradient(
			90deg,
			var(--primary-color) 0%,
			var(--secondary-color) 51%,
			var(--tertiary-color) 100%
		);
		background-clip: text;
		color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradientMove 2s ease infinite;
	}

	.tab.active {
		background: #333;
		color: var(--back-yellow-gray);
	}

	.model-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
		gap: 1rem;
		width: 100%;
	}

	.model-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 10px;
		padding: 1rem;
		text-align: left;
		cursor: pointer;
		position: relative;
		width: 100%;
		min-width: 0;
		transition:
			border-color 0.2s,
			background-color 0.2s;
	}

	.model-card.is-active {
		border-color: #3b82f6;
		background: #f0f7ff;
	}

	.model-card:hover {
		border-color: var(--tertiary-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		background: var(--back-yellow-gray);
	}

	.power-badge {
		font-size: var(--title-size);
		background: var(--back-yellow-gray);
		color: var(--primary-color);
		padding: 5px 10px;
		border-radius: 9999px;
		font-weight: bold;
	}

	.power-badge:hover {
		background: var(--secondary-color);
		color: var(--back-yellow-gray);
		font-weight: var(--text-weight);
	}

	.card-details {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		margin-top: 0.75rem;
		color: #6b7280;
	}

	.check {
		position: absolute;
		top: -8px;
		right: -8px;
		background: #3b82f6;
		color: white;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 0.75rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.inputs-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.empty-state {
		text-align: center;
		color: #9ca3af;
		padding: 3rem 1rem;
		border: 2px dashed #f3f4f6;
		border-radius: 12px;
	}

	.is-hidden-now {
		display: none;
	}

	@media (max-width: 768px) {
		.inputs-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.choice-card {
			padding: 1rem;
		}
		.choice-card .icon {
			font-size: 1.5rem;
		}
	}
</style>
