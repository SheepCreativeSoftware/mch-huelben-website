
import { initDatabase } from './modules/database/initDefaultDatabase.mjs';
import { startServer } from './server.mjs';

const startup = async () => {
	// Setup defaults first and then start server
	await initDatabase();
	startServer();
};

startup();
