import authService from '$lib/server/services/auth.service.js';
import userService from '$lib/server/services/user.service.js';
import { isNotConnected } from '$lib/server/session-store/restriction.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	isNotConnected(locals, '/');
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const { username, password, email } = Object.fromEntries(form.entries()) as {
			username: string;
			password: string;
			email: string;
		};
		try {
			if (!username || !password || !email) throw new Error('Missing field(s)');
			if (username.length < 3 || username.length > 20) throw new Error('Invalid username length');
			if (password.length < 8 || password.length > 20) throw new Error('Invalid password length');
			if (email.length < 3 || email.length > 50) throw new Error('Invalid email length');
			if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Invalid usernamee');
			if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email))
				throw new Error('Invalid email');
			const usernameExists = await userService.getUserPer('username', username);
			if (usernameExists) throw new Error('Username already taken');

			const emailExists = await userService.getUserPer('email', email);
			if (emailExists) throw new Error('Email already taken');

			const account = await authService.createUser(email, username, password);
			if (!account) throw new Error('Failed to create account');
		} catch (e: any) {
			console.log(e);
			return fail(404);
		}
		throw redirect(303, '/i/login');
	}
};
