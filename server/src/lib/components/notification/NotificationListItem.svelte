<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack } from 'styled-system/patterns';
	import type { NotificationI } from '../../../interfaces/notification';

	export let notification: NotificationI;
	const { author } = notification;

	$: profileUrl = author ? `/${author.username}` : '';

	const avatarStyle = css({
		w: 'full',
		h: 'full',
		objectFit: 'cover',
		_hover: { transition: '0.5s', opacity: '0.8' }
	});
</script>

<div class={hstack({ gap: 3, p: 4, borderBottom: '1px solid gray', w: 'full' })}>
	<div
		class={css({
			h: '50px',
			w: '50px'
		})}
	>
		<p>ICON</p>
	</div>
	{#if notification.author}
		<a
			href={profileUrl}
			class={css({ h: '50px', w: '50px', borderRadius: '50px', overflow: 'hidden' })}
		>
			<img class={avatarStyle} src={notification.author.avatar} alt="author" />
		</a>
		<p>
			<a href={profileUrl} class={css({ fontWeight: 'bold' })}>{notification.author.displayName}</a>
			is following you
		</p>
	{/if}
</div>
