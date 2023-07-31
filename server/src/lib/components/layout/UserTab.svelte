<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';

	export let user: App.Locals['user'];
</script>

{#if user}
	<div
		class={hstack({
			rounded: '2xl',
			p: 2,
			w: 'full',
			bg: 'transparent',
			overflow: 'hidden',
			_hover: {
				cursor: 'pointer',
				bg: 'gray:400'
			}
		})}
	>
		<div class={css({ overflow: 'hidden', borderRadius: '45px', h: '45px', w: '45px' })}>
			<img
				class={css({ w: 'full', h: 'full', objectFit: 'cover' })}
				src={user.avatar}
				alt="Profile"
			/>
		</div>
		<div class={vstack({ bg: 'none', gap: 0, alignItems: 'start', w: '60%', maxW: '60%' })}>
			<h3 class={css({ fontSize: 'sm', bg: 'none', m: 0, p: 0, fontWeight: 'bold' })}>
				{user.displayName}
			</h3>
			<p class={css({ fontSize: 'sm', bg: 'none', m: 0, p: 0, color: 'gray' })}>@{user.username}</p>
		</div>
	</div>
{/if}
