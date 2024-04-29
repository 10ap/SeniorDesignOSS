/* eslint-disable no-undef */
import { initTracker } from "./tracker.js";
import { extractHostname } from "./utils.js";
initTracker();

function blockedWebsiteWrapper() {
	setInterval(blockedWebsiteMain, 1000);
}

async function blockedWebsiteMain() {
	const window = await browser.windows.getLastFocused({ populate: true });
	const activeTab = window.tabs?.find((t) => t.active === true);
	if (activeTab === undefined) return;
	let activeDomain = extractHostname(activeTab.url);
	let blockedTabs = [];
	let blockedTabsArray = await browser.storage.local.get("blockedTabs");
	// strip www. from the domain if present
	activeDomain = activeDomain.replace(/^www\./, "");
	console.log(blockedTabsArray);
	if (blockedTabsArray === undefined) {
		blockedTabs = [];
	} else {
		blockedTabs = blockedTabsArray["blockedTabs"];
		if (blockedTabs !== undefined && blockedTabs.includes(activeDomain)) {
			browser.tabs.remove(activeTab.id);
		}
	}
}

blockedWebsiteWrapper();
