<script lang="ts">
	export let data;
</script>

{#if data.error}
	<div>{data.error}</div>
{:else}
	<div>
		This is a twett
		<br />
		{JSON.stringify(data.user)}
		<br />
		{JSON.stringify(data.tweet)}
	</div>
{/if}
