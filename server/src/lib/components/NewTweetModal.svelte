<script lang="ts">
	import { css } from 'styled-system/css';
	import { fade, fly } from 'svelte/transition';

	export let closeModal: () => void;

	const modalStyle = css({
		position: 'fixed',
		top: '0px',
		left: '0px',
		w: '100vw',
		h: '100vh',
		zIndex: '100',
		bg: 'rgba(0,0,0,0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer'
	});

	const innerModalStyle = css({
		cursor: 'default',
		w: '30%',
		h: '30%',
		bg: 'black',
		rounded: 'xl',
		p: 4
	});
</script>

<div class={modalStyle} on:click={closeModal}>
	<div
		class={innerModalStyle}
		on:click={(e) => e.stopPropagation()}
		in:fly={{ y: 20, duration: 500 }}
		out:fade
	>
		<button on:click={closeModal}>close</button>
	</div>
</div>
