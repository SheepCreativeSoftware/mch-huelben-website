import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';

export async function render(url: string, mainfest: Record<string, string>) {
	const { app } = createApp();

	/*
	 * Passing SSR context object which will be available via useSSRContext()
	 * @vitejs/plugin-vue injects code into a component's setup() that registers
	 * Itself on ctx.modules. After the render, ctx.modules would contain all the
	 * Components that have been instantiated during this render call.
	 */
	const ctx = {};
	const html = await renderToString(app, ctx);

	return { html, ctx };
}
