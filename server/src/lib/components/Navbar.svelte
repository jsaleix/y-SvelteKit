<script lang="ts">
	import logo from '$lib/assets/icons/logo.svg';
	import * as Icons from '$lib/assets/icons/nav/index';
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	const TABS = [
		{
			label: 'Home',
			icon: Icons.house,
			url: '/'
		},
		{
			label: 'Explore',
			icon: Icons.explore,
			url: '/explore'
		},
		{
			label: 'Messages',
			icon: Icons.message,
			url: '/messages'
		},
		{
			label: 'Bookmarks',
			icon: Icons.bookmark,
			url: '/bookmarks'
		},
		{
			label: 'Profile',
			icon: Icons.profile,
			url: '/profile'
		}
	];
</script>

<header class={vstack({ gap: '5', alignItems: 'start', w: '15%', borderRight: '1px solid gray' })}>
	<span
		class={css({
			h: '25px',
			w: '25px',
			objectFit: 'contain',
			overflow: 'hidden'
		})}
	>
		<picture>
			<img
				src={logo}
				alt="Welcome on Y"
				class={css({ h: '100%', w: '100%', objectFit: 'contain' })}
			/>
		</picture>
	</span>
	<ul class={vstack({ gap: 5, alignItems: 'start' })}>
		{#each TABS as tab}
			<li class={css({ bg: 'red' })}>
				<a href={tab.url} class={hstack({ gap: '4', fontSize: 'xl' })}>
					<img src={tab.icon} alt={`${tab.label} icon`} />
					{tab.label}
				</a>
			</li>
		{/each}
	</ul>
</header>
