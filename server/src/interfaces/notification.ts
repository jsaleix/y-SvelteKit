import type { NotificationType } from '@prisma/client';
import type { UserProfileI } from './profile';
import type { Tweet } from './tweet';

export interface NotificationI {
	id: string;
	toNotifyId: string;
	type: NotificationType;
	author: UserProfileI | null;
	tweet: Tweet | null;
	read: boolean;
	createdAt: Date;
}
