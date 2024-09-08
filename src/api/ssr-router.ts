import express from 'express';
import { readFileSync } from 'node:fs';
import { getViteMiddleware } from '../middleware/vite.ts';
import path from 'node:path';
import type { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const isProduction = process.env.NODE_ENV === 'production';

let indexProd = '';
const manifest = {};
if (isProduction) {
	indexProd = readFileSync(path.resolve('dist/client/index.html'), 'utf-8');
	JSON.parse(readFileSync(
		path.resolve('dist/client/.vite/ssr-manifest.json'),
		'utf-8',
	));
}

const getSSRRouter = async (): Promise<Router> => {
	// eslint-disable-next-line new-cap
	const router = express.Router();

	const vite = await getViteMiddleware();

	if (!isProduction) router.use(vite.middlewares);

	router.use('*', async (req, res, next) => {
		try {
			const url = req.originalUrl;

			let template = '';
			let render;
			if (isProduction) {
				template = indexProd;

				// @ts-expect-error - This is a import from a file that is only available in production
				render = (await import(path.resolve(import.meta.dirname, '..', '..', 'dist', 'server-side-rendering', 'entry-server.js'))).entryServer;
			} else {
				// Always read fresh template in dev
				template = readFileSync(path.resolve(import.meta.dirname, '..', '..', 'index.html'), 'utf-8');
				template = await vite.transformIndexHtml('/', template);
				render = (await vite.ssrLoadModule(path.resolve(import.meta.dirname, '..', 'server-side-rendering', 'entry-server.ts'))).entryServer;
			}

			const [appHtml, preloadLinks] = await render(url, manifest);

			const html = template.
				replace('<!--preload-links-->', preloadLinks).
				replace('<!--app-html-->', appHtml);

			res.status(StatusCodes.OK).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (error) {
			if (error instanceof Error) vite.ssrFixStacktrace(error);
			next(error);
		}
	});

	return router;
};

export { getSSRRouter };
