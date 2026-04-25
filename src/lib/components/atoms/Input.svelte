<script lang="ts">
	export let type: string = 'number';
	export let defaultName: string = '...';
	export let name: string;
	export let label: string = '';
	export let isMapInput: boolean = false;
	export let bindValue: string | number | undefined = undefined;
	export let keydownAction: (e: KeyboardEvent) => false | Promise<void> | void = () => {};
	export let isLabeled: boolean = true;
	export let isHidden: boolean = false;
	export let isRequired: boolean = false;
	export let minValue: string | undefined = undefined;
	export let maxValue: string | undefined = undefined;

	if (type !== 'number') {
		minValue = undefined;
		maxValue = undefined;
	}
</script>

{#if isLabeled}
	<label for={name}>{label}</label>
{/if}

{#if isMapInput}
	<input
		class={isHidden ? 'hidden' : ''}
		id={name}
		{name}
		type="number"
		placeholder={defaultName}
		bind:value={bindValue}
		on:keydown={keydownAction}
		min="-90"
		max="90"
		required
	/>
{:else if isRequired}
	<input
		class={isHidden ? 'hidden' : ''}
		id={name}
		{name}
		{type}
		placeholder={defaultName}
		min={minValue}
		max={maxValue}
		required
	/>
{:else}
	<input
		class={isHidden ? 'hidden' : ''}
		id={name}
		{name}
		{type}
		placeholder={defaultName}
		min={minValue}
		max={maxValue}
	/>
{/if}

<style>
	.hidden {
		display: none;
	}
</style>
