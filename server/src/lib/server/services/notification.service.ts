import prisma from '$lib/assets/images/prisma';
import { NOTIFICATION_TYPES } from '$lib/constants/notification';
import type { NotificationType } from '@prisma/client';
import tweetService from './tweet.service';
import userService from './user.service';

class NotificationService {
	async createNotification(userId: string, notificationType: NotificationType, entityId?: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user) throw new Error('User not found');

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
					userId: toNotify
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
					accountId: userId,
					userId: toNotify
				}
			});
		}
	}

	async getNotifications(userId: string) {
		const rawNotifications = await prisma.notification.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		await prisma.notification.updateMany({
			where: {
				userId
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

				if (notification.accountId) {
					account = await userService.getUserPer('id', notification.accountId);
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
				userId,
				read: false
			}
		});

		return count;
	}
}

export default new NotificationService();
