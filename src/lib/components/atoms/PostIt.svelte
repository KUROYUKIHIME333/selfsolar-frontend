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
		typeClass = 'badge';
	}
	if (type === 'post-it') {
		typeClass = 'post-it';
	}

	if (type === 'tips') {
		typeClass = 'tips';
	}
	if (type === 'idea') {
		typeClass = 'idea';
	}
</script>

<div class="post-it-main-container">
	<div class="post-it-shadow-box {typeClass}"></div>
	<div
		class="post-it-upbox {typeClass}"
		style={`background: ${useVar(postItColor) ? `var(${postItColor})` : `${postItColor}`}`}
	>
		{#if type !== 'badge'}
			<span class="post-it-icon">{icons}</span>
		{/if}
		<p
			class="post-it-content"
			style={`color: ${useVar(textColor) ? `var(${textColor})` : `${textColor}`}`}
		>
			{content}
		</p>
	</div>
</div>

<style>
	.post-it-main-container {
		max-width: var(--post-it-max-width);
		width: fit-content;
		font-size: var(--btn-hover-weight);
		font-weight: var(--btn-hover-weight);
		display: grid;
		perspective: 1000px;
		transform: rotate3d(0, 0, 1, -5deg);
	}

	.post-it-main-container:hover {
		animation: postItHover 2s ease-in-out;
	}

	.post-it-main-container > div {
		grid-area: 1 / 1;
	}

	.post-it-upbox {
		padding: 0 100px;
		z-index: 2;
	}

	.post-it-shadow-box {
		transform: translate(10px, 10px);
		filter: blur(7.5px);
		z-index: 1;
		background-color: black;
	}
	.badge {
		border-radius: 9999px;
	}
	/* .post-it {

	} */

	/* .post-it-content {
	} */
	/* .post-it-icon {
	}  */

	@keyframes postItHover {
		0% {
			transform: rotate3d(0, 0, 1, 0deg);
		}
		10% {
			transform: rotate3d(0, 0, 1, -5deg);
		}
		20% {
			transform: rotate3d(0, 0, 1, 5deg);
		}
		30% {
			transform: rotate3d(0, 0, 1, 0deg);
		}
		40% {
			transform: rotate3d(0, 0, 1, -5deg);
		}
		50% {
			transform: rotate3d(0, 0, 1, 0deg);
		}
		60% {
			transform: rotate3d(0, 0, 1, 5deg);
		}
		70% {
			transform: rotate3d(0, 0, 1, 0deg);
		}
		80% {
			transform: rotate3d(0, 0, 1, -5deg);
		}
		90% {
			transform: rotate3d(0, 0, 1, -5deg);
		}
		100% {
			transform: rotate3d(0, 0, 1, -5deg);
		}
	}
</style>
