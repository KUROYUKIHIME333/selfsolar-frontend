<script lang="ts">

	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import './formPV.css';

	// Composants
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	// import MapSelector from '$components/molecules/MapSelector.svelte';
	import EquipementCard from '$components/atoms/EquipementCard.svelte';
	import EquipementSection from '$components/molecules/PVForm/EquipementSection.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import Select from '$components/atoms/Select.svelte';
	import PostIt from '$components/atoms/PostIt.svelte';

	// Constantes
	import { DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL } from '$lib/utils/textConstantes';
	import { SvelteSet } from 'svelte/reactivity';

	// Types API (stricts)
	import type {
		Localisation,
		Equipement,
		ParametresPanneau,
		TemperaturesAttendue,
		ContraintesOnduleur,
		Cablage,
		PompageCaracteristiques
	} from '$lib/types/pv.types';

	// État réactif
	let localisation: Localisation = { lat: 0, long: 0 };
	let equipements: Equipement[] = [{ P: 0, h: 0, ks: 0.5 }];
	let facteurFoisonnementGlobal: number = DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL;
	let typeInstallation: string = 'STANDARD';
	let typeSysteme: string = 'off-grid';

	let parametresPanneau: ParametresPanneau = {
		puissanceCreteModule: 400,
		tensionVoc: 45,
		courantCourtCircuit: 12,
		tensionMPP: 37,
		courantMPP: 10.8,
		coeffTempTension: 0.0035,
		coeffTempPuissance: 0.004,
		noct: 45
	};

	let temperaturesAttendue: TemperaturesAttendue = {
		temperatureMin: -10,
		temperatureMax: 45
	};

	let irradianceMax: number = 1000;

	let contraintesOnduleur: ContraintesOnduleur = {};
	let autonomieBatterie: number = 2;
	let technologieBatterie: string = 'LiFePO4';
	let tensionSystemeBatterie: number = 48;

	let cablage: Cablage = {
		materiau: 'cuivre',
		longueurString: 15,
		longueurPrincipalDC: 10,
		longueurAC: 20,
		methodePoseDC: 'conduit_surface',
		methodePoseAC: 'conduit_encastre',
		conditionEnvironnement: 'chaud'
	};

	let pompageSolaire: boolean = false;
	let pompageCaracteristiques: PompageCaracteristiques = {
		batteries: false,
		masseVolumique: 1000,
		accelerationPesanteur: 9.81,
		debit: 0,
		hauteurMano: 0,
		rendementPompe: 0.5
	};

	// Sections actives (plusieurs peuvent être ouvertes)
	let activeSections: Set<number> = new SvelteSet([0]);

	function toggleSection(id: number): void {
		if (activeSections.has(id)) {
			activeSections.delete(id);
		} else {
			activeSections.add(id);
		}
		activeSections = activeSections; // trigger reactivity
	}

	function isActive(id: number): boolean {
		return activeSections.has(id);
	}

	// Gestion équipements
	function addEquipement(): void {
		equipements = [...equipements, { P: 0, h: 0, ks: 0.5 }];
	}

	function removeEquipement(index: number): void {
		if (equipements.length > 1) {
			equipements = equipements.filter((_, i) => i !== index);
		}
	}

	// Calcul réactif de la puissance totale
	$: puissanceTotale =
		equipements.reduce((acc, eq) => acc + eq.P * eq.h * eq.ks, 0) * facteurFoisonnementGlobal;

	// État du submit
	let isSubmitting: boolean = false;
	let submitError: string | null = null;

	async function handleSubmit(): Promise<void> {
		if (isSubmitting) return;

		isSubmitting = true;
		submitError = null;

		const payload = {
			localisation,
			equipements: equipements.map((eq) => ({
				...(eq.nom && { nom: eq.nom }),
				P: eq.P,
				h: eq.h,
				ks: eq.ks
			})),
			facteurFoisonnementGlobal,
			typeInstallation,
			typeSysteme,
			parametresPanneau,
			temperaturesAttendue,
			...(irradianceMax !== 1000 && { irradianceMax }),
			...(Object.keys(contraintesOnduleur).length > 0 && { contraintesOnduleur }),
			...(typeSysteme !== 'on-grid' && {
				autonomieBatterie,
				technologieBatterie,
				tensionSystemeBatterie
			}),
			cablage,
			...(pompageSolaire && {
				pompageSolaire,
				pompageCaracteristiques
			})
		};

		try {
			const response = await fetch('/api/pv', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
			}

			const result = await response.json();
			console.log('Succès:', result);
		} catch (error) {
			submitError = error instanceof Error ? error.message : 'Erreur inconnue';
			console.error('Erreur submit:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<PostIt content="Workspace" type="badge" />

<div class="artisan-grid">
	<!-- Colonne Gauche : Formulaire -->

	<div class="workspace-card">
		<form on:submit|preventDefault={handleSubmit} class="artisan-form">
			{#if submitError}
				<div class="error-banner" transition:slide>
					<span class="error-icon">⚠️</span>
					<span class="error-text">{submitError}</span>
				</div>
			{/if}

			<!-- Section 1: Équipements -->
			<!-- <fieldset class="form-section" class:active={isActive(0)}>
				<button type="button" on:click={() => toggleSection(0)} class="section-legend">
					<span class="legend-icon">⚡</span>
					<span>Inventaire des équipements électriques</span>
					<span class="legend-toggle">{isActive(0) ? '−' : '+'}</span>
				</button>

				{#if isActive(0)}
					<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
						{#each equipements as equipement, index (index)}
							<div class="equipement-item" transition:fade>
								<EquipementCard
									identifier={String(index)}
									nom={equipement.nom}
									puissance={equipement.P}
									duree={equipement.h}
									simultaneite={equipement.ks}
									showRemove={equipements.length > 1}
									on:update={(e) => {
										const { field, value } = e.detail;
										equipements = equipements.map((eq, i) =>
											i === index ? { ...eq, [field]: value } : eq
										);
									}}
									on:remove={() => removeEquipement(index)}
								/>
							</div>
						{/each}

						<Button
							variant="secondary"
							label="+ Ajouter un équipement"
							clickAction={addEquipement}
							L="100%"
						/>

						<div class="global-factor">
							<label class="factor-label" for="facteurFoisonnementGlobalInput">
								Facteur de foisonnement global
								<span class="factor-value">{facteurFoisonnementGlobal.toFixed(2)}</span>
							</label>
							<Slider
								name="facteurFoisonnementGlobalInput"
								min={0.5}
								max={1}
								step={0.05}
								bind:value={facteurFoisonnementGlobal}
							/>
						</div>

						<div class="power-summary">
							<span class="summary-label">Puissance journalière estimée</span>
							<span class="summary-value">{(puissanceTotale / 1000).toFixed(2)} kWh/j</span>
						</div>
					</div>
				{/if}
			</fieldset> -->

			<EquipementSection {facteurFoisonnementGlobal} />

			<!-- Section 2: Localisation -->
			<!-- <fieldset class="form-section" class:active={isActive(1)}>
					<button type="button" on:click={() => toggleSection(1)} class="section-legend">
						<span class="legend-icon">📍</span>
						<span>Coordonnées géographiques du site</span>
						<span class="legend-toggle">{isActive(1) ? '−' : '+'}</span>
					</button>

					{#if isActive(1)}
						<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
							<MapSelector
								bind:lat={localisation.lat}
								bind:long={localisation.long}
								bind:altitude={localisation.altitude}
							/>
						</div>
					{/if}
				</fieldset> -->

			<!-- Section 3: Type d'installation -->
			<fieldset class="form-section" class:active={isActive(2)}>
				<button type="button" on:click={() => toggleSection(2)} class="section-legend">
					<span class="legend-icon">⚙️</span>
					<span>Type d'installation et de système</span>
					<span class="legend-toggle">{isActive(2) ? '−' : '+'}</span>
				</button>

				{#if isActive(2)}
					<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
						<div class="form-row">
							<Select
								name="typeInstallation"
								label="Qualité de l'installation"
								bind:value={typeInstallation}
								options={[
									{ value: 'HAUTE_QUALITE', label: 'Haute qualité' },
									{ value: 'STANDARD', label: 'Standard' },
									{ value: 'POUSSIEREUX', label: 'Poussiéreux' },
									{ value: 'FAIBLE_MAINTENANCE', label: 'Faible maintenance' },
									{ value: 'ANCIEN', label: 'Ancien' },
									{ value: 'CABLE_LONG', label: 'Câble long' }
								]}
							/>

							<Select
								name="typeSysteme"
								label="Architecture système"
								bind:value={typeSysteme}
								options={[
									{ value: 'on-grid', label: 'On-grid' },
									{ value: 'off-grid', label: 'Off-grid' },
									{ value: 'hybride', label: 'Hybride' }
								]}
							/>
						</div>
					</div>
				{/if}
			</fieldset>

			<!-- Section 4: Caractéristiques STC -->
			<fieldset class="form-section" class:active={isActive(3)}>
				<button type="button" on:click={() => toggleSection(3)} class="section-legend">
					<span class="legend-icon">☀️</span>
					<span>Caractéristiques STC du module PV</span>
					<span class="legend-toggle">{isActive(3) ? '−' : '+'}</span>
				</button>

				{#if isActive(3)}
					<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
						<div class="form-grid">
							<Input
								type="number"
								name="puissanceCreteModule"
								label="Pmax (Wp)"
								bindValue={parametresPanneau.puissanceCreteModule}
								isRequired={true}
								minValue="50"
							/>
							<Input
								type="number"
								name="tensionVoc"
								label="Voc (V)"
								bindValue={parametresPanneau.tensionVoc}
								isRequired={true}
							/>
							<Input
								type="number"
								name="courantCourtCircuit"
								label="Isc (A)"
								bindValue={parametresPanneau.courantCourtCircuit}
								isRequired={true}
							/>
							<Input
								type="number"
								name="tensionMPP"
								label="Vmpp (V)"
								bindValue={parametresPanneau.tensionMPP}
								isRequired={true}
							/>
							<Input
								type="number"
								name="courantMPP"
								label="Impp (A)"
								bindValue={parametresPanneau.courantMPP}
							/>
							<Input
								type="number"
								name="coeffTempTension"
								label="β Voc (/°C)"
								bindValue={parametresPanneau.coeffTempTension}
								isRequired={true}
							/>
							<Input
								type="number"
								name="coeffTempPuissance"
								label="γ Pmax (/°C)"
								bindValue={parametresPanneau.coeffTempPuissance}
								isRequired={true}
							/>
							<Input
								type="number"
								name="noct"
								label="NOCT (°C)"
								bindValue={parametresPanneau.noct}
							/>
						</div>

						<div class="form-row">
							<Input
								type="number"
								name="temperatureMin"
								label="Température min (°C)"
								bindValue={temperaturesAttendue.temperatureMin}
								isRequired={true}
							/>
							<Input
								type="number"
								name="temperatureMax"
								label="Température max (°C)"
								bindValue={temperaturesAttendue.temperatureMax}
								isRequired={true}
							/>
							<Input
								type="number"
								name="irradianceMax"
								label="Irradiance max (W/m²)"
								bindValue={irradianceMax}
							/>
						</div>
					</div>
				{/if}
			</fieldset>

			<!-- Section 5: Onduleur -->
			<fieldset class="form-section" class:active={isActive(4)}>
				<button type="button" on:click={() => toggleSection(4)} class="section-legend">
					<span class="legend-icon">🔌</span>
					<span>Caractéristiques onduleur candidat</span>
					<span class="legend-toggle">{isActive(4) ? '−' : '+'}</span>
				</button>

				{#if isActive(4)}
					<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
						<div class="form-grid">
							<Input
								type="number"
								name="puissanceACNominale"
								label="Puissance AC nominale (W)"
								bindValue={contraintesOnduleur.puissanceACNominale}
							/>
							<Input
								type="number"
								name="tensionDCMax"
								label="Tension DC max (V)"
								bindValue={contraintesOnduleur.tensionDCMax}
							/>
							<Input
								type="number"
								name="tensionMPPTMin"
								label="Tension MPPT min (V)"
								bindValue={contraintesOnduleur.tensionMPPTMin}
							/>
							<Input
								type="number"
								name="tensionMPPTMax"
								label="Tension MPPT max (V)"
								bindValue={contraintesOnduleur.tensionMPPTMax}
							/>
							<Input
								type="number"
								name="courantDCMax"
								label="Courant DC max (A)"
								bindValue={contraintesOnduleur.courantDCMax}
							/>
							<Input
								type="number"
								name="puissanceDCMax"
								label="Puissance DC max (W)"
								bindValue={contraintesOnduleur.puissanceDCMax}
							/>
						</div>
					</div>
				{/if}
			</fieldset>

			<!-- Section 6: Autonomie -->
			{#if typeSysteme !== 'on-grid'}
				<fieldset class="form-section" class:active={isActive(5)}>
					<button type="button" on:click={() => toggleSection(5)} class="section-legend">
						<span class="legend-icon">🔋</span>
						<span>Jours d'autonomie et stockage</span>
						<span class="legend-toggle">{isActive(5) ? '−' : '+'}</span>
					</button>

					{#if isActive(5)}
						<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
							<div class="form-row">
								<div class="slider-group">
									<label class="slider-label" for="autonomieBatterieSlider">
										Autonomie souhaitée
										<span class="slider-value">{autonomieBatterie} jours</span>
									</label>
									<Slider
										name="autonomieBatterieSlider"
										min={0.5}
										max={10}
										step={0.5}
										bind:value={autonomieBatterie}
									/>
								</div>

								<Select
									name="technologieBatterie"
									label="Technologie"
									bind:value={technologieBatterie}
									options={[
										{ value: 'Plomb-acide', label: 'Plomb-acide' },
										{ value: 'AGM/Gel', label: 'AGM/Gel' },
										{ value: 'LiFePO4', label: 'LiFePO4' },
										{ value: 'Lithium NMC/NCA', label: 'Lithium NMC/NCA' },
										{ value: 'NiCd', label: 'NiCd' }
									]}
								/>

								<Select
									name="tensionSystemeBatterie"
									label="Tension système (V)"
									bind:value={tensionSystemeBatterie}
									options={[
										{ value: 12, label: '12V' },
										{ value: 24, label: '24V' },
										{ value: 48, label: '48V' }
									]}
								/>
							</div>
						</div>
					{/if}
				</fieldset>
			{/if}

			<!-- Section 7: Câblage -->
			<fieldset class="form-section" class:active={isActive(6)}>
				<button type="button" on:click={() => toggleSection(6)} class="section-legend">
					<span class="legend-icon">🔗</span>
					<span>Câblage</span>
					<span class="legend-toggle">{isActive(6) ? '−' : '+'}</span>
				</button>

				{#if isActive(6)}
					<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
						<div class="form-grid">
							<Select
								name="materiau"
								label="Matériau conducteur"
								bind:value={cablage.materiau}
								options={[
									{ value: 'cuivre', label: 'Cuivre' },
									{ value: 'aluminium', label: 'Aluminium' }
								]}
							/>
							<Input
								type="number"
								name="longueurString"
								label="Longueur string (m)"
								bindValue={cablage.longueurString}
							/>
							<Input
								type="number"
								name="longueurPrincipalDC"
								label="Longueur principal DC (m)"
								bindValue={cablage.longueurPrincipalDC}
							/>
							<Input
								type="number"
								name="longueurAC"
								label="Longueur AC (m)"
								bindValue={cablage.longueurAC}
							/>
						</div>
					</div>
				{/if}
			</fieldset>

			<!-- Section 8: Pompage -->
			<fieldset class="form-section" class:active={isActive(7)}>
				<button type="button" on:click={() => toggleSection(7)} class="section-legend">
					<span class="legend-icon">💧</span>
					<span>Application pompage d'eau</span>
					<span class="legend-toggle">{isActive(7) ? '−' : '+'}</span>
				</button>

				{#if isActive(7)}
					<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
						<div class="toggle-group">
							<label class="toggle-label">
								<input type="checkbox" bind:checked={pompageSolaire} class="toggle-input" />
								<span class="toggle-switch"></span>
								<span>Activer le pompage solaire</span>
							</label>
						</div>

						{#if pompageSolaire}
							<div class="form-grid" transition:fade>
								<Input
									type="number"
									name="debit"
									label="Débit journalier (m³/j)"
									bindValue={pompageCaracteristiques.debit}
									isRequired={true}
								/>
								<Input
									type="number"
									name="hauteurMano"
									label="Hauteur manométrique (m)"
									bindValue={pompageCaracteristiques.hauteurMano}
									isRequired={true}
								/>
								<div class="slider-group">
									<label class="slider-label" for="rendementPompeSlider">
										Rendement pompe
										<span class="slider-value">{pompageCaracteristiques.rendementPompe}</span>
									</label>
									<Slider
										name="rendementPompeSlider"
										min={0.4}
										max={0.7}
										step={0.01}
										bind:value={pompageCaracteristiques.rendementPompe}
									/>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</fieldset>

			<div class="form-actions">
				<Button
					variant="primary"
					type="submit"
					label={isSubmitting ? 'Calcul en cours...' : 'Calculate My Sizing →'}
					loading={isSubmitting}
					L="100%"
				/>
			</div>
		</form>
	</div>

	<!-- Colonne Droite : Informations -->
	<aside class="info-panel">
		<div class="info-card image-card">
			<img
				src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
				alt="Installation photovoltaïque"
				class="info-image"
			/>
		</div>

		<div class="info-card">
			<h3 class="info-title">Why Precision Matters</h3>
			<p class="info-text">
				A system that's too small won't meet your needs, while one that's too large increases
				initial costs without proportional returns. We find the "Goldilocks" zone.
			</p>
		</div>

		<div class="info-card pro-tip">
			<div class="pro-tip-header">
				<span class="pro-tip-icon">💡</span>
				<h4 class="pro-tip-title">Pro Tip: Shading</h4>
			</div>
			<p class="pro-tip-text">
				Even a small amount of shade from a chimney or tree can drop your entire array's efficiency
				by 50%. Always measure in peak sunlight!
			</p>
		</div>

		<div class="stats-grid">
			<div class="stat-card">
				<span class="stat-icon">☀️</span>
				<span class="stat-label">Avg. Sun Hours</span>
				<span class="stat-value">--</span>
			</div>
			<div class="stat-card">
				<span class="stat-icon">🌱</span>
				<span class="stat-label">CO2 Offset</span>
				<span class="stat-value">--</span>
			</div>
		</div>
	</aside>
</div>
