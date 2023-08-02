import notificationService from '$lib/server/services/notification.service.js';
import { isConnected } from '$lib/server/session-store/restriction.js';

export const load = async ({ locals }: { locals: App.Locals }) => {
	isConnected(locals, '/i/login');

	const notifications = await notificationService.getNotifications(locals!.user!.id);

	return {
		notifications
	};
};
