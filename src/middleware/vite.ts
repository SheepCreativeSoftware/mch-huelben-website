/* @ts-expect-error - There is an issue with the module which causes an missing member error */
import { createServer } from 'vite';
/* @ts-expect-error - There is an issue with the module which causes an missing member error */
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
