<script lang="ts">
	import { css } from 'styled-system/css';

	export let notificationNb: null | number;

	const containerStyle = css({
		position: 'relative',
		width: 'fit-content'
	});

	const svgStyle = css({
		fill: 'white',
		_hover: {
			fill: 'primary'
		}
	});

	const badgeIconStyle = css({
		height: '20px',
		width: '20px',
		borderRadius: '50%',
		position: 'absolute',
		right: '-5px',
		bg: 'primary'
	});

	const pStyle = css({
		color: 'white',
		fontSize: '12px',
		fontWeight: 'bold',
		m: '0',
		bg: 'none',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	});
</script>

<div class={containerStyle}>
	{#if notificationNb}
		<span class={badgeIconStyle}>
			<p class={pStyle}>
				{notificationNb > 9 ? '9+' : notificationNb}
			</p>
		</span>
	{/if}
	<svg
		width="30"
		height="30"
		fill="white"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		aria-hidden="true"
		class={svgStyle}
		><g
			><path
				d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
			/></g
		></svg
	>
</div>
