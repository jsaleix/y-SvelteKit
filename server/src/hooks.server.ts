import { getSession } from '$lib/server/session-store';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = getSession(sid);
		console.log(session);
		if (session) {
			event.locals.user = {
				username: session.username,
				email: session.email,
				roles: session.roles
			};
		} else {
			// remove invalid/expired/unknown cookie
			cookies.delete('sid');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
