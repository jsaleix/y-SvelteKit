<script lang="ts">
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { bookmarks } = data;
</script>

<svelte:head>
	<title>Bookmarks / Y</title>
	<meta name="description" content="Saved tweets" />
</svelte:head>

<div>
	<h1 class={css({ p: 3, fontWeight: 'bold', fontSize: 'xl', w: 'full', bg: 'black' })}>
		Bookmarks
	</h1>
	<div class={vstack()}>
		{#if !bookmarks || bookmarks.length === 0}
			<div>No tweet saved yet</div>
		{:else}
			{#each bookmarks as tweet}
				<TweetListItem {tweet} />
			{/each}
		{/if}
	</div>
</div>
