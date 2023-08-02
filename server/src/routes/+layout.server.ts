import notificationService from '$lib/server/services/notification.service';

export async function load({ locals }) {
	let notificationNb = null;

	if (locals.user) {
		notificationNb = await notificationService.getUnreadNotificationsNb(locals.user.id);
	}
	return { user: locals.user, notificationNb };
}
