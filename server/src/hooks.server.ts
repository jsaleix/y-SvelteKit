import { getSession } from '$lib/server/session-store';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = getSession(sid);
		if (session) {
			event.locals.user = {
				id: session.id,
				avatar: session.avatar,
				displayName: session.displayName,
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
