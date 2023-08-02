import tweetService from '$lib/server/services/tweet.service.js';
import { isConnected } from '$lib/server/session-store/restriction.js';

export const load = async ({ locals }) => {
	isConnected(locals, '/i/login');
	const tweets = await tweetService.getTweetsOfFollowedUsers(locals!.user!.id);
	return {
		tweets
	};
};
