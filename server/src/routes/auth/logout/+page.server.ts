import { deleteSession } from '$lib/server/session-store';
import { redirect, type Cookies } from '@sveltejs/kit';

export async function load({ cookies }: { cookies: Cookies }) {
	const sid = cookies.get('sid');
	if (sid) {
		cookies.delete('sid');
		deleteSession(sid);
	}

	throw redirect(303, '/');
}
