import { isConnected } from '$lib/server/session-store/restriction.js';

export const load = async ({ locals }) => {
	isConnected(locals, '/i/login');
};
