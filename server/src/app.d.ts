// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: null | {
				id: string;
				username: string;
				email: string;
				roles: string[];
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
