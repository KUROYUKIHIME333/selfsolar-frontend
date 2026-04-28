<script lang="ts">
	// import { getContext } from 'svelte';
	import Select from '$components/atoms/Select.svelte';
	// import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	// import type { ParametresPanneau, ListePanneauxData, ModelePanneau } from '$lib/types/pv.types';

	// let pannelsDatas = $props();

	let {
		visibility = true

	}: {
		visibility?: boolean;

	} = $props();


	// let choosedPanel: ParametresPanneau = $state({
	// 	puissanceCreteModule: NaN,
	// 	tensionVoc: NaN,
	// 	courantCourtCircuit: NaN,
	// 	tensionMPP: NaN,
	// 	courantMPP: NaN,
	// 	coeffTempTension: NaN,
	// 	coeffTempPuissance: NaN,
	// 	noct: NaN
	// });

	let listedPannel: boolean = $state(false);
	let customPannel: boolean = $state(false);

	const listedPannelChoosed = () => {
		listedPannel = true;
		customPannel = false;
		console.log(listedPannel, customPannel);
	};

	const customPannelChoosed = () => {
		listedPannel = false;
		customPannel = true;
		console.log(listedPannel, customPannel);
	};

	const goBackPannelChoosed = () => {
		listedPannel = false;
		customPannel = false;
		console.log(listedPannel, customPannel);
	};

	let changeOfChoice = $derived(
		listedPannel
			? 'Je pense utiliser mes propres valeurs tout compte fait'
			: customPannel
				? 'Je pense utiliser le catalogue finalement'
				: ''
	);
</script>

<fieldset class={`form-section ${visibility ? '' : 'is-hidden-now'}`}>
	<legend class="section-legend">
		<h2>Caractéristique des panneaux</h2>
	</legend>

	<div class="section-content">
		<p class="section-description">
			{#if !listedPannel && !customPannel}
				<span
					>Avoir les caractéristique du modèle de panneaux permettra de faire une installation
					propre et efficace, adapté à vos besoins.</span
				>
				<span
					>Le fonctionnement de ces derniers, et donc de votre installation, sera aussi affecté par
					la météo, en particuliers la température ambiante.</span
				>
			{/if}
			{#if listedPannel || customPannel}
				<Button
					type="button"
					variant="tertiary"
					label={changeOfChoice}
					clickAction={goBackPannelChoosed}
				/>
			{/if}
		</p>

		{#if !listedPannel && !customPannel}
			<div class="section-description">
				<Button
					type="button"
					variant="secondary"
					label="Alors, choisir un modèle dans notre liste de fabricants connus ?"
					clickAction={listedPannelChoosed}
				/>
				<Button
					type="button"
					variant="secondary"
					label="Ou bien utiliser vos propres panneaux (vos valeurs)?"
					clickAction={customPannelChoosed}
				/>
			</div>
		{/if}

		{#if listedPannel || customPannel}
			<div class="section-datas-style">
				<Select
					name="typeInstallation"
					label="Modele de panneau qui sera utilisé pour l'installation"
					value=""
					options={}
					isRequired={true}
				/>
			</div>
		{/if}
	</div>
</fieldset>

<style></style>
