import tweetService from '$lib/server/services/tweet.service.js';
import { isConnected } from '$lib/server/session-store/restriction.js';

export async function POST({ request, locals }) {
	isConnected(locals);
	const data = await request.formData();
	const { content, replyTo } = Object.fromEntries(data.entries()) as {
		content: string;
		replyTo: string | null;
	};

	const tweet = await tweetService.createTweet({
		content,
		creatorId: locals!.user!.id,
		replyTo
	});

	return new Response(JSON.stringify({ tweetId: tweet.id }), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 201
	});
}
