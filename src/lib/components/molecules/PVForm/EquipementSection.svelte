<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import EquipementCard from '$components/atoms/EquipementCard.svelte';
	import Button from '$components/atoms/Button.svelte';
	import Slider from '$components/atoms/Slider.svelte';
	import type { Equipement } from '$lib/types/pv.types';

	export let facteurFoisonnementGlobal: number;

	// Gestion équipements
	const addEquipement = (): void => {
		equipements = [...equipements, { P: 0, h: 0, ks: 0.5 }];
	};

	const removeEquipement = (index: number): void => {
		if (equipements.length > 1) {
			equipements = equipements.filter((_, i) => i !== index);
		}
	};

	// Calcul réactif de la puissance totale
	$: puissanceTotale =
		equipements.reduce((acc, eq) => acc + eq.P * eq.h * eq.ks, 0) * facteurFoisonnementGlobal;

	let equipements: Equipement[] = [{ P: 0, h: 0, ks: 0.5 }];
</script>

<fieldset class="form-section">
	<legend class="section-legend">
		<span class="legend-icon">⚡</span>
		<span>Inventaire des équipements électriques</span>
	</legend>

	<div class="section-content" transition:slide={{ duration: 300, easing: quintOut }}>
		{#each equipements as equipement, index (index)}
			<EquipementCard
				identifier={String(index)}
				nom={equipement.nom}
				puissance={equipement.P}
				duree={equipement.h}
				simultaneite={equipement.ks}
				showRemove={equipements.length > 1}
				on:update={(e) => {
					const { field, value } = e.detail;
					equipements = equipements.map((eq, i) => (i === index ? { ...eq, [field]: value } : eq));
				}}
				on:remove={() => removeEquipement(index)}
			/>
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
			<span class="summary-value"
				>{(
					(equipements.reduce((acc, eq) => acc + eq.P * eq.h * eq.ks, 0) *
						facteurFoisonnementGlobal) /
					1000
				).toFixed(2)} kWh/j</span
			>
		</div>
	</div>
</fieldset>
