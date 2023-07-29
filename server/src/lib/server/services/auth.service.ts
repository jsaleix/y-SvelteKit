import prisma from '$lib/assets/images/prisma';
import * as bcrypt from 'bcryptjs';

class AuthService {
	async createUser(email: string, username: string, password: string) {
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);
		await prisma.user.create({
			data: {
				email,
				username,
				password,
				displayName: username
			}
		});

		return true;
	}

	async authUser(username: string, password: string) {
		const user = await prisma.user.findFirst({
			where: {
				username
			}
		});
		if (!user) throw new Error('Invalid username or password');

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) throw new Error('Invalid username or password');

		return user;
	}
}

export default new AuthService();
