<script lang="ts">
	import logo from '$lib/assets/icons/logo.svg';
	import * as Icons from '$lib/assets/icons/nav/index';
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	import NewTweetModal from './NewTweetModal.svelte';
	import UserTab from './UserTab.svelte';
	import { button } from './styles/button';

	const isLogged: boolean = !!$authUser;
	let openModal: boolean = false;

	const username = $authUser?.username || '';

	const TABS = [
		{
			label: 'Home',
			icon: Icons.house,
			url: '/',
			needsAuth: false
		},
		{
			label: 'Explore',
			icon: Icons.explore,
			url: '/explore',
			needsAuth: true
		},
		{
			label: 'Messages',
			icon: Icons.message,
			url: '/messages',
			needsAuth: true
		},
		{
			label: 'Bookmarks',
			icon: Icons.bookmark,
			url: '/bookmarks',
			needsAuth: true
		},
		{
			label: 'Profile',
			icon: Icons.profile,
			url: '/' + username,
			needsAuth: true
		}
	];
</script>

<header
	class={vstack({
		display: {
			base: 'none',
			md: 'flex'
		},
		gap: '5',
		alignItems: 'start',
		w: '15%',
		borderRight: '1px solid gray',
		pr: 5
	})}
>
	<a
		href="/"
		class={css({
			h: '25px',
			w: '25px',
			objectFit: 'contain',
			overflow: 'hidden',
			_hover: {
				opacity: '0.7'
			}
		})}
	>
		<picture>
			<img
				src={logo}
				alt="Welcome on Y"
				class={css({ h: '100%', w: '100%', objectFit: 'contain' })}
			/>
		</picture>
	</a>
	<ul class={vstack({ gap: 5, alignItems: 'start' })}>
		{#each TABS as tab}
			{#if (tab.needsAuth && isLogged) || !tab.needsAuth}
				<li class={css({ bg: 'red' })}>
					<a href={tab.url} class={hstack({ gap: '4', fontSize: 'xl' })}>
						<img src={tab.icon} alt={`${tab.label} icon`} />
						{tab.label}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
	{#if isLogged}
		<button class={button({ size: 'lg' })} on:click={() => (openModal = true)}>Tweet</button>
		<div class={css({ marginTop: 'auto', marginBottom: '3', w: 'full' })}>
			<UserTab user={$authUser} />
		</div>
	{/if}
</header>

{#if openModal}
	<NewTweetModal closeModal={() => (openModal = false)} />
{/if}
