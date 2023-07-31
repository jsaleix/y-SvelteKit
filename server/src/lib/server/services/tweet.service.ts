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

	async getTweetsOfFollowedUsers(userId: string): Promise<Tweet[]> {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				following: true
			}
		});

		if (!user) throw new Error('User not found');

		const followingUserIds = user.following.map((followedUser) => followedUser.followedId);

		const rawTweets = await prisma.tweet.findMany({
			where: {
				OR: [{ creatorId: user.id }, { creatorId: { in: followingUserIds } }]
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
}

export default new TweetService();
