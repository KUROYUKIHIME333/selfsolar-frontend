<script lang="ts">
	let {
		visibility = true,
		sectionTitle,
		sectionDescription
	}: {
		visibility?: boolean;
		sectionTitle: string;
		sectionDescription: HTMLElement;
	} = $props();
</script>

<fieldset class={`form-section ${visibility ? '' : 'is-hidden-now'}`}>
	<legend class="section-legend">
		<h2>{sectionTitle}</h2>
	</legend>

	<div class="section-content">
		<p class="section-description">
			{sectionDescription}
		</p>
		<slot />
	</div>
</fieldset>

<style></style>
