<script lang="ts">
	import MapSelector from '../MapSelector.svelte';

	let {
		visibility = true,
		longit = $bindable(),
		latid = $bindable(),
		alti = $bindable()
		// site = $bindable()
	} = $props();
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Localisation du projet</h2>
	</legend>

	<div class="section-content">
		<MapSelector bind:lat={latid} bind:long={longit} bind:altitude={alti} />
	</div>
</fieldset>
