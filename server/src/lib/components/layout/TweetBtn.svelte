<script lang="ts">
	import { css, cx } from 'styled-system/css';
	import { button } from '../styles/button';
	export let openModal: () => void;

	const lgButton = cx(
		button({ size: 'lg' }),
		css({
			display: {
				base: 'none',
				lg: 'block'
			}
		})
	);

	const smButton = cx(
		button({ width: 'auto', size: 'lg' }),
		css({
			display: {
				base: 'block',
				lg: 'none'
			}
		})
	);
</script>

<button class={lgButton} on:click={openModal}>Tweet</button>
<button class={smButton} on:click={openModal}>+</button>
