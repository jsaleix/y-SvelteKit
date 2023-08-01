import prisma from '$lib/assets/images/prisma';
import { NOTIFICATION_TYPES } from '$lib/constants/notification';
import type { NotificationType } from '@prisma/client';
import notificationService from './notification.service';

class LikeService {
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

		await notificationService.createNotification(
			userId,
			NOTIFICATION_TYPES.LIKE as NotificationType,
			tweetId
		);

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

	async hasUserLikedTweet(tweetId: string, userId: string) {
		const like = await prisma.like.findFirst({
			where: {
				tweetId,
				userId
			}
		});

		return !!like;
	}

	async getUserLikes(userId: string) {
		const likes = await prisma.like.findMany({
			where: {
				userId
			}
		});

		return likes;
	}
}

export default new LikeService();
