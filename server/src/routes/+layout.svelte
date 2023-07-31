<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import RightCol from '$lib/components/layout/RightCol.svelte';
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { container } from 'styled-system/patterns';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	export let data = {} as LayoutServerData;

	const user = data.user;
	authUser.set(user);
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
	<Navbar />
	<main class={css({ w: { sm: '100%', md: '55%' }, overflowY: 'scroll' })}>
		<slot />
	</main>
	<RightCol />
</div>
