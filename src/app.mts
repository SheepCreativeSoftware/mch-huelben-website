/* @ts-expect-error This is nessecary for server deployment */
if (typeof PhusionPassenger !== 'undefined') PhusionPassenger.configure({ autoInstall: false });

import 'reflect-metadata';
import { buntstift } from 'buntstift';
import { dataSource } from './server/database/datasource.js';
import { getApi } from './server/api/getApi.js';
import http from 'node:http';

const DEFAULT_PORT = 3_000;

const main = async () => {
	// Init Database
	try {
		buntstift.info('Initializing Database...');
		await dataSource.initialize();
		buntstift.success('Database has been initialized!');

		if (await dataSource.showMigrations()) {
			buntstift.info('Running Migrations on Database...');
			await dataSource.runMigrations();
			buntstift.success('Migration on Database finished!');
		}
	} catch (error) {
		if (error instanceof Error) throw new Error(`Error during Database initialization: ${error.message}\n${error.stack ?? ''}`);
	}

	// Init server
	buntstift.info('Starting Server...');
	const server = http.createServer(await getApi());

	let port = process.env.PORT ?? DEFAULT_PORT;
	/* @ts-expect-error This is nessecary for server deployment */
	if (typeof PhusionPassenger !== 'undefined') port = 'passenger';

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
