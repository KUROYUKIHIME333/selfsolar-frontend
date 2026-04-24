<script>
	import { IMPLEMENTED } from '../../../utils/fonctionnalities';
</script>

<nav>
	{#each IMPLEMENTED as item (item.id)}
		<a href={item.link}>{item.label}</a>
	{/each}
</nav>

<style></style>
