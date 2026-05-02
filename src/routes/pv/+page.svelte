<script lang="ts">
	// import { setContext } from 'svelte';
	import '../../lib/components/organisms/formPV.css';
	import PVForm from '$components/organisms/PVForm.svelte';
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

<section class="full-screen-width artisan-container">
	<div class="artisan-header">
		<div class="header-content">
			<h1 class="artisan-title">
				<span class="title-main">Dimensionnement </span>
				<span class="title-main">Photovoltaique</span>
			</h1>
			<!-- <p class="artisan-subtitle">
				<span>Concevoir (presque comme un pro) son autonomie Energétique.</span>
				<span
					>Calculer l'installation photovoltaique adaptée à ses besoins et son environnement avec la
					logique des artisans</span
				>
			</p> -->
		</div>
	</div>

	<section>
		<div>
			<div></div>
			<PVForm />
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
