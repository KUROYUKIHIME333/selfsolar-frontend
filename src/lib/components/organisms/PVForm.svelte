<script lang="ts">
	import { enhance } from '$app/forms';
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
</script>

<!-- Little cutty postit -->
<PostIt content="Workspace" type="badge" />

<!-- The work part -->
<div class="artisan-grid">
	<!-- Formulaire -->
	<div class="workspace-card">
		<form method="POST" use:enhance>
			<!-- Equipement inventory -->
            

			<!-- Location -->
		</form>
	</div>

	<!-- Infos -->
	<aside class="info-panel"></aside>
</div>
