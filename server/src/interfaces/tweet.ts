export interface Tweet {
	id: string;
	content: string;
	creatorId: string;
	createdAt: Date;
	replyTo?: string | null;
	retweetOf?: string | null;
	user: {
		id: string;
		username: string;
		displayName: string | null;
		avatar: string;
	};
	stats: TweetStatsI;
}

export interface CreateTweet {
	content: string;
	creatorId: string;
	replyTo?: string | null;
}

export interface createRetweet {
	creatorId: string;
	retweetOf: string;
	content: string;
}

export interface TweetStatsI {
	retweets: number;
	likes: number;
	bookmarks: number;
	replies: number;
}
