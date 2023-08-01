import prisma from '$lib/assets/images/prisma';
import type { CreateTweet, Tweet } from '../../../interfaces/tweet';

class TweetService {
	async createTweet({ content, creatorId, replyTo }: CreateTweet) {
		if (replyTo) {
			const tweetRepliedTo = await prisma.tweet.findUnique({
				where: {
					id: replyTo
				}
			});

			if (!tweetRepliedTo) replyTo = null;
		}

		const newTweet = await prisma.tweet.create({
			data: {
				creatorId,
				content,
				replyTo
			}
		});

		return newTweet;
	}

	async deleteTweet(tweetId: string) {
		const tweet = await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});

		if (!tweet) throw new Error('Tweet not found');

		await prisma.bookmark.deleteMany({
			where: {
				tweetId
			}
		});

		// //TMP FIND A NEW WAY TO KEEP TWEET AS REPLY
		// await prisma.tweet.updateMany({
		// 	where: {
		// 		replyTo: tweetId
		// 	},
		// 	data: {
		// 		replyTo: null
		// 	}
		// });

		await prisma.tweet.delete({
			where: {
				id: tweetId
			}
		});
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

		const replies = await prisma.tweet.count({
			where: {
				replyTo: tweetId
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
				bookmarks,
				replies
			}
		};
	}

	async getTweets(userId: string, skip: number = 0, take: number = 10): Promise<Tweet[]> {
		const rawTweets = await prisma.tweet.findMany({
			where: {
				creatorId: userId
			},
			skip,
			take,
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
	async getTweetsWithoutReplies(
		userId: string,
		skip: number = 0,
		take: number = 10
	): Promise<Tweet[]> {
		const rawTweets = await prisma.tweet.findMany({
			where: {
				creatorId: userId,
				replyTo: null
			},
			skip,
			take,
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

	async getTweetsOfFollowedUsers(
		userId: string,
		skip: number = 0,
		take: number = 10
	): Promise<Tweet[]> {
		//get concerned user
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				following: true
			}
		});

		if (!user) throw new Error('User not found');
		// get ids of users followed by concerned user
		const followingUserIds = user.following.map((followedUser) => followedUser.followedId);

		const rawTweets = await prisma.tweet.findMany({
			where: {
				OR: [{ creatorId: user.id }, { creatorId: { in: followingUserIds } }]
			},
			skip,
			take,
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

	async getReplies(tweetId: string): Promise<Tweet[]> {
		const rawReplies = await prisma.tweet.findMany({
			where: {
				replyTo: tweetId
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		const replies = await Promise.all(
			rawReplies.map(async (rawReply) => {
				const reply = await this.getTweet(rawReply.id);
				return reply;
			})
		);

		return replies;
	}
}

export default new TweetService();
