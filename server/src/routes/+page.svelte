<script lang="ts">
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
	import { fly } from 'svelte/transition';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { tweets } = data;
</script>

<svelte:head>
	<title>Home / Y</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class={css({ w: 'full', fontSize: 'xl', position: 'relative' })}>
	<div
		class={vstack({
			position: 'sticky',
			top: '0',
			left: '0',
			w: 'full',
			bg: 'none',
			gap: '0'
		})}
	>
		<h2 class={css({ p: 3, fontWeight: 'bold', fontSize: 'xl', w: 'full', bg: 'black' })}>Home</h2>
	</div>
	<div class={css({ p: 3 })}>
		<div
			in:fly={{ y: 20, duration: 1000 }}
			class={css({ display: 'flex', flexDirection: 'column' })}
		>
			{#if !tweets || tweets.length === 0}
				<div>No tweets yet</div>
			{:else}
				{#each tweets as tweet}
					<TweetListItem {tweet} />
				{/each}
			{/if}
		</div>
	</div>
</section>
