<script lang="ts">
	import { TWEET_MAX_LENGTH } from '$lib/constants/tweets';
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	import { button } from '../styles/button';

	export let handleReply: (reply: string) => void;

	const wrapReply = () => {
		handleReply(reply);
		reply = '';
	};

	let reply: string = '';
</script>

<div class={vstack({ gap: 1, py: 3 })}>
	<textarea
		placeholder="Post your reply!"
		class={css({
			w: 'full',
			outline: 'none',
			color: 'white',
			fontSize: 'xl',
			h: { base: '25vh', md: '30%' },
			p: 1,
			resize: 'none'
		})}
		maxlength={TWEET_MAX_LENGTH}
		bind:value={reply}
	/>
	<div class={hstack({ w: 'full', justifyContent: 'space-between' })}>
		<p class={css({ color: 'gray' })}>{reply.length}/{TWEET_MAX_LENGTH}</p>
		<button class={button({ width: 'auto' })} disabled={reply.length === 0} on:click={wrapReply}
			>Reply</button
		>
	</div>
</div>
