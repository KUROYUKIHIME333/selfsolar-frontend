<script>
	import FormPV from '$components/organisms/FormPV.svelte';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="dimensiionnement photovoltaique"
		content="Calculs et evaluation de l'instalation photovoltaique"
	/>
	<title>Photovoltaique</title>
</svelte:head>

<section class="full-screen-width">
	<section>
		<h1>Dimensionnement Photovoltaique</h1>
		<p>
			<span>Concevoir sa propre installation d'énergie.</span>
			<span
				>Calculer les bonnes caractéristiques d'une installation (Panneaux, Batteries, etc.) adaptés
				à ses besoins avec la logic des professionnels.
			</span>
		</p>
		<p>
			<span>
				Dimensionnement complet installation photovoltaïque selon normes <span
					>NFC 15-100, IEC 61215</span
				>
			</span>
		</p>
	</section>

	<section>
		<div>
			<div></div>
			<FormPV />
		</div>
		<div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</section>
</section>

<style>
</style>
