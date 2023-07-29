import prisma from '$lib/assets/images/prisma';
import type { CreateTweet, Tweet } from '../../../interfaces/tweet';

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
		return await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});
	}

	async getTweets(userId: string): Promise<Tweet[]> {
		const rawTweets = await prisma.tweet.findMany({
			where: {
				creatorId: userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		const owner = await prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				username: true,
				displayName: true,
				avatar: true
			}
		});

		if (!owner) throw new Error('User not found');

		const tweets = rawTweets.map((tweet) => {
			return {
				...tweet,
				user: owner,
				stats: {
					retweets: 0,
					likes: 0
				}
			};
		});

		return tweets;
	}
}

export default new TweetService();
