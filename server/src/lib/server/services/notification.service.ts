import prisma from '$lib/assets/images/prisma';
import { NOTIFICATION_TYPES } from '$lib/constants/notification';
import type { NotificationType } from '@prisma/client';
import tweetService from './tweet.service';
import userService from './user.service';

class NotificationService {
	async createNotification(
		authorId: string,
		notificationType: NotificationType,
		entityId?: string
	) {
		const author = await prisma.user.findUnique({
			where: {
				id: authorId
			}
		});

		if (!author) throw new Error('User not found');

		if (!Object.values(NOTIFICATION_TYPES).includes(notificationType))
			throw new Error('Invalid type of notification');

		let toNotify = null;

		// IF THIS IS A LIKE, REPLY, OR MENTION NOTIFICATION, NOTIFY THE CREATOR OF THE TWEET WITH THE TWEET
		if (
			[NOTIFICATION_TYPES.LIKE, NOTIFICATION_TYPES.REPLY, NOTIFICATION_TYPES.MENTION].includes(
				notificationType
			)
		) {
			const entity = await prisma.tweet.findUnique({
				where: {
					id: entityId
				}
			});

			if (!entity) throw new Error('Tweet not found');

			toNotify = entity.creatorId;

			await prisma.notification.create({
				data: {
					type: notificationType,
					tweetId: entityId,
					toNotifyId: toNotify,
					authorId: author.id
				}
			});

			return true;
		}

		// IF THIS IS A FOLLOW NOTIFICATION, NOTIFY THE USER THAT WAS FOLLOWED WITH THE
		if (notificationType === NOTIFICATION_TYPES.FOLLOW) {
			if (!entityId) throw new Error('Invalid entity id');
			toNotify = entityId;

			await prisma.notification.create({
				data: {
					type: notificationType,
					toNotifyId: toNotify,
					authorId: author.id
				}
			});
		}
	}

	async getNotifications(userId: string) {
		const rawNotifications = await prisma.notification.findMany({
			where: {
				toNotifyId: userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		await prisma.notification.updateMany({
			where: {
				toNotifyId: userId
			},
			data: {
				read: true
			}
		});

		const notifications = await Promise.all(
			rawNotifications.map(async (notification) => {
				let tweet = null;
				let account = null;

				if (notification.tweetId) {
					tweet = await tweetService.getTweet(notification.tweetId);
				}

				if (notification.authorId) {
					account = await userService.getUserPer('id', notification.authorId);
				}

				return {
					...notification,
					tweet,
					account
				};
			})
		);

		return notifications;
	}

	async readNotifications(userId: string) {}

	async getUnreadNotificationsNb(userId: string): Promise<number> {
		const count = await prisma.notification.count({
			where: {
				toNotifyId: userId,
				read: false
			}
		});

		return count;
	}
}

export default new NotificationService();
