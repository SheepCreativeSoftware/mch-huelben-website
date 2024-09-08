import { basename } from 'node:path';
import { createApp } from './main.ts';
import { renderToString } from 'vue/server-renderer';
import type { SSRContext } from 'vue/server-renderer';

const renderPreloadLink = (file: string): string => {
	if (file.endsWith('.js')) return `<link rel="modulepreload" crossorigin href="${file}">`;
	if (file.endsWith('.css')) return `<link rel="stylesheet" href="${file}">`;
	if (file.endsWith('.woff')) return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
	if (file.endsWith('.woff2')) return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
	if (file.endsWith('.gif')) return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
	if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
	if (file.endsWith('.png')) return ` <link rel="preload" href="${file}" as="image" type="image/png">`;

	return '';
};

const renderPreloadLinks = (modules, manifest) => {
	let links = '';
	const seen = new Set();
	modules.forEach((id) => {
		const files = manifest[id];
		if (files) {
			files.forEach((file) => {
				if (!seen.has(file)) {
					seen.add(file);
					const filename = basename(file);
					if (manifest[filename]) {
						for (const depFile of manifest[filename]) {
							links += renderPreloadLink(depFile);
							seen.add(depFile);
						}
					}
					links += renderPreloadLink(file);
				}
			});
		}
	});
	return links;
};

const entryServer = async function render(url: string, manifest: Record<string, string>) {
	const { app, router } = createApp();

	// Set the router to the desired URL before rendering
	await router.push(url);
	await router.isReady();

	/*
	 * Passing SSR context object which will be available via useSSRContext()
	 * @vitejs/plugin-vue injects code into a component's setup() that registers
	 * itself on ctx.modules. After the render, ctx.modules would contain all the
	 * components that have been instantiated during this render call.
	 */
	const ctx: SSRContext = {};
	const html = await renderToString(app, ctx);

	/*
	 * The SSR manifest generated by Vite contains module -> chunk/asset mapping
	 * which we can then use to determine what files need to be preloaded for this
	 * request.
	 */
	const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
	return [html, preloadLinks];
};

export { entryServer };