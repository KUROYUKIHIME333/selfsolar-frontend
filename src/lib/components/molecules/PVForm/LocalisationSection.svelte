<script lang="ts">
	import MapSelector from '../MapSelector.svelte';
	// import Input from '$components/atoms/Input.svelte';

	let {
		visibility = true,
		longit = $bindable(),
		latid = $bindable(),
		alti = $bindable()
		// site = $bindable()
	} = $props();
</script>

<fieldset class:is-hidden-now={!visibility}>
	<legend>Localisation du projet</legend>

	<div class="grid">
		<MapSelector bind:lat={latid} bind:long={longit} bind:altitude={alti} />
	</div>
</fieldset>
