import bookmarkService from '$lib/server/services/bookmark.service';
import likeService from '$lib/server/services/like.service';
import tweetService from '$lib/server/services/tweet.service';
import userService from '$lib/server/services/user.service.js';

export async function load({ params, locals }) {
	try {
		const { username, tweetId } = params;

		const user = await userService.getUserPer('username', username as string);
		if (!user) throw new Error('User not found');

		const tweet = await tweetService.getTweet(tweetId as string);
		if (!tweet) throw new Error('Tweet not found');

		const interactions = {
			isLiked: false,
			isBookmarked: false,
			isRetweeted: false
		}

		if(locals.user){
			interactions.isBookmarked = await bookmarkService.isBookmarked(locals.user.id, tweet.id);
			interactions.isLiked = await likeService.hasUserLikedTweet(tweet.id, locals.user.id);
		}
		
		return { user, tweet, interactions };
	} catch (e: any) {
		console.log(e.message);
		return { error: e.message };
	}
}
