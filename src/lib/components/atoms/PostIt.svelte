<script lang="ts">
	import type { PostItType } from '$lib/types/general.types';
	export let type: PostItType = 'badge';
	export let postItColor: string = '--back-dark-blue';
	export let textColor: string = '--back-light-blue';
	export let content: string;
	export let icons: string | HTMLElement | HTMLImageElement | HTMLIFrameElement | undefined =
		undefined;

	const useVar: (color: string) => boolean = (color: string) => {
		return color.startsWith('--') ? true : false;
	};
</script>

<div class="post-it" style={`${useVar(postItColor) ? `var(${postItColor})` : `${postItColor}`}`}>
	{#if type !== 'badge'}
		<span class="post-it-icon">{icons}</span>
	{/if}
	<p class="post-it-content" style={`${useVar(textColor) ? `var(${textColor})` : `${textColor}`}`}>
		{content}
	</p>
</div>

<style>
	.post-it {
	}
	.post-it-content {
	}
	.post-it-icon {
	}
</style>
