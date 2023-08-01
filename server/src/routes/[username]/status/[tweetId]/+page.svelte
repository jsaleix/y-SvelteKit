<script lang="ts">
	import ReplyBox from '$lib/components/tweet/ReplyBox.svelte';
	import TweetItem from '$lib/components/tweet/TweetItem.svelte';
	import { authUser } from '$lib/stores/auth.js';
	import { css } from 'styled-system/css';
	import { divider } from 'styled-system/patterns';

	export let data;
	const { tweet, interactions } = data;

	let replies = [];

	const handleReply = async (reply: string) => {
		console.log(reply);
	};
</script>

{#if !tweet}
	<div>{data.error}</div>
{:else}
	<div class={css({ p: 5 })}>
		<TweetItem {tweet} {interactions} />
		{#if $authUser}
			<ReplyBox {handleReply} />
			<div class={divider()} />
		{/if}
	</div>
{/if}
