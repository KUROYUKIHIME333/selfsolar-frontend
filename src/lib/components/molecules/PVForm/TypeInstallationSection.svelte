<script lang="ts">
	import Select from '$components/atoms/Select.svelte';
	import { TYPE_INSTALATTION_OPTIONS, TYPE_SYSTEME_OPTIONS } from '$lib/types/pv.types';
	import type { TypeInstallationType, TypeSystemType } from '$lib/types/pv.types';

	let {
		visibility = true,
		installation,
		systeme
	}: {
		visibility?: boolean;
		installation: TypeInstallationType;
		systeme: TypeSystemType;
	} = $props();
</script>

<fieldset class={`form-section ${visibility ? '' : 'is-hidden-now'}`}>
	<legend class="section-legend">
		<span>Type d'installation et de système</span>
	</legend>

	<div class="section-content">
		<div>
			<span
				>Il faut maintenant avoir une idée sur la Qualité attendue et les Conditions de
				l'installation (son milieu)</span
			>
			<Select
				name="typeInstallation"
				label="A quoi s'attendre ? Qu'est ce qui décrit le mieux l'installation et son milieu ?"
				value={installation}
				options={TYPE_INSTALATTION_OPTIONS}
				isRequired={true}
			/>
		</div>

		<div>
			<span>Il faut aussi savoir de quelle architecture on parle : </span>
			<Select
				name="typeSysteme"
				label="A quoi s'attendre ? Qu'est ce qui décrit le mieux l'installation et son milieu ?"
				value={systeme}
				options={TYPE_SYSTEME_OPTIONS}
				isRequired={true}
			/>
		</div>
	</div>
</fieldset>

<style></style>
