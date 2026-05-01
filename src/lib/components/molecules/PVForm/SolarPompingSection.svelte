<!-- 
pompageSolaire:
    type: boolean
    description: Application pompage d'eau
    
pompageCaracteristiques:
    type: object
    properties:
        batteries:
            type: boolean
        masseVolumique:
            type: number
            default: 1000
            description: "kg/m³ - Eau: 1000"
        accelerationPesanteur:
            type: number
            default: 9.81
            description: "m/s² - Standard: 9.81"
        debit:
            type: number
            description: m³/j - Débit journalier requis
        hauteurMano:
            type: number
            description: m - Hauteur manométrique totale
        rendementPompe:
            type: number
            minimum: 0.4
            maximum: 0.7
            description: η pompe (0.4-0.7)



        required:
        - batteries
        - debit
        - hauteurMano
        - rendementPompe 
      
-->

<script lang="ts">
	import Input from '$components/atoms/Input.svelte';

	let {
		visibility = true
		// pompageSolaire,
	}: {
		visibility?: boolean;
		// pompageSolaire: boolean
	} = $props();
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Pompage solaire</h2>
	</legend>

	<div class="section-content">
		<p class="section-datas-style">
			<span>.</span>
			<span></span>
		</p>
		<input type="radio" name="" id="" />
		<input type="checkbox" name="" id="" />

		<!-- <Input
			name="is-pompage-solaire"
			type="checkbox"
			isLabeled={true}
			label="Cette installation sera utilisée principalement pour un système de pompage"
		/> -->
	</div>
</fieldset>
