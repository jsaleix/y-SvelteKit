import tweetService from '$lib/server/services/tweet.service.js';

export const load = async ({ locals }: { locals: App.Locals }) => {
	const tweets = await tweetService.getTweetsOfFollowedUsers(locals!.user!.id);
	return {
		tweets
	};
};
