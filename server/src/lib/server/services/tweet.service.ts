import prisma from '$lib/assets/images/prisma';
import type { CreateTweet } from '../../../interfaces/tweet';

class TweetService {
	async createTweet({ content, creatorId }: CreateTweet) {
		const newTweet = await prisma.tweet.create({
			data: {
				creatorId,
				content
			}
		});

		return newTweet;
	}

	async getTweet(tweetId: string) {
		console.log(tweetId);
		return await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});
	}
}

export default new TweetService();
