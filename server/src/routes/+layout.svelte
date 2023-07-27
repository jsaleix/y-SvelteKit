<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import RightCol from '$lib/components/RightCol.svelte';
	import { css } from 'styled-system/css';
	import { container } from 'styled-system/patterns';
	import '../app.css';
</script>

<div class={container({ h: 'screen', w: 'full', display: 'flex', paddingX: 59, paddingY: '10px' })}>
	<Navbar />
	<main class={css({ w: '55%', overflowY: 'scroll' })}>
		<slot />
	</main>
	<RightCol />
</div>
