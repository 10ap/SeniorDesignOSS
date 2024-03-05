/* eslint-disable no-undef */
import { injectTabsRepositorySingleton } from "./tabs/injectTabRepository.js";
import { Tab } from "./tabs/tabs.js";
import { extractHostname } from "./utils.js";

let currentObj = {
	tab: Tab,
	activeDomain: "",
};

let activeTab = null;

export async function initTracker() {
	setInterval(trackerFunc, 1000);
}

function isValidPage(tab) {
	if (tab == null || tab === undefined || !tab.url || !tab.id) return false;

	if (
		(!tab.url.startsWith("http:") &&
			!tab.url.startsWith("https:") &&
			!tab.url.startsWith("file:")) ||
		tab.url.startsWith("chrome://") ||
		tab.url.startsWith("chrome-extension://")
	)
		return false;
	return true;
}

async function trackerFunc() {
	const repo = await injectTabsRepositorySingleton();
	const window = await browser.windows.getLastFocused({ populate: true });
	if (window != null) {
		activeTab = window.tabs?.find((t) => t.active === true);
		if (isValidPage(activeTab)) {
			const activeDomain = extractHostname(activeTab.url);
			let tab = repo.getTab(activeDomain);
			if (tab === undefined) {
				tab = await repo.addTab(activeDomain);
			}
			if (currentObj != null) {
				currentObj.tab = tab;
				tab.incCounter();
				currentObj.activeDomain = activeDomain;
				if (tab.favicon === "" && activeTab.favIconUrl !== undefined)
					tab.setFavicon(activeTab.favIconUrl);
			}
		}
	}
	const serializedData = serializeTabRepository(repo);
	chrome.storage.local.set({ tabData: serializedData }, () => {
		if (chrome.runtime.lastError) {
			console.error(
				"Error storing data:",
				chrome.runtime.lastError.message
			);
			return;
		}
	});
}

function serializeTabRepository(tabRepository) {
	const serializedTabs = tabRepository.getTabs().map((tab) => ({
		url: tab.url,
		count: tab.counter,
		favicon: tab.favicon,
	}));

	// Return the serialized data
	return JSON.stringify(serializedTabs);
}
