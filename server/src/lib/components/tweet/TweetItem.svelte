<script lang="ts">
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { divider, hstack, vstack } from 'styled-system/patterns';
	import type { Tweet } from '../../../interfaces/tweet';
	import BookmarkIcon from './icons/BookmarkIcon.svelte';
	import LikeIcon from './icons/LikeIcon.svelte';
	import ReplyIcon from './icons/ReplyIcon.svelte';
	import RetweetIcon from './icons/RetweetIcon.svelte';

	export let tweet: Tweet;
	export let interactions = {
		isLiked: false,
		isBookmarked: false,
		isRetweeted: false
	};

	let { isLiked, isBookmarked, isRetweeted } = interactions;

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
				}
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

	const handleBookmark = async (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		try {
			if (!$authUser) throw new Error('You must login first');
			const method = isBookmarked ? 'DELETE' : 'POST';

			const res = await fetch(`/api/tweets/${tweet.id}/bookmark`, {
				method,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.status == 201) {
				tweet.stats.bookmarks += 1;
				isBookmarked = true;
			} else {
				isBookmarked = false;
			}
		} catch (e: any) {
			console.log(e.message);
		}
	};
</script>

<div
	class={vstack({
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
		<BookmarkIcon handleClick={handleBookmark} alreadyAdded={isBookmarked} />
	</div>
	<div class={divider()} />
</div>
