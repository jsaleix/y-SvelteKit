import { writable } from 'svelte/store';

export const authUser = writable<null | App.Locals['user']>(null);
