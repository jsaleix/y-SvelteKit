<script lang="ts">
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';

	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;

	let formData = {
		username: '',
		email: form?.email || '',
		password: '',
		passwordConfirmation: ''
	};

	let error: string = '';
	let canSubmit: boolean = false;

	$: canSubmit = (() => {
		const { username, password, email, passwordConfirmation } = formData;
		if (username === '' || password === '' || email === '' || passwordConfirmation === '') {
			error = 'Please fill in all fields';
			return false;
		}

		if (password !== passwordConfirmation) {
			error = 'Passwords do not match';
			return false;
		}
		error = '';
		return true;
	})();
</script>

<div>
	<div>
		<h1 class={css({ fontSize: 'xl' })}>Join Y</h1>
		<form method="POST" class={vstack({})}>
			<input
				type="email"
				name="email"
				placeholder="Email"
				class={css({})}
				bind:value={formData.email}
			/>
			<input
				type="text"
				name="username"
				placeholder="Username"
				class={css({})}
				bind:value={formData.username}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				class={css({})}
				bind:value={formData.password}
			/>
			<input
				type="password"
				name="passwordConfirmation"
				placeholder="Password confirmation"
				class={css({})}
				bind:value={formData.passwordConfirmation}
			/>
			{#if error}
				<p>{error}</p>
			{/if}
			<button type="submit" disabled={!canSubmit}>Sign Up</button>
		</form>
	</div>
</div>
