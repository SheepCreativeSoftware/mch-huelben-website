import type { StateTree } from 'pinia';

class StoreInstance {
	static #instance: StoreInstance;
	private stores: Record<string, string[]> = {};
	private storeServices: Record<string, (count?: number) => Promise<StateTree>> = {};
	private storeValueCount: Record<string, number> = {};
	static getInstance(): StoreInstance {
		if (typeof StoreInstance.#instance === 'undefined') StoreInstance.#instance = new StoreInstance();

		return StoreInstance.#instance;
	}

	public registerStoreOnRoute(route: string, storeName: string, storeService: (count?: number) => Promise<StateTree>, count?: number): void {
		this.stores[route] = {
			...this.stores[route],
			...[storeName],
		};
		this.storeServices[storeName] = storeService;
		if (typeof count === 'number') this.storeValueCount[storeName] = count;
	}

	public async getStoresForRoute(route: string): Promise<Record<string, StateTree>> {
		const stores: Record<string, StateTree> = {};
		if (typeof this.stores[route] === 'undefined') return stores;
		for (const store of Object.values(this.stores[route])) stores[store] = await this.storeServices[store](this.storeValueCount[store]);

		return stores;
	}
}

export { StoreInstance };
