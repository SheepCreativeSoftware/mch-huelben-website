import { StoreInstance, type StoreService } from '../store-instance.js';
import { NewsRepository } from '../../../database/repository/news-repository.js';
import type { StateTree } from 'pinia';

const DEFAULT_COUNT = 10;

const getNewsStoreTree: StoreService = async (count?: number, offset?: number): Promise<StateTree> => {
	const news = await NewsRepository.getLatestNews(count, offset);
	return {
		...news,
		offset: offset ?? 0,
	};
};

StoreInstance.getInstance().registerStoreOnRoute('/', 'news-store', getNewsStoreTree, DEFAULT_COUNT);
StoreInstance.getInstance().registerStoreOnRoute('/aktuelles', 'news-store', getNewsStoreTree, DEFAULT_COUNT);

const DEFAULT_SUBPAGE_COUNT = 10;
for (let index = 0; index < DEFAULT_SUBPAGE_COUNT; index++) {
	// Register 10 subpages with different store data on news
	const offset = index * DEFAULT_COUNT;
	StoreInstance.getInstance().registerStoreOnRoute(`/aktuelles?page=${index}`, 'news-store', getNewsStoreTree, DEFAULT_COUNT, offset);
}
