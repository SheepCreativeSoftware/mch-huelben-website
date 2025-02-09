import 'reflect-metadata';
import { buntstift } from 'buntstift';
import { dataSource } from './server/database/datasource.js';
import http from 'node:http';
import { schedule } from 'node-cron';
import { scheduledTaskForRefreshTokenCleanup } from './server/modules/misc/scheduled-tasks.js';

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

	// Load API after database has been initialized -- This prevents issues on site effect imports
	const { getApi } = await import('./server/api/get-api.js');

	// Init server
	buntstift.info('Starting Server...');
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

	const task = schedule('0 */2 * * *', scheduledTaskForRefreshTokenCleanup);
	task.now();
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
