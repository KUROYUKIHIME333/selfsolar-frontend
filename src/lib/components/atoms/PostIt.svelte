<script lang="ts">
	import type { PostItType } from '$lib/types/general.types';
	export let type: PostItType = 'badge';
	export let postItColor: string = '--back-dark-blue';
	export let textColor: string = '--back-light-blue';
	export let content: string;
	export let icons: string | HTMLElement | HTMLImageElement | HTMLIFrameElement | undefined =
		undefined;

	let typeClass: string;

	const useVar: (color: string) => boolean = (color: string) => {
		return color.startsWith('--') ? true : false;
	};

	if (type === 'badge') {
		typeClass = '.badge';
	}
	if (type === 'post-it') {
		typeClass = '.post-it';
	}

	if (type === 'tips') {
		typeClass = '.tips';
	}
	if (type === 'idea') {
		typeClass = '.idea';
	}
</script>

<div
	class="post-it {typeClass}"
	style={`${useVar(postItColor) ? `var(${postItColor})` : `${postItColor}`}`}
>
	{#if type !== 'badge'}
		<span class="post-it-icon">{icons}</span>
	{/if}
	<p class="post-it-content" style={`${useVar(textColor) ? `var(${textColor})` : `${textColor}`}`}>
		{content}
	</p>
</div>

<style>
	.badge {
		max-width: var(--post-it-max-width);
		min-width: var(--post-it-min-width);
		width: fit-content;
		border-radius: 50%;
	}
	/* .post-it {
	}
	.post-it-content {
	}
	.post-it-icon {
	} */
</style>
