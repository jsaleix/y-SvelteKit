<script lang="ts">
	import logo from '$lib/assets/icons/logo.svg';
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
	import NewTweetModal from '../NewTweetModal.svelte';
	import NavBarLink from './NavBarLink.svelte';
	import TweetBtn from './TweetBtn.svelte';
	import UserTab from './UserTab.svelte';
	import Bookmarks from './icons/Bookmarks.svelte';
	import House from './icons/House.svelte';
	import Messages from './icons/Messages.svelte';
	import Profile from './icons/Profile.svelte';

	const isLogged: boolean = !!$authUser;
	let openModal: boolean = false;

	const username = $authUser?.username || '';

	const headerStyle = vstack({
		display: {
			base: 'none',
			md: 'flex'
		},
		gap: '5',
		alignItems: {
			base: 'center',
			lg: 'start'
		},
		w: '15%',
		borderRight: '1px solid gray',
		pr: 5
	});

	const logoStyle = css({
		h: '25px',
		w: '25px',
		objectFit: 'contain',
		overflow: 'hidden',
		_hover: {
			opacity: '0.7'
		}
	});
</script>

<header class={headerStyle}>
	<a href="/" class={logoStyle}>
		<picture>
			<img
				src={logo}
				alt="Welcome on Y"
				class={css({ h: '100%', w: '100%', objectFit: 'contain' })}
			/>
		</picture>
	</a>
	<ul class={vstack({ gap: 5, alignItems: 'start' })}>
		<NavBarLink label="Home" url="/">
			<House />
		</NavBarLink>
		{#if isLogged}
			<NavBarLink label="Messages" url="/messages">
				<Messages />
			</NavBarLink>
			<NavBarLink label="Bookmarks" url="/bookmarks">
				<Bookmarks />
			</NavBarLink>
			<NavBarLink label="Profile" url={'/' + username}>
				<Profile />
			</NavBarLink>
		{/if}
	</ul>
	{#if isLogged}
		<TweetBtn openModal={() => (openModal = true)} />
		<div class={css({ marginTop: 'auto', marginBottom: '3', w: 'full' })}>
			<UserTab user={$authUser} />
		</div>
	{/if}
</header>

{#if openModal}
	<NewTweetModal closeModal={() => (openModal = false)} />
{/if}
