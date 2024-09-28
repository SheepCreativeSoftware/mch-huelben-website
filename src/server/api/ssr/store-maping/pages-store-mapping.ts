import { StoreInstance, type StoreService } from '../store-instance.js';
import { InternalServerException } from '../../../modules/misc/custom-errors.js';
import { PagesRepository } from '../../../database/repository/pages-repository.js';
import type { StateTree } from 'pinia';

const getPagesStoreTree: StoreService = async ({ technicalName }): Promise<StateTree> => {
	if (!technicalName) throw new InternalServerException('Technical name is required');

	const page = await PagesRepository.getPageContent(technicalName);
	if (!page) throw new InternalServerException(`Page not found: ${technicalName}`);

	return {
		[technicalName]: page.contents,
	};
};

StoreInstance.getInstance().registerStoreOnRoute('/', 'pages-store', getPagesStoreTree, { technicalName: 'home' });
StoreInstance.getInstance().registerStoreOnRoute('/aktuelles', 'pages-store', getPagesStoreTree, { technicalName: 'news' });
StoreInstance.getInstance().registerStoreOnRoute('/ueber', 'pages-store', getPagesStoreTree, { technicalName: 'about' });
StoreInstance.getInstance().registerStoreOnRoute('/impressum', 'pages-store', getPagesStoreTree, { technicalName: 'imprint' });

const DEFAULT_SUBPAGE_COUNT = 10;
for (let index = 0; index < DEFAULT_SUBPAGE_COUNT; index++) {
	// Register 10 subpages
	StoreInstance.getInstance().registerStoreOnRoute(`/aktuelles?page=${index}`, 'pages-store', getPagesStoreTree, { technicalName: 'news' });
}
