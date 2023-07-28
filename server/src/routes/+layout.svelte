<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import RightCol from '$lib/components/RightCol.svelte';
	import { css } from 'styled-system/css';
	import { container } from 'styled-system/patterns';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const username = data.user?.username;
</script>

<div
	class={container({
		h: 'screen',
		w: 'full',
		display: 'flex',
		paddingX: { sm: 0, md: 59 },
		paddingY: '10px'
	})}
>
	<Navbar isLogged={!!data.user} {username} />
	<main class={css({ w: { sm: '100%', md: '55%' }, overflowY: 'scroll' })}>
		<slot />
	</main>
	<RightCol />
</div>
