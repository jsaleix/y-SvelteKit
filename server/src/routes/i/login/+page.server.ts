import authService from '$lib/server/services/auth.service.js';
import { createSession } from '$lib/server/session-store';
import type { User } from '@prisma/client';
import { fail, redirect, type Cookies } from '@sveltejs/kit';

const performLogin = (cookies: Cookies, user: User) => {
	const maxAge = 60 * 60 * 24 * 7; // 1 week
	const sid = createSession(user, maxAge);
	cookies.set('sid', sid, { maxAge, path: '/' });
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const { username, password } = Object.fromEntries(form.entries()) as {
			username: string;
			password: string;
		};
		try {
			if (!username || !password) throw new Error('Missing field(s)');
			const user = await authService.authUser(username, password);

			// set cookie
			// cookies.set('token', JSON.stringify(user), {
			// 	maxAge: 60 * 60 * 24 * 7, // 1 week
			// 	path: '/'
			// });
			performLogin(cookies, user);
		} catch (e: any) {
			console.log(e.message);
			return fail(404, { username });
		}
		throw redirect(303, '/');
	}
};
