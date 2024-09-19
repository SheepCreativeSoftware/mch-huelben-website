import 'reflect-metadata';
import { buntstift } from 'buntstift';
// Import { dataSource } from './database/datasource.js';
import { getApi } from './api/getApi.js';
import http from 'node:http';

const DEFAULT_PORT = 3_000;

const main = async () => {
	// Init Database
	try {
		// Await dataSource.initialize();
		buntstift.success('Data Source has been initialized!');
	} catch (error) {
		if (error instanceof Error) throw new Error(`Error during Data Source initialization: ${error.message}\n${error.stack ?? ''}`);
	}

	// Init server
	const server = http.createServer(await getApi());

	const port = process.env.PORT ?? DEFAULT_PORT;
	server
		.listen(port, () => {
			buntstift.success(`Server has started and is listening on port: ${port.toString()}`);
		})
		.on('error', (error) => {
			buntstift.error(`Server failed because of ${error.message}`);
			throw error;
		});
};

process.on('uncaughtException', (error, origin) => {
	// Print last output
	buntstift.error(`Caught exception: ${error.message}\n`);
	buntstift.error(`Exception origin: ${origin}`);
	if (error.stack) buntstift.error(`Stack: ${error.stack}`);

	buntstift.error('Exiting Process...');

	// Kill app, because you don't know what the concesquences will be (restart-on-failure from server-side)
	process.exit(1);
});

void main();
