<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$components/atoms/Button.svelte';
	import EquipementSection from '$components/molecules/PVForm/EquipementSection.svelte';
	import TypeInstallationSection from '$components/molecules/PVForm/TypeInstallationSection.svelte';
	import CaracteristicsPannelsSection from '$components/molecules/PVForm/CaracteristicsPannelsSection.svelte';
	import LocalisationSection from '$components/molecules/PVForm/LocalisationSection.svelte';
	import CaracteristicsBatteriesSection from '$components/molecules/PVForm/CaracteristicsBatteriesSection.svelte';
	import ContraintesOnduleurSection from '$components/molecules/PVForm/ContraintesOnduleurSection.svelte';
	import CablesSection from '$components/molecules/PVForm/CablesSection.svelte';
	import SolarPompingSection from '$components/molecules/PVForm/SolarPompingSection.svelte';
	import PostIt from '$components/atoms/PostIt.svelte';
	import { DEFAULT_COORDINATES } from '$lib/utils/textConstantes';

	// Constantes
	import { DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL } from '$lib/utils/textConstantes';

	// Types API
	import type {
		Equipement,
		ParametresPanneau,
		TypeInstallationType,
		TypeSystemType,
		Localisation,
		TemperaturesAttendue,
		TechnologieBatterie,
		ParametresOnduleur,
		Cablage,
		PompageCaracteristiques,
		ParametresBatterie
	} from '$lib/types/pv.types';

	let step = $state(0);

	let lastStep = $state(7);
	let firstStep = $state(0);

	// Required fiels to send are :
	// 	- localisation
	// 	- equipements
	// 	- typeInstallation
	// 	- typeSysteme
	// 	- parametresPanneau
	// 	- temperaturesAttendue
	// All the other can be empty or not sent

	let formData = $state({
		equipements: [{ nom: '', P: NaN, h: NaN, ks: 0.5 }] as Equipement[], //required
		localisation: {
			lat: DEFAULT_COORDINATES.lat,
			long: DEFAULT_COORDINATES.long,
			altitude: DEFAULT_COORDINATES.altitude
		} as Localisation, //required
		typeInstallation: 'STANDARD' as TypeInstallationType, //required
		typeSysteme: 'off-grid' as TypeSystemType, //required
		temperaturesAttendue: {
			temperatureMin: 20,
			temperatureMax: 40
		} as TemperaturesAttendue, //required
		parametresPanneau: {
			puissanceCreteModule: NaN,
			tensionVoc: NaN,
			courantCourtCircuit: NaN,
			tensionMPP: NaN,
			courantMPP: NaN,
			coeffTempTension: NaN,
			coeffTempPuissance: NaN,
			noct: NaN
		} as ParametresPanneau, //required
		facteurFoisonnementGlobal: DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL,
		modeleBatterie: undefined as undefined | ParametresBatterie,
		irradianceMax: undefined as number | undefined,
		autonomieBatterie: undefined as number | undefined,
		technologieBatterie: undefined as TechnologieBatterie | undefined,
		tensionSystemeBatterie: undefined as number | undefined,
		contraintesOnduleur: undefined as undefined | ParametresOnduleur,
		cablage: {
			materiau: undefined,
			longueurString: undefined,
			longueurPrincipalDC: undefined,
			longueurAC: undefined,
			methodePoseDC: undefined,
			methodePoseAC: undefined,
			conditionEnvironnement: undefined
		} as Cablage,
		pompageSolaire: undefined as boolean | undefined,
		pompageCaracteristiques: undefined as undefined | PompageCaracteristiques
	});

	// Dérivations
	const isFirstStep = $derived(step === firstStep);
	const isLastStep = $derived(step === lastStep);

	// Requests states
	let isSubmitting = $state(false);
	let calculationResult = $state(null);
	let errorMessage = $state('');

	// Actions
	const nextStep = () => {
		if (!isLastStep) step++;
	};
	const prevStep = () => {
		if (!isFirstStep) step--;
	};
	const handleSubmit = async () => {
		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/pvcalculs', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			console.log('RESULTAT DANS FORM APRES REQUETE :', response);

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || 'Erreur lors du calcul');
			}
			calculationResult = data; // Données formatées selon ton schéma[cite: 3]
			console.log('Résultat reçu :', calculationResult);
		} catch (err: unknown) {
			errorMessage = (err as Error).message;
		} finally {
			isSubmitting = false;
		}
	};
</script>

<PostIt content="Workspace" type="badge" />

<div class="artisan-grid">
	<div class="workspace-card">
		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
			novalidate
		>
			{#if errorMessage || errorMessage !== ''}
				<p class="error-banner" in:fade>
					<span class="error-icon"></span>
					<span class="error-text">
						{errorMessage}
					</span>
				</p>
			{/if}

			<SolarPompingSection
				pompageSolaire={formData.pompageSolaire}
				params={formData.pompageCaracteristiques}
				actionAfter={nextStep}
				visibility={step === 0}
			/>

			<LocalisationSection
				visibility={step === 1}
				bind:latid={formData.localisation.lat}
				bind:longit={formData.localisation.long}
				bind:alti={formData.localisation.altitude}
			/>

			<EquipementSection
				bind:allEquipements={formData.equipements}
				bind:facteurFoisonnementGlobal={formData.facteurFoisonnementGlobal}
				visibility={step === 2}
			/>

			<!-- IDEA: I'll get :
				temperaturesAttendue{
					temperatureMin: number, in °C, with default at 10°C (for winter, to get Voc max)
					temperatureMax: number, in °C, with default at 40°C (for summer, to get Vmpp min)
				}
				and
				irradianceMax: number, in W/m², with default 1000W/m² (max local irradiance, I think 1000 - 1200 W/m² ?) 
				with the location datas, by calling apis (If I get time, i'll do this API myself)
			-->

			<TypeInstallationSection
				bind:installation={formData.typeInstallation}
				bind:systeme={formData.typeSysteme}
				visibility={step === 3}
			/>

			<CaracteristicsPannelsSection
				bind:params={formData.parametresPanneau}
				visibility={step === 4}
			/>

			<CaracteristicsBatteriesSection
				bind:autonomieBatterie={formData.autonomieBatterie}
				bind:technologieBatterie={formData.technologieBatterie}
				bind:tensionSystemeBatterie={formData.tensionSystemeBatterie}
				bind:params={formData.modeleBatterie}
				noSettingToDo={nextStep}
				visibility={step === 5}
			/>

			<ContraintesOnduleurSection
				bind:params={formData.contraintesOnduleur}
				actionAfter={nextStep}
				visibility={step === 6}
			/>

			<CablesSection bind:params={formData.cablage} visibility={step === 7} />

			<div class="form-actions">
				{#if !isFirstStep}
					<Button variant="secondary" type="button" label="Retour" L="20%" clickAction={prevStep} />
				{/if}

				{#if !isLastStep}
					<Button
						variant="secondary"
						type="button"
						label="La suite"
						L="20%"
						clickAction={nextStep}
					/>
				{:else}
					<Button
						label="Calculer"
						variant="primary"
						type="submit"
						L="20%"
						clickAction={() => {
							console.log(formData);
						}}
						disabled={isSubmitting}
					/>
				{/if}
			</div>
			<p class="section-pagination">
				{step + 1} / {lastStep + 1}
			</p>
		</form>
	</div>

	<aside class="info-panel">
		<div class="info-card image-card">
			<img
				src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
				alt="Installation photovoltaïque"
				class="info-image"
			/>
		</div>

		<div class="info-card">
			<h3 class="info-title">L'importance de la précision</h3>
			<p class="info-text">
				Un système sous-dimensionné ne couvrira pas vos besoins, tandis qu'un surdimensionnement
				augmente inutilement vos coûts initiaux.
			</p>
		</div>

		<div class="info-card pro-tip">
			<div class="pro-tip-header">
				<span class="pro-tip-icon">💡</span>
				<h4 class="pro-tip-title">Conseil : L'ombrage</h4>
			</div>
			<p class="pro-tip-text">
				Même une petite ombre portée peut réduire l'efficacité de votre champ solaire de 50%.
				Privilégiez les zones dégagées !
			</p>
		</div>

		<div class="stats-grid">
			<div class="stat-card">
				<span class="stat-icon">☀️</span>
				<span class="stat-label">Ensoleillement</span>
				<span class="stat-value">--</span>
			</div>
			<div class="stat-card">
				<span class="stat-icon">🌱</span>
				<span class="stat-label">CO2 Évité</span>
				<span class="stat-value">--</span>
			</div>
		</div>
	</aside>
</div>
