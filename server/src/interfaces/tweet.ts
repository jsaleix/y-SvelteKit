export interface Tweet {
	id: string;
	content: string;
	creatorId: string;
	createdAt: Date;
	user: {
		id: string;
		username: string;
		displayName: string | null;
		avatar: string;
	};
	stats: {
		retweets: number;
		likes: number;
	};
}

export interface CreateTweet {
	content: string;
	creatorId: string;
}
