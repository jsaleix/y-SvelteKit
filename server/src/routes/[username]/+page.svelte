<script lang="ts">
	export let data;
</script>

{#if data.error}
	<div>{data.error}</div>
{:else}
	<div>
		{JSON.stringify(data.user)}
	</div>
{/if}
