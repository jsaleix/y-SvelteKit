import prisma from '$lib/assets/images/prisma';

class FollowService {
	async followUser(toFollow: string, userId: string) {
		const userFollowing = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!userFollowing) throw new Error('User not found');

		const userToFollow = await prisma.user.findUnique({
			where: {
				id: toFollow
			}
		});

		if (!userToFollow) throw new Error('User not found');

		let follow = await prisma.following.findFirst({
			where: {
				followerId: userId,
				followingId: toFollow
			}
		});

		if (!follow) {
			follow = await prisma.following.create({
				data: {
					followerId: userId,
					followingId: toFollow
				}
			});
		}

		return follow;
	}

	async unfollowUser(toFollow: string, userId: string) {
		const userFollowing = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!userFollowing) throw new Error('User not found');

		const userToFollow = await prisma.user.findUnique({
			where: {
				id: toFollow
			}
		});

		if (!userToFollow) throw new Error('User not found');

		let follow = await prisma.following.findFirst({
			where: {
				followerId: userId,
				followingId: toFollow
			}
		});

		if (follow) {
			follow = await prisma.following.delete({
				where: {
					id: follow.id
				}
			});
		}

		return follow;
	}

	async getFollowers(userId: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user) throw new Error('User not found');

		const followers = await prisma.following.findMany({
			where: {
				followingId: userId
			},
			include: {
				follower: true
			}
		});

		return followers;
	}

	async getFollowersCount(userId: string) {
		const followers = await prisma.following.count({
			where: {
				followingId: userId
			}
		});

		return followers;
	}

	async getFollowingCount(userId: string) {
		const following = await prisma.following.count({
			where: {
				followerId: userId
			}
		});

		return following;
	}

	async getFollowing(userId: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user) throw new Error('User not found');

		const following = await prisma.following.findMany({
			where: {
				followerId: userId
			},
			include: {
				following: true
			}
		});

		return following;
	}

	async isUserFollowing(userId: string, followingId: string) {
		const follow = await prisma.following.findFirst({
			where: {
				followerId: userId,
				followingId
			}
		});

		return !!follow;
	}
}

export default new FollowService();
