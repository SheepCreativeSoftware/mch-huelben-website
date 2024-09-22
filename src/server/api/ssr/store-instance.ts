import type { StateTree } from 'pinia';

type StoreService = (count: number, offset?: number) => Promise<StateTree>;

class StoreInstance {
	static #instance: StoreInstance;
	private stores: Record<string, string[]> = {};
	private storeServices: Record<string, Record<string, StoreService>> = {};
	private storeValueCount: Record<string, Record<string, number>> = {};
	private storeValueOffset: Record<string, Record<string, number>> = {};
	static getInstance(): StoreInstance {
		if (typeof StoreInstance.#instance === 'undefined') StoreInstance.#instance = new StoreInstance();

		return StoreInstance.#instance;
	}

	public registerStoreOnRoute(route: string, storeName: string, storeService: StoreService, count: number, offset?: number): void {
		this.stores[route] = {
			...this.stores[route],
			...[storeName],
		};
		if (typeof this.storeServices[route] === 'undefined') this.storeServices[route] = {};
		if (typeof this.storeValueCount[route] === 'undefined') this.storeValueCount[route] = {};
		if (typeof this.storeValueOffset[route] === 'undefined') this.storeValueOffset[route] = {};
		this.storeServices[route][storeName] = storeService;
		this.storeValueCount[route][storeName] = count;
		if (typeof offset === 'number') this.storeValueOffset[route][storeName] = offset;
	}

	public async getStoresForRoute(route: string): Promise<Record<string, StateTree>> {
		const stores: Record<string, StateTree> = {};
		if (typeof this.stores[route] === 'undefined') return stores;
		for (const store of Object.values(this.stores[route])) {
			// Load all data for each store
			stores[store] = await this.storeServices[route][store](this.storeValueCount[route][store], this.storeValueOffset[route][store]);
		};

		return stores;
	}
}

export { StoreInstance };
export type { StoreService };
