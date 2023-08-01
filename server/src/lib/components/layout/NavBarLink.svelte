<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack } from 'styled-system/patterns';

	export let label: string;
	export let url: string;

	const aStyle = hstack({
		gap: '4',
		fontSize: 'xl',
		color: 'white',
		transition: '0.2s',
		_hover: {
			color: 'primary'
		}
	});

	const labelStyle = css({
		display: {
			base: 'none',
			lg: 'block'
		},
		transition: '0.2s',
		_hover: {
			color: 'primary'
		}
	});
</script>

<li class={css({ bg: 'red' })}>
	<a href={url} class={aStyle}>
		<slot />
		<span class={labelStyle}>{label}</span>
	</a>
</li>
