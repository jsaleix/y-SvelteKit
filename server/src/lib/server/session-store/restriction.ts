import { ROLES } from '$lib/constants/roles';
import { error, redirect } from '@sveltejs/kit';

export const isAdmin = (locals: App.Locals, redirectTo?: null | string) => {
	if (!locals?.user || !locals.user.roles.includes(ROLES.ADMIN)) {
		if (redirectTo) throw redirect(307, redirectTo);
		throw error(401, 'Unauthorized');
	}
};

export const isConnected = (locals: App.Locals, redirectTo?: null | string) => {
	console.log('called');
	if (locals?.user) return;
	if (redirectTo) throw redirect(307, redirectTo ?? '/i/login');
	throw error(401, 'Unauthorized');
};

export const isNotConnected = (locals: App.Locals, redirectTo?: null | string) => {
	console.log('called');
	if (!locals?.user) return;
	if (redirectTo) throw redirect(307, redirectTo);
	throw error(401, 'Unauthorized');
};
