<script lang="ts">
	// Logique du composant — TypeScript ici
	import { onMount } from 'svelte';
	// Props (export = prop publique)
	export let title: string;
	export let count: number = 0; // valeur par défaut
	// Variable réactive locale
	let message = 'Hello';
	// Fonction
	function increment() {
		count++;
		message = `Cliqué ${count} fois`;
	}
	// Déclaration réactive ($: s'exécute quand les deps changent)
	$: doubled = count * 2;
	$: if (count > 10) {
		console.log('Plus de 10 clics !');
	}
	onMount(() => {
		console.log('Composant monté');
		return () => console.log('Composant détruit');
	});
</script>

<!-- Template HTML — accès direct aux variables du script -->
<div class="card">
	<h1>{title}</h1>
	<p>{message}</p>
	<p>Double : {doubled}</p>
	<!-- Directive event : on:click -->
	<button on:click={increment}>
		Cliquer ({count})
	</button>
	<!-- Conditionnel -->
	{#if count > 5}
		<p class="warning">Beaucoup de clics !</p>
	{:else if count > 0}
		<p>Quelques clics.</p>
	{:else}
		<p>Aucun clic.</p>
	{/if}
	<!-- Boucle -->
	{#each Array.from({ length: count }, (_, i) => i) as n (n)}
		<span>{n}</span>
	{/each}
</div>

<style>
	/* CSS scopé automatiquement à ce composant */
	.card {
		padding: 1rem;
		border-radius: 8px;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	.warning {
		color: #ff3e00;
		font-weight: bold;
	}
	/* :global() pour cibler hors du composant */
	:global(body) {
		margin: 0;
	}
</style>
