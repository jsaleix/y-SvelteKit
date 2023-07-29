<script lang="ts">
	import TweetListItem from '$lib/components/TweetListItem.svelte';
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { user, tweets } = data;

	const header = css({});
</script>

{#if data.error}
	<div>{data.error}</div>
{:else}
	<div>
		<div class={vstack({ gap: 0 })}>
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
