export interface InteractionI {
	isFollowingYou: boolean;
	areYouFollowing: boolean;
}

export interface FollowsI {
	followersNb: number;
	followingNb: number;
}

export interface UserProfileI {
	id: string;
	username: string;
	displayName: string;
	avatar: string;
}
