import express from 'express';
import type { Router } from 'express';

const getMainRouter = (): Router => {
	// eslint-disable-next-line new-cap -- This is not a constructor
	const router = express.Router();

	router.get('/hello', (_req, res) => {
		res.send('Hello World!');
	});

	return router;
};

export { getMainRouter };
