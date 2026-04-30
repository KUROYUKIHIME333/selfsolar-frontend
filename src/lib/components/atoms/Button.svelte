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
		| 'clear'
		| 'transparent-back' = 'primary';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let label: string;
	export let L: string = 'fit-content';
	export let l: string = 'fit-content';
	export let borderRadius: string = '9999px';
	export let clickAction: (() => void) | undefined = undefined;
	export let customClass: string = '';

	if (loading) {
		disabled = true;
	}

	let buttonClass: string = disabled ? 'btn-disable' : 'btn';
</script>

<button
	{type}
	class="{buttonClass} {variant} {customClass}"
	style="width: {L}; height: {l}; border-radius: {borderRadius}; padding: 10px"
	{disabled}
	on:click={clickAction}
>
	{#if loading}
		<span class="spinner-container">
			<span class="spinner-dot"></span>
			<span class="spinner-dot"></span>
			<span class="spinner-dot"></span>
		</span>
	{:else}
		{#if label}
			<span class="btn-label">{label}</span>
		{/if}
		<slot />
	{/if}
</button>

<style>
	.btn {
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-weight: var(--btn-weight);
		font-size: var(--btn-size);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(153, 79, 8, 0.25);
	}

	.btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn-disable {
		border: none;
		cursor: not-allowed;
		opacity: 0.6;
		font-family: inherit;
	}

	/* Primary - Gradient Artisan */
	.primary {
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
		color: white;
		font-weight: 600;
		letter-spacing: 0.3px;
	}

	.primary::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.primary:hover::before {
		left: 100%;
	}

	/* Secondary */
	.secondary {
		background: white;
		color: var(--primary-color);
		border: 1.5px solid var(--back-dark);
	}

	.secondary:hover:not(:disabled) {
		border-color: var(--secondary-color);
		background: var(--back-yellow-gray);
	}

	.transparent-back {
		background: transparent;
		border: none;
	}

	.transparent-back:hover:not(:disabled)  {
		box-shadow: none;
	}

	/* Danger */
	.danger {
		background: var(--danger);
		color: white;
	}

	/* Good */
	.good {
		background: var(--good);
		color: white;
	}

	/* Clear */
	.clear {
		background: transparent;
		color: var(--gray-text);
		border: 1px solid var(--back-dark);
	}

	/* Spinner */
	.spinner-container {
		display: flex;
		gap: 4px;
		align-items: center;
	}

	.spinner-dot {
		width: 6px;
		height: 6px;
		background: white;
		border-radius: 50%;
		animation: bounce 1.4s infinite ease-in-out both;
	}

	.spinner-dot:nth-child(1) {
		animation-delay: -0.32s;
	}
	.spinner-dot:nth-child(2) {
		animation-delay: -0.16s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}

	.btn-label {
		position: relative;
		z-index: 1;
	}

	@media (max-width: 768px) {
		.btn {
			min-width: fit-content;
		}
		.btn-disable {
			min-width: fit-content;
		}
	}
</style>
