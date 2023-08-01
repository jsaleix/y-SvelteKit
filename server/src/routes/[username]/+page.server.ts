import followService from '$lib/server/services/follow.service';
import tweetService from '$lib/server/services/tweet.service';
import userService from '$lib/server/services/user.service.js';

export async function load({ params, locals }: { params: any; locals: any }) {
	try {
		const { username } = params;

		const user = await userService.getUserPer('username', username as string);
		if (!user) throw new Error('User not found');

		let isFollowingYou = false;
		let areYouFollowing = false;

		const followersNb = await followService.getFollowersCount(user.id);
		const followingNb = await followService.getFollowingCount(user.id);

		if (locals.user) {
			isFollowingYou = await followService.isUserFollowing(user.id, locals.user.id);
			areYouFollowing = await followService.isUserFollowing(locals.user.id, user.id);
		}

		const tweets = await tweetService.getTweetsWithoutReplies(user.id);
		return {
			user,
			tweets,
			follows: { followersNb, followingNb },
			interaction: { isFollowingYou, areYouFollowing }
		};
	} catch (e: any) {
		console.log(e.message);
		return { error: e.message };
	}
}
