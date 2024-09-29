import { getPagesData } from '../../../services/pages-service.js';
import { StoreInstance } from '../store-instance.js';
import type { StoreService } from '../../../services/StoreServiceInterface.js';

const pagesServiceHelper: StoreService = async ({ technicalName }) => {
	const pages = await getPagesData({ technicalName });
	return { [pages.technicalName]: pages.contents };
};

StoreInstance.getInstance().registerStoreOnRoute('/', 'pages-store', pagesServiceHelper, { technicalName: 'home' });
StoreInstance.getInstance().registerStoreOnRoute('/aktuelles', 'pages-store', pagesServiceHelper, { technicalName: 'news' });
StoreInstance.getInstance().registerStoreOnRoute('/ueber', 'pages-store', pagesServiceHelper, { technicalName: 'about' });
StoreInstance.getInstance().registerStoreOnRoute('/impressum', 'pages-store', pagesServiceHelper, { technicalName: 'imprint' });

const DEFAULT_SUBPAGE_COUNT = 10;
for (let index = 0; index < DEFAULT_SUBPAGE_COUNT; index++) {
	// Register 10 subpages
	StoreInstance.getInstance().registerStoreOnRoute(`/aktuelles?page=${index}`, 'pages-store', pagesServiceHelper, { technicalName: 'news' });
}
