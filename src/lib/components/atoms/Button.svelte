<script lang="ts">
	import '../../../app.css';
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
</script>

<button {type} class="btn {variant}">
	<slot />
</button>

<style>
	.btn {
		padding: 10px 20px;
		width: 150px;
		height: 50px;
		border-radius: 35px;
		border: none;
		cursor: pointer;
	}

	.btn:hover {
		scale: 1.1;
		font-size: large;
		font-weight: bold;
	}

	.primary {
		background: linear-gradient(
			90deg,
			var(--primary-color) 0%,
			var(--secondary-color) 51%,
			var(--tertiary-color) 100%
		);
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
</style>
