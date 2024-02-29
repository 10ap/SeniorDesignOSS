import { TabsRepository } from "./tabRepository.js";

let instanse = null;

async function createAndInitInstance() {
	let repo = new TabsRepository();
	return repo;
}

export async function injectTabsRepositorySingleton() {
	if (instanse == null) {
		instanse = await createAndInitInstance();
	}
	return instanse;
}
