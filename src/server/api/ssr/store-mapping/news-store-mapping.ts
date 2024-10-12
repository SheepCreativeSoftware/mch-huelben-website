import { getLatestNews } from '../../../services/news-service.js';
import { StoreInstance } from '../store-instance.js';

const DEFAULT_COUNT = 10;

StoreInstance.getInstance().registerStoreOnRoute('/', 'news-store', getLatestNews, { count: DEFAULT_COUNT });
StoreInstance.getInstance().registerStoreOnRoute('/aktuelles', 'news-store', getLatestNews, { count: DEFAULT_COUNT });

const DEFAULT_SUBPAGE_COUNT = 10;
for (let index = 0; index < DEFAULT_SUBPAGE_COUNT; index++) {
	// Register 10 subpages with different store data on news
	const offset = index * DEFAULT_COUNT;
	StoreInstance.getInstance().registerStoreOnRoute(`/aktuelles?page=${index}`, 'news-store', getLatestNews, { count: DEFAULT_COUNT, offset });
}
