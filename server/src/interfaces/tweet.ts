export interface Tweet {
	id: string;
	content: string;
}

export interface CreateTweet {
	content: string;
	creatorId: string;
}
