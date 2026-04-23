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
		| 'icon-custom' = 'primary';
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
		border: 2px solid var(--primary-color);
		cursor: pointer;
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
