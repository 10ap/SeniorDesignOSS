/* eslint-disable no-undef */
import { injectTabsRepositorySingleton } from "./tabs/injectTabRepository.js";
import { Tab } from "./tabs/tabs.js";

let currentObj = {
	tab: Tab,
	activeDomain: "",
};

let activeTab = null;

export async function initTracker() {
	setInterval(trackerFunc, 1000);
}

function extractHostname(url) {
	let hostname;
	if (url === undefined) return "";

	if (url.startsWith("file:")) {
		return url;
	}

	if (url.indexOf("//") > -1) {
		hostname = url.split("/")[2];
	} else {
		hostname = url.split("/")[0];
	}

	hostname = hostname.split(":")[0];
	hostname = hostname.split("?")[0];

	return hostname;
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

	console.log(repo);
}
