<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let variant:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'custom'
		| 'icon-primary'
		| 'icon-secondary'
		| 'icon-custom'
		| 'danger'
		| 'good'
		| 'clear' = 'primary';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let label: string;
	export let L: string = '150px';
	export let l: string = '50px';
	export let borderRadius: string = '35px';
	export let clickAction;

	if (loading) {
		disabled = true;
	}

	let buttonClass: string = disabled ? 'btn-disable' : 'btn';
</script>

<button
	{type}
	class="{buttonClass} {variant === 'primary' ? 'primary moving-gradient' : variant}"
	style="width: {L}; height: {l}; border-radius: {borderRadius}"
	{disabled}
	on:click={clickAction}
>
	{#if loading}
		<span>
			<span class="btn-spinner spinner-1"></span>
			<span class="btn-spinner spinner-2"></span>
			<span class="btn-spinner spinner-3"></span>
		</span>
	{:else}
		{label}
		<slot />
	{/if}
</button>

<style>
	.btn {
		border: none;
		cursor: pointer;
	}

	.btn-disable {
		border: none;
		font-size: var(--btn-size);
		font-weight: var(--btn-weight);
	}

	.btn:hover {
		scale: 1.1;
		font-size: var(--btn-hover-size);
		font-weight: var(--btn-hover-weight);
	}

	.primary {
		color: white;
	}

	.danger {
		background: var(--danger);
		color: white;
	}

	.danger {
		background: var(--danger);
		color: white;
	}

	.good {
		background: var(--good);
		color: white;
	}

	.clear {
		border: 2px solid var(--gray-text);
		color: var(--gray-text);
		background: var(--back-dark);
	}

	.icon-primary {
		color: var(--primary-color);
		width: fit-content;
		height: fit-content;
	}

	.icon-secondary {
		color: var(--secondary-color);
		width: fit-content;
		height: fit-content;
	}

	.btn-spinner {
		display: inline-block;
		width: 10px;
		height: 10px;
		background: white;
		border-radius: 50%;
	}

	.spinner-1 {
		animation: pulse-1 1s infinite;
	}
	.spinner-2 {
		animation: pulse-2 1s infinite;
	}
	.spinner-3 {
		animation: pulse-3 1s infinite;
	}

	@keyframes pulse-2 {
		0%,
		100% {
			transform: scale(0.5);
			opacity: 1;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes pulse-3 {
		0%,
		50% {
			transform: scale(0.5);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes pulse-1 {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50%,
		100% {
			transform: scale(0.5);
			opacity: 1;
		}
	}
</style>
