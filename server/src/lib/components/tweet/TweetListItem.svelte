<script lang="ts">
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
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

		try {
			if (!$authUser) throw new Error('You must login first');
		} catch (e: any) {
			console.log(e.message);
		}
	};
</script>

<a
	data-sveltekit-reload
	href={`/${tweet.user.username}/status/${tweet.id}`}
	class={hstack({
		p: 5,
		w: 'full',
		cursor: 'pointer',
		transition: '0.5s',
		borderBottom: '1px solid gray',
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
			<div class={hstack({ gap: 1, bg: 'none', alignItems: 'center' })}>
				<p class={css({ bg: 'none' })}>{tweet.stats.replies}</p>
				<ReplyIcon handleClick={() => null} />
			</div>
			<div class={hstack({ gap: 1, bg: 'none', alignItems: 'center' })}>
				<p class={css({ bg: 'none' })}>{tweet.stats.retweets}</p>
				<RetweetIcon handleClick={handleRetweet} alreadyRetweeted={false} />
			</div>
			<div class={hstack({ gap: 1, bg: 'none', alignItems: 'center' })}>
				<p class={hstack({ bg: 'none' })}>{tweet.stats.likes}</p>
				<LikeIcon handleClick={handleLike} alreadyLiked={isLiked} />
			</div>
		</div>
	</div>
</a>
