<script lang="ts">
	import './pannelsBatteries.css';
	import { fade, slide, fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { initialDatasStore } from '$stores/initialDatas';
	import Button from '$components/atoms/Button.svelte';
	import Input from '$components/atoms/Input.svelte';
	import Select from '$components/atoms/Select.svelte';
	import type {
		ModeleBatterie,
		TechnologieBatterie,
		ParametresBatterie
	} from '$lib/types/pv.types';

	let {
		visibility = true,
		autonomieBatterie = $bindable(undefined),
		technologieBatterie = $bindable(undefined),
		tensionSystemeBatterie = $bindable(undefined),
		params = $bindable() as ParametresBatterie,
		noSettingToDo = $bindable(undefined)
	}: {
		visibility?: boolean;
		autonomieBatterie: number | undefined;
		technologieBatterie: TechnologieBatterie | undefined;
		tensionSystemeBatterie: number | undefined;
		params: ParametresBatterie;
		noSettingToDo: (() => void) | undefined;
	} = $props();

	let viewMode = $state<'selection' | 'catalogue' | 'custom'>('selection');
	let activeBrandKey = $state<string>(''); // Initialisé à vide pour le typage
	let selectedModelName = $state<string | undefined>('');
	let inputWidth = $state('90%');

	// CONSTANTES & MAPPINGS
	const TECHNO_MAP: Record<string, TechnologieBatterie> = {
		plomb_acide_flooded: 'Plomb-acide',
		agm_gel: 'AGM/Gel',
		lifepo4: 'LiFePO4',
		lithium_nmc_nca: 'Lithium NMC/NCA',
		nicd: 'NiCd'
	};

	const TECHNO_LABELS: Record<TechnologieBatterie, string> = {
		'Plomb-acide': 'Plomb-acide (Classique, économique)',
		'AGM/Gel': 'AGM / Gel (Sans entretien)',
		LiFePO4: 'Lithium LiFePO4 (Durable, sécurisé)',
		'Lithium NMC/NCA': 'Lithium NMC/NCA (Compact, puissant)',
		NiCd: 'Ni-Cd (Conditions extrêmes)'
	};

	const TECHNO_OPTIONS = Object.entries(TECHNO_MAP).map(([, enumValue]) => ({
		value: enumValue,
		label: TECHNO_LABELS[enumValue]
	}));

	const TENSION_OPTIONS = [
		{ value: NaN, label: 'Automatique (Recommandé)' },
		{ value: 12, label: '12 Volts (Petit système, inférieurs à 500Wc)' },
		{ value: 24, label: '24 Volts (Système moyen, entre 500Wc et 2 kWc)' },
		{ value: 48, label: '48 Volts (Gros système, entre 2 et 10 kWc)' },
		{ value: 96, label: '96 Volts (Gros système, plus de 10 kWc)' }
	];

	// DÉRIVATIONS
	const catalogueData = $derived($initialDatasStore.listes_batteries?.catalogue_batt ?? {});
	const brandsKeys = $derived($initialDatasStore.listes_batteries?.liste_techno ?? []);

	const filteredModels = $derived.by((): ModeleBatterie[] => {
		if (!activeBrandKey) return [];
		return catalogueData[activeBrandKey]?.options ?? [];
	});

	// HANDLERS
	const handleSelectModel = (mod: ModeleBatterie): void => {
		selectedModelName = mod.nom;
		// Clone pour éviter les mutations directes
		params = { v: mod.v, ah: mod.ah };

		if (activeBrandKey && TECHNO_MAP[activeBrandKey]) {
			technologieBatterie = TECHNO_MAP[activeBrandKey];
		}
	};

	const handleBack = () => {
		viewMode = 'selection';
		activeBrandKey = '';
		selectedModelName = '';
	};
</script>

<fieldset class="panel-explorer {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>
			Stockage énergie
			{#if viewMode === 'catalogue'}
				— Catalogue
			{:else if viewMode === 'custom'}
				— Manuel
			{/if}
		</h2>
	</legend>

	<div class="section-content">
		{#if viewMode === 'selection'}
			<div in:fade={{ duration: 200 }} class="hero-selection">
				<button type="button" class="choice-card" onclick={noSettingToDo}>
					<span class="icon">⏭️</span>
					<div class="text">
						<h3>Continuer</h3>
						<p>Passer cette étape (pas de stockage prévu)</p>
					</div>
				</button>

				<button type="button" class="choice-card" onclick={() => (viewMode = 'catalogue')}>
					<span class="icon">🔍</span>
					<div class="text">
						<h3>Catalogue</h3>
						<p>Choisir parmi les batteries référencées</p>
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
					<Button variant="tertiary" label="← Retour" clickAction={handleBack} />
					<div class="brand-tabs">
						{#each brandsKeys as bKey (bKey)}
							<button
								type="button"
								class="tab"
								class:active={activeBrandKey === bKey}
								onclick={() => {
									activeBrandKey = bKey;
									selectedModelName = '';
								}}
							>
								{TECHNO_MAP[bKey] ?? bKey}
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
									<span class="power-badge">{mod.ah} Ah</span>
									<h4>{mod.desc}</h4>
								</div>
								<div class="card-details">
									<span>Tension <b>{mod.v} V</b></span>
								</div>
								{#if selectedModelName === mod.nom}
									<div class="check" in:scale>✔</div>
								{/if}
							</button>
						{/each}
					</div>
				{:else}
					<div class="empty-state">Veuillez sélectionner une technologie.</div>
				{/if}
			</div>
		{:else if viewMode === 'custom'}
			<div in:fly={{ y: 10, duration: 300 }} class="custom-editor">
				<Button variant="tertiary" label="← Retour" clickAction={handleBack} />
				<div class="inputs-grid">
					<Input
						name="batt-ah"
						label="Capacité unitaire (Ah)"
						defaultName="par ex. 150 ..."
						type="number"
						bind:bindValue={params.ah}
						L={inputWidth}
					/>

					<Input
						name="batt-v"
						label="Tension unitaire (V)"
						defaultName="par ex. 12 ..."
						type="number"
						bind:bindValue={params.v}
						L={inputWidth}
					/>

					<Input
						name="batt-autonomie"
						label="Jours d'autonomie souhaités"
						type="number"
						defaultName="Au moins 0.5 et au plus 10"
						bind:bindValue={autonomieBatterie}
						minValue={0.5}
						maxValue={15}
						L={inputWidth}
					/>

					<Select
						name="batt-techno"
						label="Type de batterie"
						bind:value={technologieBatterie}
						options={TECHNO_OPTIONS}
					/>

					<Select
						name="batt-tension-sys"
						label="Forcer la tension système (Optionnel)"
						bind:value={tensionSystemeBatterie}
						options={TENSION_OPTIONS}
					/>
				</div>
				<p class="help-text">
					Laissez la tension système sur "Automatique" pour permettre au logiciel d'optimiser le
					câblage selon vos besoins.
				</p>
			</div>
		{/if}
	</div>
</fieldset>
