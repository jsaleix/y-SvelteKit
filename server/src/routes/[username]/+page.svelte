<script lang="ts">
	import { button } from '$lib/components/styles/button';
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { divider, hstack, vstack } from 'styled-system/patterns';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { user, tweets, follows, interaction } = data;

	const followUser = async () => {
		try {
			if (!user) throw new Error('User not found');
			if (!$authUser) throw new Error('You must be logged in to follow a user');
			const res = await fetch(`/api/follow/${user.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			console.log(data);
			interaction.areYouFollowing = true;
		} catch (e: any) {
			console.log(e);
		}
	};

	const unfollowUser = async () => {
		try {
			if (!user) throw new Error('User not found');
			if (!$authUser) throw new Error('You must be logged in to follow a user');
			const res = await fetch(`/api/follow/${user.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			interaction.areYouFollowing = false;
		} catch (e: any) {
			console.log(e);
		}
	};
</script>

<svelte:head>
	<title>{user?.displayName} (@{user?.username}) / Y</title>
	<meta name="description" content="Saved tweets" />
</svelte:head>

{#if data.error || !user || !tweets}
	<div>{data.error}</div>
{:else}
	<div class={vstack({ gap: 0, w: 'full', alignItems: 'start' })}>
		<div class={vstack({ alignItems: 'start', py: 3, w: 'full', h: 'fit-content' })}>
			<div
				id="profile_presentation"
				class={vstack({
					h: '33vh',
					position: 'relative',
					w: 'full',
					bgColor: 'black',
					alignItems: 'start',
					gap: 0
				})}
			>
				<div
					class={css({
						h: '70%',
						w: 'full',
						bg: 'primary'
					})}
				>
					<img
						alt="banner"
						src={'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
						class={css({ h: 'full', w: 'full', objectFit: 'cover' })}
					/>
				</div>
				<div class={css({ position: 'absolute', zIndex: 100, left: 2, bottom: 0, bg: 'none' })}>
					<div
						id="avatar"
						class={css({
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							h: '115px',
							w: '115px',
							p: 1,
							borderRadius: '115px',
							overflow: 'hidden',
							bg: 'black',
							_hover: { transition: '0.5s', opacity: '0.8' }
						})}
					>
						<div class={css({ h: 'full', w: 'full', borderRadius: 'full', overflow: 'hidden' })}>
							<picture>
								<img
									src={user.avatar}
									alt="avatar"
									class={css({ w: 'full', h: 'full', objectFit: 'cover' })}
								/>
							</picture>
						</div>
					</div>
				</div>
				<div
					class={hstack({
						h: 'auto',
						w: 'full',
						justifyContent: 'flex-end',
						alignItems: 'center',
						p: 1,
						bg: 'transparent'
					})}
				>
					{#if interaction.areYouFollowing}
						<button class={button({ width: 'auto', color: 'danger' })} on:click={unfollowUser}
							>Unfollow</button
						>
					{:else}
						<button class={button({ width: 'auto' })} on:click={followUser}>Follow</button>
					{/if}
				</div>
			</div>
			<div class={vstack({ gap: 1, px: 4 })}>
				<div class={vstack({ gap: 0, alignItems: 'flex-start' })}>
					<h2 class={css({ fontWeight: 'bold', fontSize: '2xl' })}>{user.displayName}</h2>
					<p class={css({ color: 'gray' })}>@{user.username}</p>
					{#if interaction.isFollowingYou}
						<p class={css({ fontSize: 'sm', color: 'white' })}>Is following you</p>
					{/if}
				</div>
			</div>
			<div class={hstack({ px: 4, gap: 4 })}>
				<p class={hstack({ gap: 1, color: 'gray' })}>
					<span class={css({ fontWeight: 'bold' })}>{follows.followersNb}</span> followers
				</p>
				<p class={hstack({ gap: 1, color: 'gray' })}>
					<span class={css({ fontWeight: 'bold' })}>{follows.followingNb}</span> followings
				</p>
			</div>
		</div>
		<div class={divider()} />
		<div id="tweets" class={vstack({ gap: 0, w: 'full' })}>
			{#if !tweets || tweets.length === 0}
				<div>No tweets yet</div>
			{:else}
				{#each tweets as tweet}
					<TweetListItem {tweet} />
				{/each}
			{/if}
		</div>
	</div>
{/if}
