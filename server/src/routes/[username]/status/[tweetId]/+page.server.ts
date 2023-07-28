import tweetService from '$lib/server/services/tweet.service';
import userService from '$lib/server/services/user.service.js';

export async function load({ params }: { params: any }) {
	try {
		const { username, tweetId } = params;

		const user = await userService.getUserPer('username', username as string);
		if (!user) throw new Error('User not found');

		const tweet = await tweetService.getTweet(tweetId as string);
		if (!tweet) throw new Error('Tweet not found');
		return { user, tweet };
	} catch (e: any) {
		console.log(e.message);
		return { error: e.message };
	}
}
