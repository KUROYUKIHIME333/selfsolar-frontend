<script lang="ts">
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	import MapSelector from '$components/molecules/MapSelector.svelte';
	import EquipementCard from '$components/atoms/EquipementCard.svelte';
	import { DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL } from '$lib/utils/textConstantes';
</script>

<form action="/api/pv" method="POST">
	<fieldset>
		<legend>Inventaire des équipements électriques</legend>
		<EquipementCard />

		<Input
			type="number"
			name="equipements-facteur-foisonnement-global"
			label="facteurFoisonnementGlobal"
			defaultName={`${DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL}`}
			isLabeled={true}
			isRequired={true}
			minValue="0.5"
			maxValue="1"
		/>

		<Button variant="primary" label="Click" clickAction={undefined}>ici</Button>
	</fieldset>

	<fieldset>
		<legend>Coordonnées géographiques du site</legend>
		<MapSelector />
	</fieldset>

	<fieldset>
		<legend>Type d'installation et de système</legend>
	</fieldset>

	<fieldset>
		<legend>Caractéristiques STC du module PV et environnement</legend>
	</fieldset>

	<fieldset>
		<legend>Caractéristiques onduleur candidat (vérification)</legend>
	</fieldset>

	<fieldset>
		<legend>Jours d'autonomie souhaités et stockage</legend>
	</fieldset>

	<fieldset>
		<legend>Cablage</legend>
	</fieldset>

	<fieldset>
		<legend>Application pompage d'eau et caractéristiques voulues</legend>
	</fieldset>

	<fieldset>
		<legend>Cablage</legend>
	</fieldset>

	<fieldset>
		<legend>Cablage</legend>
	</fieldset>
</form>

<style></style>
