<script lang="ts">
	import { enhance } from '$app/forms';

	import Button from '$components/atoms/Button.svelte';
	import EquipementSection from '$components/molecules/PVForm/EquipementSection.svelte';
	import TypeInstallationSection from '$components/molecules/PVForm/TypeInstallationSection.svelte';
	import CaracteristicsPannelsSection from '$components/molecules/PVForm/CaracteristicsPannelsSection.svelte';
	import PostIt from '$components/atoms/PostIt.svelte';
	// Constantes
	import { DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL } from '$lib/utils/textConstantes';

	// Types API (stricts)
	import type {
		// Localisation,
		Equipement,
		ParametresPanneau,
		// TemperaturesAttendue,
		// ContraintesOnduleur,
		// Cablage,
		// PompageCaracteristiques
		TypeInstallationType,
		TypeSystemType
	} from '$lib/types/pv.types';

	let step: number = $state(1);
	let theFirst: boolean = $derived(step <= 1);

	let formData: {
		equipements: Equipement[];
		facteurFoisonnementGlobal: number;
		typeInstallation: TypeInstallationType;
		typeSysteme: TypeSystemType;
		parametresPanneau: ParametresPanneau;
	} = $state({
		equipements: [{ nom: '', P: NaN, h: NaN, ks: 0.5 }],
		facteurFoisonnementGlobal: DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL,
		typeInstallation: 'STANDARD',
		typeSysteme: 'off-grid',
		parametresPanneau: {
			puissanceCreteModule: NaN,
			tensionVoc: NaN,
			courantCourtCircuit: NaN,
			tensionMPP: NaN,
			courantMPP: NaN,
			coeffTempTension: NaN,
			coeffTempPuissance: NaN,
			noct: NaN
		}
	});

	const nextStep = () => {
		step += 1;
	};
	const prevStep = () => {
		if (!theFirst) {
			step -= 1;
		}
	};
</script>

<!-- Little cutty postit -->
<PostIt content="Workspace" type="badge" />

<!-- The work part -->
<div class="artisan-grid">
	<!-- Formulaire -->
	<div class="workspace-card">
		<form method="POST" use:enhance>
			<!-- 1. Equipement inventory -->
			<EquipementSection
				allEquipements={formData.equipements}
				facteurFoisonnementGlobal={formData.facteurFoisonnementGlobal}
				visibility={step === 1 ? true : false}
			/>

			<!-- 2. Location -->

			<!-- 3. Installation and system type -->
			<TypeInstallationSection
				installation={formData.typeInstallation}
				systeme={formData.typeSysteme}
				visibility={step === 3 ? true : false}
			/>

			<!-- 4. cells datas -->
			<CaracteristicsPannelsSection
				bind:params={formData.parametresPanneau}
				visibility={step === 4}
			/>

			<!-- 5.  -->

			<div class="form-actions">
				{#if !theFirst}
					<Button variant="secondary" type="button" label="Retour" L="20%" clickAction={prevStep} />
				{/if}

				<Button
					variant="secondary"
					type="button"
					label="Continuer"
					L="20%"
					clickAction={nextStep}
				/>
			</div>

			<Button label="soumettre" variant="primary" type="submit" L="100%" />
		</form>
	</div>

	<!-- Infos -->
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
