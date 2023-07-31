<script lang="ts">
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { divider, hstack, vstack } from 'styled-system/patterns';
	import { onMount } from 'svelte';
	import type { Tweet } from '../../../interfaces/tweet';
	import LikeIcon from './icons/LikeIcon.svelte';
	import ReplyIcon from './icons/ReplyIcon.svelte';
	import RetweetIcon from './icons/RetweetIcon.svelte';

	export let tweet: Tweet;

	let isLiked = false;
	let isRetweeted = false;

	onMount(async () => {
		if (!$authUser) return;
		try {
			const res = await fetch(`/api/tweets/${tweet.id}/like`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			isLiked = data.isLiked;
		} catch (e: any) {
			console.log(e.message);
		}
	});

	const handleLike = async (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();

		try {
			if (!$authUser) throw new Error('You must login first');
			const method = isLiked ? 'DELETE' : 'POST';

			const res = await fetch(`/api/tweets/${tweet.id}/like`, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userId: $authUser.id })
			});
			isLiked = !isLiked;
			tweet.stats.likes += isLiked ? 1 : -1;
		} catch (e: any) {
			console.log(e.message);
		}
	};

	const handleRetweet = async (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		console.log('retweet');
	};
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
		<p class={css({ color: 'gray' })}>
			<span class={css({ color: 'white', fontWeight: 'bold' })}>{tweet.stats.bookmarks}</span> bookmarks
		</p>
	</div>
	<div class={divider()} />
	<div class={hstack({ gap: 10, bg: 'none', w: 'full' })}>
		<ReplyIcon handleClick={() => null} />
		<RetweetIcon handleClick={handleRetweet} alreadyRetweeted={false} />
		<LikeIcon handleClick={handleLike} alreadyLiked={isLiked} />
	</div>
	<div class={divider()} />
</div>
