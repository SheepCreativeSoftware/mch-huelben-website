import './store-maping/store-mapping.js';
import { buntstift } from 'buntstift';
import express from 'express';
import { getMetaDataTags } from '../../services/meta-service.js';
import { getViteMiddleware } from '../../middleware/vite.js';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import type { Router } from 'express';
import type { StateTree } from 'pinia';
import { StatusCodes } from 'http-status-codes';
import { StoreInstance } from './store-instance.js';
import type { ViteDevServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

let indexProd = '';
let manifest: Record<string, string[] | undefined> = {};
if (isProduction) {
	indexProd = readFileSync(path.resolve(process.cwd(), 'dist/ssr/client/index.html'), 'utf-8');
	manifest = JSON.parse(readFileSync(
		path.resolve(process.cwd(), 'dist/ssr/client/.vite/ssr-manifest.json'),
		'utf-8',
	));
}

const getSSRRouter = async (): Promise<Router> => {
	// eslint-disable-next-line new-cap -- This is not a constructor
	const router = express.Router();

	let vite: ViteDevServer | null = null;

	if (!isProduction) {
		vite = await getViteMiddleware();
		router.use(vite.middlewares);
	}

	router.use('*', async (req, res, next) => {
		try {
			const url = req.originalUrl;

			let template = '';
			// eslint-disable-next-line init-declarations, no-shadow, @stylistic/max-len -- Typescript cannot infer the type of render in this case
			let render: (url: string, manifest: Record<string, string[] | undefined>, stores: Record<string, StateTree>, user?: Express.User) => Promise<[string, string, RouteLocationNormalizedLoadedGeneric]>;
			if (isProduction) {
				template = indexProd;

				render = (await import(path.resolve(process.cwd(), 'dist', 'ssr', 'server', 'entry-server.js')))
					.entryServer;
			} else {
				if (!vite) throw new Error('Vite is not initialized');
				// Always read fresh template in dev
				template = readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
				template = await vite.transformIndexHtml('/', template);
				render = (await vite.ssrLoadModule(path.resolve(process.cwd(), 'src', 'ssr', 'entry-server.ts')))
					.entryServer;
			}

			const user = req.user;

			const stores = await StoreInstance.getInstance().getStoresForRoute(url);

			const [appHtml, preloadLinks, currentRoute] = await render(url, manifest, stores, user);

			const preloadedMeta = await getMetaDataTags(currentRoute);

			const html = template
				.replace('<!--app-meta-->', preloadedMeta)
				.replace('<!--app-head-->', preloadLinks)
				.replace('<!--app-store-->', `<script type="application/json" id="pinia">${JSON.stringify(stores)}</script>`)
				.replace('<!--app-html-->', appHtml);

			if (currentRoute.name === 'not-found') res.status(StatusCodes.NOT_FOUND).set({ 'Content-Type': 'text/html' }).end(html);
			else if (currentRoute.name === 'could-not-load') res.status(StatusCodes.BAD_REQUEST).set({ 'Content-Type': 'text/html' }).end(html);
			else res.status(StatusCodes.OK).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (error) {
			if (error instanceof Error) buntstift.error(`Error rendering SSR: ${error.message}\n${error.stack}`);
			next(error);
		}
	});

	return router;
};

export { getSSRRouter };
