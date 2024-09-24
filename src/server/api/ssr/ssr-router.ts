import './store-maping/store-mapping.js';
import { buntstift } from 'buntstift';
import express from 'express';
import { getViteMiddleware } from '../../middleware/vite.js';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import type { Router } from 'express';
import type { StateTree } from 'pinia';
import { StatusCodes } from 'http-status-codes';
import { StoreInstance } from './store-instance.js';

const isProduction = process.env.NODE_ENV === 'production';

let indexProd = '';
const manifest: Record<string, string[] | undefined> = {};
if (isProduction) {
	indexProd = readFileSync(path.resolve(process.cwd(), 'dist/ssr/client/index.html'), 'utf-8');
	JSON.parse(readFileSync(
		path.resolve(process.cwd(), 'dist/ssr/client/.vite/ssr-manifest.json'),
		'utf-8',
	));
}

const getSSRRouter = async (): Promise<Router> => {
	// eslint-disable-next-line new-cap -- This is not a constructor
	const router = express.Router();

	const vite = await getViteMiddleware();

	if (!isProduction) router.use(vite.middlewares);

	router.use('*', async (req, res, next) => {
		try {
			const url = req.originalUrl;

			let template = '';
			// eslint-disable-next-line init-declarations, no-shadow -- Typescript cannot infer the type of render in this case
			let render: (url: string, manifest: Record<string, string[] | undefined>, stores: Record<string, StateTree>) => Promise<[string, string]>;
			if (isProduction) {
				template = indexProd;

				render = (await import(path.resolve(process.cwd(), 'dist', 'ssr', 'server', 'entry-server.js')))
					.entryServer;
			} else {
				// Always read fresh template in dev
				template = readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
				template = await vite.transformIndexHtml('/', template);
				render = (await vite.ssrLoadModule(path.resolve(process.cwd(), 'src', 'ssr', 'entry-server.ts')))
					.entryServer;
			}

			const stores = await StoreInstance.getInstance().getStoresForRoute(url);

			const [appHtml, preloadLinks] = await render(url, manifest, stores);

			const html = template
				.replace('<!--app-head-->', preloadLinks)
				.replace('<!--app-store-->', `<script>window.__pinia = '${JSON.stringify(stores)}';</script>`)
				.replace('<!--app-html-->', appHtml);

			res.status(StatusCodes.OK).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (error) {
			if (error instanceof Error) {
				buntstift.error(`Error rendering SSR: ${error.message}\n${error.stack}`);
				vite.ssrFixStacktrace(error);
			}
			next(error);
		}
	});

	return router;
};

export { getSSRRouter };
