import type { StoreService, StoreServiceOptions } from '../../services/StoreServiceInterface.js';
import type { StateTree } from 'pinia';

class StoreInstance {
	static #instance: StoreInstance;
	private stores: Record<string, string[]> = {};
	private storeServices: Record<string, Record<string, StoreService>> = {};
	private storeOptions: Record<string, Record<string, StoreServiceOptions>> = {};
	static getInstance(): StoreInstance {
		if (typeof StoreInstance.#instance === 'undefined') StoreInstance.#instance = new StoreInstance();

		return StoreInstance.#instance;
	}

	public registerStoreOnRoute(route: string, storeName: string, storeService: StoreService, options: StoreServiceOptions): void {
		if (typeof this.stores[route] === 'undefined') this.stores[route] = [];
		this.stores[route] = [
			...this.stores[route],
			...[storeName],
		];
		if (typeof this.storeServices[route] === 'undefined') this.storeServices[route] = {};
		if (typeof this.storeOptions[route] === 'undefined') this.storeOptions[route] = {};
		this.storeServices[route][storeName] = storeService;
		this.storeOptions[route][storeName] = options;
	}

	public async getStoresForRoute(route: string): Promise<Record<string, StateTree>> {
		const stores: Record<string, StateTree> = {};
		if (typeof this.stores[route] === 'undefined') return stores;
		for (const store of Object.values(this.stores[route])) {
			// Load all data for each store
			stores[store] = await this.storeServices[route][store](this.storeOptions[route][store]);
		};

		return stores;
	}
}

export { StoreInstance };
