import type { NotificationType, Tweet } from '@prisma/client';
import type { UserProfileI } from './profile';

export interface NotificationI {
	id: string;
	toNotify: string;
	type: NotificationType;
	author: UserProfileI | null;
	tweet: Tweet | null;
	read: boolean;
	createdAt: Date;
}
