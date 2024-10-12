import type { Router } from 'vue-router';

const routeOnError = async (router: Router, error: Error) => {
	const errorCause = error.cause ?? {};
	await router.push({
		path: '/could-not-load',
		query: {
			error: error.message,
			name: error.name,
			url: router.currentRoute.value.fullPath,
			...errorCause,
			stack: error.stack,
		},
		replace: true,
	});
};

export { routeOnError };
