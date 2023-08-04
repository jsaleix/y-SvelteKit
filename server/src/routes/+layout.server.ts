import notificationService from '$lib/server/services/notification.service';
import type { Cookies } from '@sveltejs/kit';

export async function load({ locals, cookies }: { locals: App.Locals; cookies: Cookies }) {
	let notificationNb = null;
	if (locals.user) {
		notificationNb = await notificationService.getUnreadNotificationsNb(locals.user.id);
	}
	return { user: locals.user, notificationNb };
}
