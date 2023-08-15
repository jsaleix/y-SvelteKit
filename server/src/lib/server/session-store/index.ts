import type { User } from '@prisma/client';
import { randomBytes } from 'node:crypto';

type SessionInfo = {
	id: string;
	email: string;
	username: string;
	displayName: string;
	avatar: string;
	roles: string[];
	invalidAt: number;
};
type Sid = string;

const sessionStore = new Map<Sid, SessionInfo>();

function getSid(): Sid {
	return randomBytes(32).toString('hex');
}

export function createSession(user: User, maxAge: number): string {
	console.log('createSession');
	let sid: Sid = '';
	do {
		sid = getSid();
	} while (sessionStore.has(sid));

	const { username, email, roles, id, avatar, displayName } = user;
	sessionStore.set(sid, {
		id,
		email,
		username,
		displayName,
		avatar,
		roles,
		invalidAt: Date.now() + maxAge
	});

	return sid;
}

export function getSession(sid: Sid): SessionInfo | undefined {
	console.log('getSession called');
	const session = sessionStore.get(sid);
	if (session) {
		if (Date.now() > session.invalidAt) {
			sessionStore.delete(sid);
			return undefined;
		} else {
			return session;
		}
	} else {
		console.error('session not found', sid);
		return undefined;
	}
}

export function deleteSession(sid: Sid): void {
	sessionStore.delete(sid);
}

// cleaning up expired sessions
let nextClean = Date.now() + 1000 * 60 * 60; // 1 hour

function clean() {
	console.log('called');
	const now = Date.now();
	for (const [sid, session] of sessionStore) {
		if (session.invalidAt < now) {
			sessionStore.delete(sid);
		}
	}
	nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
}

if (Date.now() > nextClean) {
	setTimeout(() => {
		clean();
	}, 5000);
}
