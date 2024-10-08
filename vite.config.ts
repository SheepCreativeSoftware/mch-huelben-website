import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		copyPublicDir: false,
		minify: true,
	},
	define: {
		'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.URL),
	},
	plugins: [vue()],
});
