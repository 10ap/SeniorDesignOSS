/* eslint-disable no-undef */
import { initTracker } from "./tracker.js";
import { extractHostname } from "./utils.js";
import { getAllBlockedTabs } from "./BlockWebsiteTab.js";
initTracker();

function blockedWebsiteWrapper() {
	setInterval(blockedWebsiteMain, 1000);
}

async function blockedWebsiteMain() {
	const window = await browser.windows.getLastFocused({ populate: true });
	const activeTab = window.tabs?.find((t) => t.active === true);
	if (activeTab === undefined) return;
	const activeDomain = extractHostname(activeTab.url);

	const blockedTabs = getAllBlockedTabs();
	if (blockedTabs.includes(activeDomain)) {
		console.log("Blocked website detected!"); // TODO tell front end to show a message to alert the user.
	}
}

blockedWebsiteWrapper();
