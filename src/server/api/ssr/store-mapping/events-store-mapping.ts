import { getCurrentEvents } from '../../../services/events-service.js';
import { StoreInstance } from '../store-instance.js';
import type { StoreService } from '../../../services/StoreServiceInterface.js';

const eventsStoreHelper: StoreService = async () => {
	const events = await getCurrentEvents();
	return {
		events,
	};
};

StoreInstance.getInstance().registerStoreOnRoute('/', 'events-store', eventsStoreHelper, {});
