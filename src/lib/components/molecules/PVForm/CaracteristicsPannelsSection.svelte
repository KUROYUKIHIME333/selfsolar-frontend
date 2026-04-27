<script lang="ts">
	import { onMount } from 'svelte';
	import Select from '$components/atoms/Select.svelte';
	import Input from '$components/atoms/Input.svelte';
	import type { ParametresPanneau } from '$lib/types/pv.types';

	let pannelsDatas = $props();
	let {
		visibility = true,
		puissanceCreteModule,
		tensionVoc,
		courantCourtCircuit,
		tensionMPP,
		courantMPP,
		coeffTempTension,
		coeffTempPuissance,
		noct
	}: {
		visibility?: boolean;
		puissanceCreteModule: number;
		tensionVoc: number;
		courantCourtCircuit: number;
		tensionMPP: number;
		courantMPP?: number;
		coeffTempTension: number;
		coeffTempPuissance: number;
		noct?: number;
	} = $props();

	let {
		temperatureMin,
		temperatureMax,
		irradianceMax
	}: {
		temperatureMin: number;
		temperatureMax: number;
		irradianceMax: number;
	} = $props();

	let choosedPanel: ParametresPanneau = $state({
		puissanceCreteModule: NaN,
		tensionVoc: NaN,
		courantCourtCircuit: NaN,
		tensionMPP: NaN,
		courantMPP: NaN,
		coeffTempTension: NaN,
		coeffTempPuissance: NaN,
		noct: NaN
	});
</script>

<fieldset class={`form-section ${visibility ? '' : 'is-hidden-now'}`}>
	<legend class="section-legend">
		<h2>Caractéristique des panneaux</h2>
	</legend>

	<div class="section-content">
		<p class="section-description">
			<span
				>Avoir les caractéristique du modèle de panneaux permettra de faire une installation propre
				et efficace, adapté à vos besoins.</span
			>
			<span
				>Le fonctionnement de ces derniers, et donc de votre installation, sera aussi affecté par la
				météo, en particuliers la température ambiante.</span
			>
		</p>

		<div class="section-datas-style">
			<p>
				Choisir un panneau dans la liste proposés. Ou bien, renseigner les infos soi-même avec
				l'option <span>custom</span>
			</p>
			<Select
				name="typeInstallation"
				label="A quoi s'attendre ? Qu'est ce qui décrit le mieux l'installation et son milieu ?"
				value={choosedPanel}
				options={[]}
				isRequired={true}
			/>
		</div>
	</div>
</fieldset>

<style></style>
