import tweetService from '$lib/server/services/tweet.service';
import { isConnected } from '$lib/server/session-store/restriction';

export async function DELETE({ params, locals }) {
	isConnected(locals);
	const { id } = params;

	const tweet = await tweetService.getTweet(id);

	if (tweet.creatorId !== locals!.user!.id) {
		return new Response(null, {
			status: 403
		});
	}

	await tweetService.deleteTweet(id);

	return new Response(null, {
		status: 204
	});
}
