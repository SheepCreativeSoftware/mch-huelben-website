import type { CorsOptions } from 'cors';

const getCorsConfig = (): CorsOptions => {
	return {
		allowedHeaders: ['Content-Type', 'Authorization'],
		methods: ['GET', 'POST'],
		origin: [process.env.URL ?? true],
	};
};

export { getCorsConfig };
