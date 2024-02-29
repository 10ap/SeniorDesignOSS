import { Tab } from "./tabs.js";

export class TabsRepository {
	constructor() {
		this.tabs = [];
	}

	getTabs() {
		return this.tabs;
	}

	removeAllTabs() {
		this.tabs = [];
	}

	getTab(domain) {
		return this.tabs?.find((x) => x.url === domain);
	}

	async addTab(domain) {
		const newTab = new Tab();
		newTab.init(domain);
		this.tabs.push(newTab);
		return newTab;
	}
}
