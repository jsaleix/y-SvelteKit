import likeService from '$lib/server/services/like.service';
import { isConnected } from '$lib/server/session-store/restriction.js';
import type { RouteParams } from '../$types';

export async function POST({
	locals,
	params
}: {
	request: Request;
	locals: App.Locals;
	params: RouteParams;
}) {
	isConnected(locals);
	try {
		const { id } = params;
		if (!id) {
			throw new Error('Tweet id is required');
		}

		const res = await likeService.likeTweet(id, locals.user!.id);
		return new Response(JSON.stringify({ like: res }), {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 201
		});
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message }), {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 400
		});
	}
}

export async function DELETE({
	locals,
	params
}: {
	request: Request;
	locals: App.Locals;
	params: RouteParams;
}) {
	isConnected(locals);
	try {
		const { id } = params;
		if (!id) {
			throw new Error('Tweet id is required');
		}

		const res = await likeService.unlikeTweet(id, locals.user!.id);
		return new Response(JSON.stringify({ like: res }), {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 200
		});
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message }), {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 400
		});
	}
}

export async function GET({
	locals,
	params
}: {
	request: Request;
	locals: App.Locals;
	params: RouteParams;
}) {
	isConnected(locals);
	try {
		const { id } = params;
		if (!id) {
			throw new Error('Tweet id is required');
		}

		const isLiked = await likeService.hasUserLikedTweet(id, locals.user!.id);

		return new Response(JSON.stringify({ isLiked }), {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 200
		});
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message }), {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 400
		});
	}
}
