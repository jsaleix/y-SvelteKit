import bookmarkService from "$lib/server/services/bookmark.service";
import { isConnected } from "$lib/server/session-store/restriction";
import type { RouteParams } from "../$types";

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

		const bookmark = await bookmarkService.bookmarkTweet(locals!.user!.id, id);
		return new Response(JSON.stringify({ bookmark }), {
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

		const res = await bookmarkService.removeBookmark(locals!.user!.id, id);

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
