<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	import type { Tweet } from '../../../interfaces/tweet';
	import LikeIcon from './LikeIcon.svelte';
	import ReplyIcon from './ReplyIcon.svelte';
	import RetweetIcon from './RetweetIcon.svelte';

	export let tweet: Tweet;

	const handleLike = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();

		console.log('like');
	};

	const handleRetweet = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		console.log('retweet');
	};
</script>

<a
	href={`/${tweet.user.username}/status/${tweet.id}`}
	class={hstack({
		p: 5,
		w: 'full',
		cursor: 'pointer',
		transition: '0.5s',
		_hover: {
			bg: 'gray.700'
		}
	})}
>
	<a
		href={`/${tweet.user.username}`}
		on:click={(e) => e.stopPropagation()}
		class={css({ w: '45px', h: '45px', bg: 'primary', borderRadius: '45px', overflow: 'hidden' })}
	>
		<picture class={css({ w: 'full', h: 'full' })}>
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
	</a>
	<div class={vstack({ bg: 'none', alignItems: 'start', gap: 1, w: 'auto' })}>
		<div class={hstack({ gap: 3, bg: 'none' })}>
			<p class={css({ fontWeight: 'bold', bg: 'none' })}>{tweet.user.username}</p>
			<p class={css({ color: 'gray', bg: 'none' })}>
				@{tweet.user.username} -
				{new Date(tweet.createdAt).toLocaleDateString()}
			</p>
		</div>
		<p class={css({ bg: 'none' })}>{tweet.content}</p>
		<div class={hstack({ gap: 10, bg: 'none', w: 'full' })}>
			<ReplyIcon handleClick={() => null} />
			<div class={hstack({ gap: 1, bg: 'none', alignContent: 'center' })}>
				<p class={css({ bg: 'none' })}>{tweet.stats.retweets}</p>
				<RetweetIcon handleClick={handleRetweet} alreadyRetweeted={false} />
			</div>
			<div class={hstack({ gap: 1, bg: 'none', alignContent: 'center' })}>
				<p class={css({ bg: 'none' })}>{tweet.stats.retweets}</p>
				<LikeIcon handleClick={handleLike} alreadyLiked={false} />
			</div>
		</div>
	</div>
</a>
