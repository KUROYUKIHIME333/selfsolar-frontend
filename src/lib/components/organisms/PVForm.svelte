<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/atoms/Button.svelte';
	import EquipementSection from '$components/molecules/PVForm/EquipementSection.svelte';
	import TypeInstallationSection from '$components/molecules/PVForm/TypeInstallationSection.svelte';
	import CaracteristicsPannelsSection from '$components/molecules/PVForm/CaracteristicsPannelsSection.svelte';
	import LocalisationSection from '$components/molecules/PVForm/LocalisationSection.svelte';
	import PostIt from '$components/atoms/PostIt.svelte';

	// Constantes
	import { DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL } from '$lib/utils/textConstantes';

	// Types API
	import type {
		Equipement,
		ParametresPanneau,
		TypeInstallationType,
		TypeSystemType,
		Localisation
	} from '$lib/types/pv.types';

	let step = $state(1);

	let formData = $state({
		equipements: [{ nom: '', P: NaN, h: NaN, ks: 0.5 }] as Equipement[],
		localisation: {
			lat: 0,
			long: 0,
			altitude: 0
		} as Localisation,
		facteurFoisonnementGlobal: DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL,
		typeInstallation: 'STANDARD' as TypeInstallationType,
		typeSysteme: 'off-grid' as TypeSystemType,
		parametresPanneau: {
			puissanceCreteModule: NaN,
			tensionVoc: NaN,
			courantCourtCircuit: NaN,
			tensionMPP: NaN,
			courantMPP: NaN,
			coeffTempTension: NaN,
			coeffTempPuissance: NaN,
			noct: NaN
		} as ParametresPanneau
	});

	// Dérivations
	const isFirstStep = $derived(step <= 1);
	const isLastStep = $derived(step === 4); // Ajustez selon le nombre total de steps

	// Actions
	const nextStep = () => step++;
	const prevStep = () => {
		if (!isFirstStep) step--;
	};
</script>

<PostIt content="Workspace" type="badge" />

<div class="artisan-grid">
	<div class="workspace-card">
		<form method="POST" use:enhance novalidate>
			<EquipementSection
				bind:allEquipements={formData.equipements}
				bind:facteurFoisonnementGlobal={formData.facteurFoisonnementGlobal}
				visibility={step === 1}
			/>

			<LocalisationSection
				visibility={step === 2}
				bind:latid={formData.localisation.lat}
				bind:longit={formData.localisation.long}
				bind:alti={formData.localisation.altitude}
			/>

			<TypeInstallationSection
				bind:installation={formData.typeInstallation}
				bind:systeme={formData.typeSysteme}
				visibility={step === 3}
			/>

			<CaracteristicsPannelsSection
				bind:params={formData.parametresPanneau}
				visibility={step === 4}
			/>

			<div class="form-actions">
				{#if !isFirstStep}
					<Button variant="secondary" type="button" label="Retour" L="20%" clickAction={prevStep} />
				{/if}

				{#if !isLastStep}
					<Button
						variant="secondary"
						type="button"
						label="Continuer"
						L="20%"
						clickAction={nextStep}
					/>
				{:else}
					<Button
						label="Soumettre le projet"
						variant="primary"
						type="submit"
						L="100%"
						clickAction={() => {
							console.log(formData);
						}}
					/>
				{/if}
			</div>
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
