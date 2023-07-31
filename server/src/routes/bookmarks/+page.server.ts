import bookmarkService from '$lib/server/services/bookmark.service.js';
import { isConnected } from '$lib/server/session-store/restriction.js';

export const load = async ({ locals }) => {
	isConnected(locals, '/i/login');
	
	const bookmarks = await bookmarkService.getBookmarks(locals!.user!.id);

	return {
		bookmarks
	}

};
