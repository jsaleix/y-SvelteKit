<script lang="ts">
	import TweetItem from '$lib/components/tweet/TweetItem.svelte';

	export let data;

	const { tweet } = data;
</script>

{#if !tweet}
	<div>{data.error}</div>
{:else}
	<div>
		<TweetItem {tweet} />
	</div>
{/if}
