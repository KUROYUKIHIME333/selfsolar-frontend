<script lang="ts">
	import Input from './Input.svelte';
	export let identifier: string = '0';
</script>

<fieldset>
	<Input
		type="string"
		name={'nom-equipement-' + identifier}
		defaultName="Nom de l'équipement"
		isLabeled={false}
	/>
	<Input
		type="number"
		name={'puissance-equipement-' + identifier}
		defaultName="Puissance nominale (W)"
		isLabeled={false}
		isRequired={true}
		minValue="0"
	/>
	<Input
		type="number"
		name={'duree-utilisation-equipement-' + identifier}
		defaultName="Durée d'utilisation journalière (h/j)"
		isLabeled={false}
		isRequired={true}
		minValue="0"
		maxValue="24"
	/>
	<Input
		type="number"
		name={'facteur-simultaneite-equipement-' + identifier}
		defaultName="Facteur de simultanéité (0-1)"
		isLabeled={false}
		isRequired={true}
		minValue="0"
		maxValue="1"
	/>
</fieldset>

<style></style>
