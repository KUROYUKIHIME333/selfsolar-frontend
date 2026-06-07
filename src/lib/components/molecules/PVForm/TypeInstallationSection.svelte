<script lang="ts">
	import Select from '$components/atoms/Select.svelte';
	import { TYPE_INSTALATTION_OPTIONS, TYPE_SYSTEME_OPTIONS } from '$lib/types/pv.types';
	import type { TypeInstallationType, TypeSystemType } from '$lib/types/pv.types';

	let {
		visibility = true,
		// On rend ces deux propriétés "bindable"
		installation = $bindable(),
		systeme = $bindable()
	}: {
		visibility?: boolean;
		installation: TypeInstallationType;
		systeme: TypeSystemType;
	} = $props();
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Type d'installation et système</h2>
	</legend>

	<div class="section-content">
		<Select
			name="typeInstallation"
			label="Qualité et milieu de l'installation"
			bind:value={installation}
			options={TYPE_INSTALATTION_OPTIONS}
			isRequired={true}
		/>

		<Select
			name="typeSysteme"
			label="Architecture du système"
			bind:value={systeme}
			options={TYPE_SYSTEME_OPTIONS}
			isRequired={true}
		/>
	</div>
</fieldset>
