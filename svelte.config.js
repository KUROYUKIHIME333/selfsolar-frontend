import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	preprocess: vitePreprocess(), // TypeScript, PostCSS, etc.
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			// $lib est déjà défini — tu peux ajouter les tiens
			$components: './src/lib/components',
			$stores: './src/lib/stores'
		}
	}
};

export default config;
