declare namespace App {
	interface Locals {
		user?: null | {
			id: string;
			username: string;
			email: string;
			roles: string[];
		};
	}
}
