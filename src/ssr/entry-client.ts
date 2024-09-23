import './style.css';
import { createApp } from './main.ts';

const entryClient = async () => {
	const { app, router } = createApp({});

	await router.isReady();
	app.mount('#app');
};

entryClient().catch((error: unknown) => {
	throw new Error('Could not mount app', { cause: error });
});
