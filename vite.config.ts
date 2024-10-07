import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
		  // Aquí defines los alias
		  '@': '/src',  // Por ejemplo, @ apunta al directorio src,
		  '@services': '/src/services'
		}
	  }
});
