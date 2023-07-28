import { ROLES } from '$lib/constants/roles';
import { error } from '@sveltejs/kit';

export const isAdmin = (locals: App.Locals) => {
	if (!locals?.user || !locals.user.roles.includes(ROLES.ADMIN)) {
		throw error(401, 'Unauthorized');
	}
};

export const isConnected = (locals: App.Locals) => {
	if (!locals?.user) {
		throw error(401, 'Unauthorized');
	}
};
