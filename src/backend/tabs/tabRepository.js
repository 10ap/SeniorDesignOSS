/* eslint-disable no-undef */
import { Tab } from "./tabs.js";

const STORAGE_KEY = "Tabs";

export class TabsRepository {
	constructor() {
		this.tabs = [];
	}

	getTabs() {
		return this.tabs;
	}

	async removeAllTabs() {
		this.tabs = [];
		await this.saveTabs();
	}

	getTab(domain) {
		return this.tabs?.find((x) => x.url === domain);
	}

	async addTab(domain) {
		const newTab = new Tab();
		newTab.init(domain);
		this.tabs.push(newTab);
		await this.saveTabs();
		return newTab;
	}

	async saveTabs() {
		await browser.storage.local.set({
			[STORAGE_KEY]: JSON.stringify(this.tabs),
		});
	}

	async loadTabs() {
		const tabsData = await browser.storage.local.get(STORAGE_KEY);
		this.tabs = tabsData ? JSON.parse(tabsData) : [];
	}
}
