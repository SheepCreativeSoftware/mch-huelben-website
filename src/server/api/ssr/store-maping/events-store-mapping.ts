import { getCurrentEvents } from '../../../services/events-service.js';
import { StoreInstance } from '../store-instance.js';

StoreInstance.getInstance().registerStoreOnRoute('/', 'events-store', getCurrentEvents, {});
