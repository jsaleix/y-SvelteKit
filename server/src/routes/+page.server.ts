import tweetService from '$lib/server/services/tweet.service.js';
import { isConnected } from '$lib/server/session-store/restriction';

export const load = async ({ locals }: { locals: App.Locals }) => {
	isConnected(locals, '/i/login');
	const tweets = await tweetService.getTweetsOfFollowedUsers(locals!.user!.id);
	return {
		tweets
	};
};
