/// <reference types="vite/client" />

/*
 * Declare module '*.vue' {
 * 	import type { DefineComponent } from 'vue';
 * 	// eslint-disable-next-line init-declarations, @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any -- ignore errors because it is needed for vue files
 * 	const component: DefineComponent<{}, {}, any>;
 * 	export default component;
 * }
 */

// Works correctly
export { };

declare module '*.vue' {
	interface ComponentCustomProperties {
		$translate: (key: string) => string
	}
}
