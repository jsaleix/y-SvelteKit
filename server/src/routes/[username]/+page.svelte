<script lang="ts">
	import TabSelector from '$lib/components/tweet/TabSelector.svelte';
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import ProfileHeader from '$lib/components/tweet/profile/ProfileHeader.svelte';
	import { divider, vstack } from 'styled-system/patterns';
	import { fly } from 'svelte/transition';
	import type { Tweet } from '../../interfaces/tweet';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { user, tweets: tweetsWithoutReplies, follows, interaction } = data;

	let tweetsWithReplies: Tweet[] = [];
	let selectedTab = 0;
	let loading = false;

	const fetchTweetsWithReplies = async () => {
		try {
			loading = true;
			const res = await fetch(`/api/users/${user?.username}/tweets?scope=with_replies`);
			const data = await res.json();
			tweetsWithReplies = data.tweets;
		} catch (e: any) {
			console.error(e.message);
		} finally {
			loading = false;
		}
	};

	$: {
		if (selectedTab === 1 && tweetsWithReplies.length == 0) {
			fetchTweetsWithReplies();
		}
	}
</script>

<svelte:head>
	<title>{user?.displayName} (@{user?.username}) / Y</title>
	<meta name="description" content="Saved tweets" />
</svelte:head>

{#if data.error || !user || !tweetsWithoutReplies}
	<div>{data.error}</div>
{:else}
	<div
		class={vstack({ gap: 0, w: 'full', alignItems: 'start' })}
		in:fly={{ y: 20, duration: 1000 }}
	>
		<ProfileHeader {user} {interaction} {follows} />
		<TabSelector selected={selectedTab} updateSelected={(s) => (selectedTab = s)} />
		<div class={divider()} />
		<div
			id="tweets_without_replies"
			class={vstack({ gap: 0, w: 'full', display: selectedTab === 0 ? 'flex' : 'none' })}
		>
			{#if !tweetsWithoutReplies || tweetsWithoutReplies.length === 0}
				<div>No tweets yet</div>
			{:else}
				{#each tweetsWithoutReplies as tweet}
					<TweetListItem {tweet} />
				{/each}
			{/if}
		</div>
		<div
			id="tweets_with_replies"
			class={vstack({ gap: 0, w: 'full', display: selectedTab === 1 ? 'flex' : 'none' })}
		>
			{#if !tweetsWithReplies || tweetsWithReplies.length === 0}
				<div>No tweets yet</div>
			{:else}
				{#each tweetsWithReplies as tweet}
					<TweetListItem {tweet} />
				{/each}
			{/if}
		</div>
	</div>
{/if}
