import type { StateTree } from 'pinia';

interface StoreServiceOptions {
	count?: number,
	offset?: number,
	technicalName?: string
}
type StoreService = (options: StoreServiceOptions) => Promise<StateTree>;

export type { StoreService, StoreServiceOptions };
