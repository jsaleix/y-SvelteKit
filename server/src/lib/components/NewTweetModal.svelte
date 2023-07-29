<script lang="ts">
	import { TWEET_MAX_LENGTH } from '$lib/constants/tweets';
	import { authUser } from '$lib/stores/auth';
	import { css } from 'styled-system/css';
	import { divider, hstack, vstack } from 'styled-system/patterns';
	import { fade, fly } from 'svelte/transition';
	import { button } from './styles/button';

	const modalStyle = css({
		position: 'fixed',
		top: '0px',
		left: '0px',
		w: '100vw',
		h: '100vh',
		zIndex: '100',
		bg: 'rgba(255, 255, 255,0.22)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		p: {
			base: 4,
			md: 0
		}
	});

	const innerModalStyle = vstack({
		cursor: 'default',
		w: { base: 'full', md: '40%' },
		h: { base: 'fit-content', md: 'fit-content' },
		bg: 'black',
		rounded: 'xl',
		p: 4,
		alignItems: 'start',
		gap: 5
	});

	const inputStyle = css({
		w: 'full',
		outline: 'none',
		color: 'white',
		fontSize: 'xl',
		h: { base: '25vh', md: '30%' },
		resize: 'none'
	});

	export let closeModal: () => void;
	let loading = false;
	const user = $authUser;
	let tweetContent = {
		content: '',
		media: null
	};

	const handleSubmit = async () => {
		loading = true;
		try {
			if (!user) throw new Error('You must be logged in to tweet');
			let { content } = tweetContent;
			content = content.trim();
			if (!content) throw new Error('Tweet content cannot be empty');
			const formData = new FormData();
			formData.append('content', content);
			const res = await fetch('/api/tweets', {
				method: 'POST',
				body: formData
			});
			if (!res.ok) throw new Error('Something went wrong');
			const data = await res.json();
			window.location.href = `/${user.username}/status/${data.tweetId}`;
			closeModal();
		} catch (e: any) {
			console.error(e.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class={modalStyle} on:click={closeModal}>
	<div class={innerModalStyle} in:fly={{ y: 20, duration: 500 }} out:fade>
		<button on:click={closeModal} class={css({ cursor: 'pointer' })}
			><svg width="15" height="15" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1 8.07L8.072 1M1 1L8.072 8.07"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
		</button>
		<form
			class={vstack({ w: 'full', alignItems: 'start' })}
			on:click={(e) => e.stopPropagation()}
			on:submit={handleSubmit}
		>
			<textarea
				class={inputStyle}
				placeholder="What's up?"
				bind:value={tweetContent.content}
				maxlength={TWEET_MAX_LENGTH}
				name="content"
			/>
			<div class={divider()} />
			<div class={hstack({ w: 'full', justifyContent: 'space-between' })}>
				<p class={css({ color: 'gray' })}>{tweetContent.content.length}/{TWEET_MAX_LENGTH}</p>
				<input disabled={loading} class={button({ width: 'auto' })} type="submit" value="Tweet" />
			</div>
		</form>
	</div>
</div>
