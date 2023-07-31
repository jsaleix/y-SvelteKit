<script lang="ts">
	import { button } from '$lib/components/styles/button';
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import { css } from 'styled-system/css';
	import { divider, hstack, vstack } from 'styled-system/patterns';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { user, tweets } = data;
</script>

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
					<button class={button({ width: 'auto' })}>Follow</button>
				</div>
			</div>
			<div class={vstack({ gap: 1, px: 4 })}>
				<div class={vstack({ gap: 0 })}>
					<h2 class={css({ fontWeight: 'bold', fontSize: '2xl' })}>{user.displayName}</h2>
					<p class={css({ color: 'gray' })}>@{user.username}</p>
				</div>
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
