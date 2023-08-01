<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	import { button } from '../styles/button';

	export let handleReply: (reply: string) => void;

	let reply: string = '';
</script>

<div class={vstack({ gap: 1, py: 3 })}>
	<input
		type="text"
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
		on:input={(e) => (reply = e.currentTarget.value)}
	/>
	<div class={hstack({ w: 'full', justifyContent: 'flex-end' })}>
		<button class={button({ width: 'auto' })} disabled={reply.length === 0}>Reply</button>
	</div>
</div>
