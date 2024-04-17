import { TabsRepository } from "./tabRepository.js";

let instance = null;
const STORAGE_KEY = "tabsRepositoryInstance";

async function createAndInitInstance() {
	let repo = new TabsRepository();
	return repo;
}

async function storeInstance(instance) {
	await browser.storage.local.set({
		[STORAGE_KEY]: JSON.stringify(instance),
	});
}

export async function injectTabsRepositorySingleton() {
	if (instance === null) {
		instance = await createAndInitInstance();
		await storeInstance(instance);
	}
	return instance;
}
