<script lang="ts">
	import { css } from 'styled-system/css';
	import { divider, hstack, vstack } from 'styled-system/patterns';
	import type { Tweet } from '../../interfaces/tweet';
	import LikeIcon from './common/LikeIcon.svelte';
	import ReplyIcon from './common/ReplyIcon.svelte';
	import RetweetIcon from './common/RetweetIcon.svelte';

	export let tweet: Tweet;
</script>

<div
	class={vstack({
		p: 5,
		gap: 5,
		w: 'full',
		transition: '0.5s',
		alignItems: 'start'
	})}
>
	<a href={`/${tweet.user.username}`} class={hstack({ w: 'full', gap: 5 })}>
		<div
			class={css({ w: '45px', h: '45px', bg: 'primary', borderRadius: '45px', overflow: 'hidden' })}
		>
			<picture>
				<img
					class={css({
						w: 'full',
						h: 'full',
						objectFit: 'cover',
						_hover: { transition: '0.5s', opacity: '0.8' }
					})}
					src={tweet.user.avatar}
					alt="avatar"
				/>
			</picture>
		</div>
		<div class={vstack({ gap: 0, bg: 'none' })}>
			<p class={css({ fontWeight: 'bold', bg: 'none' })}>{tweet.user.username}</p>
			<p class={css({ color: 'gray', bg: 'none' })}>
				@{tweet.user.username}
			</p>
		</div>
	</a>
	<p class={css({ bg: 'none' })}>{tweet.content}</p>

	<p class={css({ color: 'gray', bg: 'none' })}>
		{new Date(tweet.createdAt).toLocaleDateString()}
	</p>
	<div class={divider()} />
	<div class={hstack({ gap: 10, bg: 'none', w: 'full', fontSize: 'sm' })}>
		<p class={css({ color: 'gray' })}>
			<span class={css({ color: 'white', fontWeight: 'bold' })}>{tweet.stats.retweets}</span> retweets
		</p>
		<p class={css({ color: 'gray' })}>
			<span class={css({ color: 'white', fontWeight: 'bold' })}>{tweet.stats.likes}</span> likes
		</p>
	</div>
	<div class={divider()} />
	<div class={hstack({ gap: 10, bg: 'none', w: 'full' })}>
		<ReplyIcon handleClick={() => null} />
		<RetweetIcon handleClick={() => null} alreadyRetweeted={false} />
		<LikeIcon handleClick={() => null} alreadyLiked={false} />
	</div>
	<div class={divider()} />
</div>
