import { createServer } from 'vite';
import type { ViteDevServer } from 'vite';

const getViteMiddleware = async (): Promise<ViteDevServer> => {
	return await createServer({
		appType: 'custom',
		base: '/',
		logLevel: 'error',
		root: process.cwd(),
		server: {
			middlewareMode: true,
			watch: {
				/*
				 * During tests we edit the files too fast and sometimes chokidar
				 * misses change events, so enforce polling for consistency
				 */
				interval: 100,
				usePolling: true,
			},
		},
	});
};

export { getViteMiddleware };
