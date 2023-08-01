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
	class={vstack({
		p: 5,
		w: 'full',
		cursor: 'pointer',
		transition: '0.5s',
		borderBottom: '1px solid gray',
		alignItems: 'start',
		_hover: {
			bg: 'gray.700'
		}
	})}
>
	{#if tweet.replyTo}
		<div class={hstack({ bg: 'none' })}>
			<svg
				width="18"
				height="14"
				viewBox="0 0 18 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class={css({ bg: 'none' })}
			>
				<path
					d="M14.575 7.425L11.675 4.525C11.475 4.325 11.379 4.09167 11.387 3.825C11.395 3.55833 11.4993 3.325 11.7 3.125C11.9 2.94167 12.1333 2.84567 12.4 2.837C12.6667 2.82833 12.9 2.92433 13.1 3.125L17.7 7.725C17.9 7.925 18 8.15833 18 8.425C18 8.69167 17.9 8.925 17.7 9.125L13.1 13.725C12.9167 13.9083 12.6873 14 12.412 14C12.1367 14 11.8993 13.9083 11.7 13.725C11.5 13.525 11.4 13.2873 11.4 13.012C11.4 12.7367 11.5 12.4993 11.7 12.3L14.575 9.425L5.4 9.425C4.01667 9.425 2.83733 8.93733 1.862 7.962C0.886666 6.98667 0.399332 5.80767 0.399999 4.425L0.399999 1.425C0.399998 1.14167 0.495999 0.904002 0.687999 0.712002C0.879999 0.520002 1.11733 0.424335 1.4 0.425002C1.68333 0.425002 1.921 0.521002 2.113 0.713002C2.305 0.905002 2.40067 1.14233 2.4 1.425L2.4 4.425C2.4 5.25833 2.69167 5.96667 3.275 6.55C3.85833 7.13333 4.56667 7.425 5.4 7.425L14.575 7.425Z"
					fill="gray"
				/>
			</svg>

			<p class={css({ bg: 'none', color: 'gray' })}>Reply</p>
		</div>
	{/if}
	<div
		class={hstack({
			w: 'full',
			cursor: 'pointer',
			transition: '0.5s',
			bg: 'none'
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
	</div>
</a>
