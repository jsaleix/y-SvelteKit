import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['styled-system']
		},
		host: '0.0.0.0',
		port: 8080,
		watch: {
			usePolling: true
		}
	},
	preview: {
		host: '0.0.0.0',
		port: 8080
	}
});
