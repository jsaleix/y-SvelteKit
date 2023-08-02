<script lang="ts">
	import NotificationListItem from '$lib/components/notification/NotificationListItem.svelte';
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { notifications } = data;
</script>

<div>
	<h1 class={css({ p: 3, fontWeight: 'bold', fontSize: 'xl', w: 'full', bg: 'black' })}>
		Notifications
	</h1>
	<div class={vstack()}>
		{#if !notifications || notifications.length === 0}
			<div>No tweet saved yet</div>
		{:else}
			{#each notifications as notification}
				<NotificationListItem {notification} />
			{/each}
		{/if}
	</div>
</div>
