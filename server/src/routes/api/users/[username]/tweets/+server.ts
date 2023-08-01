import tweetService from '$lib/server/services/tweet.service.js';
import userService from '$lib/server/services/user.service.js';
import type { Tweet } from '../../../../../interfaces/tweet.js';

enum Scopes {
	'all',
	'without_replies'
}

export async function GET({ locals, params, url }) {
	const user = await userService.getUserPer('username', params.username);
	if (!user) {
		return new Response(null, {
			status: 404
		});
	}

	let scope = url.searchParams.get('scope');
	if (!scope || !Object.values(Scopes).includes(scope as any)) {
		scope = 'all';
	}

	let skip = url.searchParams.get('skip') ?? 0;
	let take = url.searchParams.get('take') ?? 10;

	if (isNaN(+skip) || isNaN(+take)) {
		return new Response(null, {
			status: 400
		});
	}

	let tweets: Tweet[] = [];

	switch (scope) {
		case 'all':
			tweets = await tweetService.getTweets(user.id, +skip, +take);
			break;
		case 'without_replies':
			tweets = await tweetService.getTweetsWithoutReplies(user.id, +skip, +take);
			break;
	}

	return new Response(JSON.stringify({ tweets }), {
		status: 200
	});
}
