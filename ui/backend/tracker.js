import * as Browser from "/webextension-polyfill/dist/browser-polyfill.js";

export async function initTracker() {
	setInterval(trackerFunc, 1000);
}

async function trackerFunc() {
	const tabs = await Browser.tabs.query({
		active: true,
		currentWindow: true,
	});
	const window = await Browser.windows.getLastFocused({ populate: true });
	console.log(tabs);
	console.log(window);
}
