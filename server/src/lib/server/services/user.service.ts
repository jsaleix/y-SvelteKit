import prisma from '$lib/assets/images/prisma';
import type { UserProfileI } from '../../../interfaces/profile';

class UserService {
	async getUserPer(key: string, value: string): Promise<UserProfileI> {
		const keys = ['username', 'id', 'email'];
		if (!key) throw new Error('No key provided');
		if (!keys.includes(key)) throw new Error('Invalid key provided');
		const user = (await prisma.user.findUnique({
			where: {
				[key]: value
			},
			select: {
				username: true,
				id: true,
				avatar: true,
				displayName: true
			}
		})) as UserProfileI;
		return user;
	}

	async getUsers() {
		return await prisma.user.findMany({
			select: {
				username: true,
				id: true
			}
		});
	}
}

export default new UserService();
