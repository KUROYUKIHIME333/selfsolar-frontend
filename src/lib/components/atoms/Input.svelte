<script lang="ts">
	export let type: string = 'number';
	export let defaultName: string = '...';
	export let name: string;
	export let label: string;
	export let isMapInput: boolean = false;
	export let bindValue: string | number | undefined;
	export let keydownAction: (e: KeyboardEvent) => false | Promise<void> | void = () => {};
	export let isLabeled: boolean = true;
	export let isHidden: boolean = false;
</script>

{#if isLabeled}
	<label for={name}>{label}</label>
{/if}

{#if isMapInput}
	<input
		class={isHidden ? 'hidden' : ''}
		id={name}
		{name}
		{type}
		placeholder={defaultName}
		bind:value={bindValue}
		on:keydown={keydownAction}
	/>
{:else}
	<input class={isHidden ? 'hidden' : ''} id={name} {name} {type} placeholder={defaultName} />
{/if}

<style>
	.hidden {
		display: none;
	}
</style>
