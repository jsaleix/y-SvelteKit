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

	async getTweet(tweetId: string): Promise<Tweet> {
		const tweet = await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});

		if (!tweet) throw new Error('Tweet not found');

		const likes = await prisma.like.count({
			where: {
				tweetId
			}
		});

		const bookmarks = await prisma.bookmark.count({
			where: {
				tweetId
			}
		});

		const owner = await prisma.user.findUnique({
			where: {
				id: tweet.creatorId
			},
			select: {
				id: true,
				username: true,
				displayName: true,
				avatar: true
			}
		});

		if (!owner) throw new Error('User not found');

		return {
			...tweet,
			user: owner,
			stats: {
				retweets: 0,
				likes,
				bookmarks
			}
		};
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

		const tweets = await Promise.all(
			rawTweets.map(async (rawTweet) => {
				const tweet = await this.getTweet(rawTweet.id);
				return tweet;
			})
		);

		return tweets;
	}

	async likeTweet(tweetId: string, userId: string) {
		const tweet = await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});

		if (!tweet) throw new Error('Tweet not found');

		let like = await prisma.like.findFirst({
			where: {
				tweetId,
				userId
			}
		});

		if (!like) {
			like = await prisma.like.create({
				data: {
					tweetId,
					userId
				}
			});
		}

		return like;
	}

	async unlikeTweet(tweetId: string, userId: string) {
		const tweet = await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});

		if (!tweet) throw new Error('Tweet not found');

		let like = await prisma.like.findFirst({
			where: {
				tweetId,
				userId
			}
		});

		if (like) {
			like = await prisma.like.delete({
				where: {
					id: like.id
				}
			});
		}

		return like;
	}
}

export default new TweetService();
