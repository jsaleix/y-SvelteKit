<script lang="ts">
	import ReplyBox from '$lib/components/tweet/ReplyBox.svelte';
	import TweetItem from '$lib/components/tweet/TweetItem.svelte';
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import { authUser } from '$lib/stores/auth.js';
	import { css } from 'styled-system/css';
	import { divider } from 'styled-system/patterns';

	export let data;
	const { tweet, interactions, tweetRepliedTo } = data;

	let replies = [];

	const handleReply = async (reply: string) => {
		try {
			if (!tweet) throw new Error('Tweet not found');
			if (!$authUser) throw new Error('You must login first');
			let content = reply.trim();
			if (!content) throw new Error('Reply content cannot be empty');
			const formData = new FormData();
			formData.append('content', content);
			formData.append('replyTo', tweet.id);
			const res = await fetch('/api/tweets', {
				method: 'POST',
				body: formData
			});
			if (!res.ok) throw new Error('Something went wrong');
			const data = await res.json();
		} catch (e: any) {
			console.error(e.message);
		}
	};
</script>

{#if !tweet}
	<div>{data.error}</div>
{:else}
	<div class={css({ p: 5 })}>
		{#if tweetRepliedTo}
			<TweetListItem tweet={tweetRepliedTo} />
			<br />
		{/if}
		<TweetItem {tweet} {interactions} />
		{#if $authUser}
			<ReplyBox {handleReply} />
			<div class={divider()} />
		{/if}
	</div>
{/if}
