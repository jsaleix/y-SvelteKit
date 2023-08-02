import bookmarkService from '$lib/server/services/bookmark.service';
import likeService from '$lib/server/services/like.service';
import tweetService from '$lib/server/services/tweet.service';
import userService from '$lib/server/services/user.service.js';

export async function load({ params, locals }) {
	try {
		const { username, tweetId } = params;
		const interactions = {
			isLiked: false,
			isBookmarked: false,
			isRetweeted: false
		};
		let tweetRepliedTo = null;
		let replies = [];

		const user = await userService.getUserPer('username', username as string);
		if (!user) throw new Error('User not found');

		const tweet = await tweetService.getTweet(tweetId as string);
		if (!tweet) throw new Error('Tweet not found');

		if (tweet.replyTo) {
			tweetRepliedTo = await tweetService.getTweet(tweet.replyTo);
		}

		replies = await tweetService.getReplies(tweet.id);

		if (locals.user) {
			interactions.isBookmarked = await bookmarkService.isBookmarked(locals.user.id, tweet.id);
			interactions.isLiked = await likeService.hasUserLikedTweet(tweet.id, locals.user.id);
			interactions.isRetweeted = await tweetService.hasUserRetweeted(locals.user.id, tweet.id);
		}

		return { user, tweet, interactions, tweetRepliedTo, replies };
	} catch (e: any) {
		console.log(e.message);
		return { error: e.message };
	}
}
