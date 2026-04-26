<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Composants
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	import MapSelector from '$components/molecules/MapSelector.svelte';
	import EquipementCard from '$components/atoms/EquipementCard.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import Select from '$components/atoms/Select.svelte';

	// Constantes
	import { DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL } from '$lib/utils/textConstantes';
	import { SvelteSet } from 'svelte/reactivity';

	// Types API (stricts)
	type Localisation = {
		lat: number;
		long: number;
		altitude?: number;
	};

	type Equipement = {
		nom?: string;
		P: number;
		h: number;
		ks: number;
	};

	type ParametresPanneau = {
		puissanceCreteModule: number;
		tensionVoc: number;
		courantCourtCircuit: number;
		tensionMPP: number;
		courantMPP?: number;
		coeffTempTension: number;
		coeffTempPuissance: number;
		noct?: number;
	};

	type TemperaturesAttendue = {
		temperatureMin: number;
		temperatureMax: number;
	};

	type ContraintesOnduleur = {
		puissanceACNominale?: number;
		tensionDCMax?: number;
		tensionMPPTMin?: number;
		tensionMPPTMax?: number;
		courantDCMax?: number;
		puissanceDCMax?: number;
		puissanceSurcharge?: number;
		rendementMPPT?: number;
		tensionBatterieMin?: number;
		tensionBatterieMax?: number;
		puissanceChargeBatterieMax?: number;
	};

	type Cablage = {
		materiau?: string;
		longueurString?: number;
		longueurPrincipalDC?: number;
		longueurAC?: number;
		methodePoseDC?: string;
		methodePoseAC?: string;
		conditionEnvironnement?: string;
	};

	type PompageCaracteristiques = {
		batteries: boolean;
		masseVolumique?: number;
		accelerationPesanteur?: number;
		debit: number;
		hauteurMano: number;
		rendementPompe: number;
	};

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
	$: puissanceTotale = equipements.reduce(
		(acc, eq) => acc + eq.P * eq.h * eq.ks,
		0
	) * facteurFoisonnementGlobal;

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

<div class="artisan-container">
	<header class="artisan-header">
		<div class="header-content">
			<h1 class="artisan-title">
				<span class="title-main">Photovoltaic</span>
				<span class="title-accent">Sizing</span>
			</h1>
			<p class="artisan-subtitle">
				Design your clean energy future. Let's calculate the perfect solar array for your space
				using precise artisan logic.
			</p>
		</div>
		<div class="header-badge">
			<span class="badge-text">⚡ Artisan's Workspace</span>
		</div>
	</header>

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
				<fieldset class="form-section" class:active={isActive(0)}>
					<legend on:click={() => toggleSection(0)} class="section-legend">
						<span class="legend-icon">⚡</span>
						<span>Inventaire des équipements électriques</span>
						<span class="legend-toggle">{isActive(0) ? '−' : '+'}</span>
					</legend>

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
								<label class="factor-label">
									Facteur de foisonnement global
									<span class="factor-value">{facteurFoisonnementGlobal.toFixed(2)}</span>
								</label>
								<Slider min={0.5} max={1} step={0.05} bindValue={facteurFoisonnementGlobal} />
							</div>

							<div class="power-summary">
								<span class="summary-label">Puissance journalière estimée</span>
								<span class="summary-value">{(puissanceTotale / 1000).toFixed(2)} kWh/j</span>
							</div>
						</div>
					{/if}
				</fieldset>

				<!-- Section 2: Localisation -->
				<fieldset class="form-section" class:active={isActive(1)}>
					<legend on:click={() => toggleSection(1)} class="section-legend">
						<span class="legend-icon">📍</span>
						<span>Coordonnées géographiques du site</span>
						<span class="legend-toggle">{isActive(1) ? '−' : '+'}</span>
					</legend>

					{#if isActive(1)}
						<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
							<MapSelector
								bind:lat={localisation.lat}
								bind:long={localisation.long}
								bind:altitude={localisation.altitude}
							/>
						</div>
					{/if}
				</fieldset>

				<!-- Section 3: Type d'installation -->
				<fieldset class="form-section" class:active={isActive(2)}>
					<legend on:click={() => toggleSection(2)} class="section-legend">
						<span class="legend-icon">⚙️</span>
						<span>Type d'installation et de système</span>
						<span class="legend-toggle">{isActive(2) ? '−' : '+'}</span>
					</legend>

					{#if isActive(2)}
						<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
							<div class="form-row">
								<Select
									name="typeInstallation"
									label="Qualité de l'installation"
									bindValue={typeInstallation}
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
									bindValue={typeSysteme}
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
					<legend on:click={() => toggleSection(3)} class="section-legend">
						<span class="legend-icon">☀️</span>
						<span>Caractéristiques STC du module PV</span>
						<span class="legend-toggle">{isActive(3) ? '−' : '+'}</span>
					</legend>

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
					<legend on:click={() => toggleSection(4)} class="section-legend">
						<span class="legend-icon">🔌</span>
						<span>Caractéristiques onduleur candidat</span>
						<span class="legend-toggle">{isActive(4) ? '−' : '+'}</span>
					</legend>

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
						<legend on:click={() => toggleSection(5)} class="section-legend">
							<span class="legend-icon">🔋</span>
							<span>Jours d'autonomie et stockage</span>
							<span class="legend-toggle">{isActive(5) ? '−' : '+'}</span>
						</legend>

						{#if isActive(5)}
							<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
								<div class="form-row">
									<div class="slider-group">
										<label class="slider-label">
											Autonomie souhaitée
											<span class="slider-value">{autonomieBatterie} jours</span>
										</label>
										<Slider min={0.5} max={10} step={0.5} bindValue={autonomieBatterie} />
									</div>

									<Select
										name="technologieBatterie"
										label="Technologie"
										bindValue={technologieBatterie}
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
										bindValue={tensionSystemeBatterie}
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
					<legend on:click={() => toggleSection(6)} class="section-legend">
						<span class="legend-icon">🔗</span>
						<span>Câblage</span>
						<span class="legend-toggle">{isActive(6) ? '−' : '+'}</span>
					</legend>

					{#if isActive(6)}
						<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
							<div class="form-grid">
								<Select
									name="materiau"
									label="Matériau conducteur"
									bindValue={cablage.materiau}
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
					<legend on:click={() => toggleSection(7)} class="section-legend">
						<span class="legend-icon">💧</span>
						<span>Application pompage d'eau</span>
						<span class="legend-toggle">{isActive(7) ? '−' : '+'}</span>
					</legend>

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
										<label class="slider-label">
											Rendement pompe
											<span class="slider-value">{pompageCaracteristiques.rendementPompe}</span>
										</label>
										<Slider
											min={0.4}
											max={0.7}
											step={0.01}
											bindValue={pompageCaracteristiques.rendementPompe}
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
					Even a small amount of shade from a chimney or tree can drop your entire array's
					efficiency by 50%. Always measure in peak sunlight!
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
</div>

<style>
	:global(:root) {
		--primary-color: #994f08;
		--secondary-color: #c88239;
		--tertiary-color: #f5a570;
		--back-dark: rgb(225, 227, 222);
		--back-yellow-gray: rgb(250, 249, 244);
		--gray-text: rgb(114, 115, 120);
		--color-text: rgba(0, 0, 0, 0.7);
		--dark-text: rgb(24, 24, 22);
		--marron-text: rgb(147, 72, 4);
		--back-more-dark: #e0e1db;
		--bg-dark: #1a1a1a;
		--back-dark-blue: rgb(52, 92, 145);
		--back-light-blue: rgb(212, 227, 255);
		--back-yellow: rgb(250, 235, 216);
		--danger: rgb(235, 19, 19);
		--good: rgb(3, 174, 35);
		--big-title-size: 2.5rem;
		--little-big-title-size: 1.2rem;
		--title-size: 1rem;
		--text-size: 0.9rem;
		--small-text-size: 0.85rem;
		--big-title-weight: 800;
		--title-weight: 600;
		--text-weight: 400;
		--btn-weight: 500;
		--btn-hover-weight: 600;
		--btn-size: 1rem;
		--btn-hover-size: 1.05rem;
	}

	.artisan-container {
		min-height: 100vh;
		background: var(--back-yellow-gray);
		padding: 2rem 1rem;
		font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
	}

	/* ===== ERROR BANNER ===== */
	.error-banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(235, 19, 19, 0.08);
		border: 1px solid var(--danger);
		border-radius: 1rem;
		padding: 1rem 1.25rem;
		margin-bottom: 1rem;
		color: var(--danger);
	}

	.error-icon {
		font-size: 1.2rem;
		flex-shrink: 0;
	}

	.error-text {
		font-size: var(--text-size);
		font-weight: 500;
	}

	/* ===== HEADER ===== */
	.artisan-header {
		max-width: 1400px;
		margin: 0 auto 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.header-content {
		flex: 1;
		min-width: 300px;
	}

	.artisan-title {
		font-size: var(--big-title-size);
		font-weight: var(--big-title-weight);
		line-height: 1.1;
		margin-bottom: 0.75rem;
		color: var(--dark-text);
		letter-spacing: -0.02em;
	}

	.title-main {
		display: block;
	}

	.title-accent {
		display: block;
		font-style: italic;
		color: var(--primary-color);
		background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.artisan-subtitle {
		font-size: var(--text-size);
		color: var(--gray-text);
		max-width: 500px;
		line-height: 1.6;
	}

	.header-badge {
		background: var(--back-dark-blue);
		color: white;
		padding: 0.6rem 1.2rem;
		border-radius: 2rem;
		font-size: var(--small-text-size);
		font-weight: var(--title-weight);
		box-shadow: 0 4px 15px rgba(52, 92, 145, 0.3);
		flex-shrink: 0;
	}

	/* ===== GRID ===== */
	.artisan-grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 1024px) {
		.artisan-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ===== WORKSPACE CARD ===== */
	.workspace-card {
		background: white;
		border-radius: 1.5rem;
		padding: 2rem;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.02),
			0 4px 8px rgba(0, 0, 0, 0.03),
			0 12px 24px rgba(0, 0, 0, 0.04),
			0 24px 48px rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	/* ===== FORM SECTIONS ===== */
	.artisan-form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-section {
		border: none;
		padding: 0;
		margin: 0;
		background: transparent;
		border-radius: 1rem;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.form-section.active {
		background: var(--back-yellow-gray);
	}

	.section-legend {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		font-size: var(--title-size);
		font-weight: var(--title-weight);
		color: var(--dark-text);
		cursor: pointer;
		user-select: none;
		transition: all 0.2s ease;
		border-radius: 1rem;
	}

	.section-legend:hover {
		background: rgba(153, 79, 8, 0.05);
	}

	.legend-icon {
		font-size: 1.2rem;
	}

	.legend-toggle {
		margin-left: auto;
		font-size: 1.2rem;
		color: var(--gray-text);
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--back-dark);
	}

	.section-content {
		padding: 0 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* ===== GRIDS ===== */
	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	/* ===== ÉQUIPEMENTS ===== */
	.equipement-item {
		background: white;
		border-radius: 1rem;
		padding: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.06);
	}

	/* ===== GLOBAL FACTOR ===== */
	.global-factor {
		background: var(--back-yellow);
		border-radius: 1rem;
		padding: 1.25rem;
		margin-top: 0.5rem;
	}

	.factor-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--text-size);
		font-weight: var(--title-weight);
		color: var(--marron-text);
		margin-bottom: 0.75rem;
	}

	.factor-value {
		background: white;
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: var(--title-size);
		color: var(--primary-color);
	}

	/* ===== POWER SUMMARY ===== */
	.power-summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
		color: white;
		padding: 1rem 1.25rem;
		border-radius: 1rem;
		margin-top: 0.5rem;
	}

	.summary-label {
		font-size: var(--small-text-size);
		opacity: 0.9;
	}

	.summary-value {
		font-size: var(--little-big-title-size);
		font-weight: var(--big-title-weight);
	}

	/* ===== SLIDER GROUP ===== */
	.slider-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.slider-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--text-size);
		font-weight: var(--title-weight);
		color: var(--dark-text);
	}

	.slider-value {
		background: var(--back-yellow);
		color: var(--primary-color);
		padding: 0.2rem 0.6rem;
		border-radius: 0.5rem;
		font-size: var(--small-text-size);
		font-weight: 600;
	}

	/* ===== TOGGLE ===== */
	.toggle-group {
		margin-bottom: 1rem;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		font-size: var(--text-size);
		font-weight: var(--title-weight);
		color: var(--dark-text);
	}

	.toggle-input {
		display: none;
	}

	.toggle-switch {
		width: 48px;
		height: 26px;
		background: var(--back-dark);
		border-radius: 13px;
		position: relative;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.toggle-switch::after {
		content: '';
		position: absolute;
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		top: 2px;
		left: 2px;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.toggle-input:checked + .toggle-switch {
		background: var(--primary-color);
	}

	.toggle-input:checked + .toggle-switch::after {
		left: 24px;
	}

	/* ===== FORM ACTIONS ===== */
	.form-actions {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--back-dark);
	}

	/* ===== INFO PANEL ===== */
	.info-panel {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		position: sticky;
		top: 2rem;
	}

	.info-card {
		background: white;
		border-radius: 1.5rem;
		padding: 1.5rem;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.02),
			0 4px 8px rgba(0, 0, 0, 0.03),
			0 12px 24px rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	.image-card {
		padding: 0;
		overflow: hidden;
	}

	.info-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
	}

	.info-title {
		font-size: var(--little-big-title-size);
		font-weight: var(--big-title-weight);
		color: var(--dark-text);
		margin-bottom: 0.75rem;
	}

	.info-text {
		font-size: var(--text-size);
		color: var(--gray-text);
		line-height: 1.6;
	}

	/* ===== PRO TIP ===== */
	.pro-tip {
		background: var(--back-yellow);
		border: 1px solid var(--tertiary-color);
	}

	.pro-tip-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.pro-tip-icon {
		font-size: 1.2rem;
	}

	.pro-tip-title {
		font-size: var(--title-size);
		font-weight: var(--title-weight);
		color: var(--marron-text);
		margin: 0;
	}

	.pro-tip-text {
		font-size: var(--small-text-size);
		color: var(--color-text);
		line-height: 1.5;
	}

	/* ===== STATS ===== */
	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.stat-card {
		background: white;
		border-radius: 1.25rem;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.02),
			0 4px 8px rgba(0, 0, 0, 0.03);
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	.stat-icon {
		font-size: 1.5rem;
	}

	.stat-label {
		font-size: var(--small-text-size);
		color: var(--gray-text);
		text-align: center;
	}

	.stat-value {
		font-size: var(--title-size);
		font-weight: var(--big-title-weight);
		color: var(--dark-text);
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 768px) {
		.artisan-container {
			padding: 1rem 0.75rem;
		}

		.artisan-title {
			font-size: 2rem;
		}

		.workspace-card {
			padding: 1.25rem;
			border-radius: 1.25rem;
		}

		.form-grid,
		.form-row {
			grid-template-columns: 1fr;
		}

		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}

		.info-panel {
			position: static;
		}

		.header-badge {
			width: 100%;
			text-align: center;
		}
	}
</style>