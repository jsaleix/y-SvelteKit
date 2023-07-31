import followService from '$lib/server/services/follow.service';
import { isConnected } from '$lib/server/session-store/restriction';
import type { RouteParams } from './$types';

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
		const { toFollowId } = params;
		if (!toFollowId) {
			throw new Error('User id to follow is required');
		}

		const res = await followService.followUser(locals.user!.id, toFollowId);
		return new Response(JSON.stringify({ follow: res }), {
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
		const { toFollowId } = params;
		if (!toFollowId) {
			throw new Error('User id to follow is required');
		}

		const res = await followService.unfollowUser(locals.user!.id, toFollowId);
		return new Response(null, {
			headers: {
				'Content-Type': 'application/json'
			},
			status: 204
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
