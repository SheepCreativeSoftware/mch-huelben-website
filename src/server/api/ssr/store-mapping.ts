import { NewsRepository } from '../../database/repository/news-repository';
import type { StateTree } from 'pinia';
import { StoreInstance } from './store-instance';

const DEFAULT_COUNT = 10;

const getNewsStoreTree = async (count?: number): Promise<StateTree> => {
	const news = await NewsRepository.getLatestNews(count);
	const totalCount = await NewsRepository.getNewsTotalCount();
	return {
		news,
		offset: 0,
		totalCount,
	};
};

StoreInstance.getInstance().registerStoreOnRoute('/', 'news-store', getNewsStoreTree, DEFAULT_COUNT);
StoreInstance.getInstance().registerStoreOnRoute('/aktuelles', 'news-store', getNewsStoreTree, DEFAULT_COUNT);
