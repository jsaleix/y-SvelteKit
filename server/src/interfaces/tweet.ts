export interface Tweet {
	id: string;
	content: string;
	creatorId: string;
	createdAt: Date;
	replyTo?: string | null;
	user: {
		id: string;
		username: string;
		displayName: string | null;
		avatar: string;
	};
	stats: {
		retweets: number;
		likes: number;
		bookmarks: number;
		replies: number;
	};
}

export interface CreateTweet {
	content: string;
	creatorId: string;
	replyTo?: string | null;
}
