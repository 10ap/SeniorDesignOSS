// global variable to store the hostname of the tabs and the amount of time spent on each
var HOSTNAMES = {};

async function getCurrentTabHostName() {
	let queryOptions = { lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	if (!tab || !tab.url) {
		return;
	}
	const { hostname } = new URL(tab.url);
	// TODO: find a way to calculate time spent on each tab and store it in the HOSTNAMES object
	HOSTNAMES[hostname] = 0;
	console.log(HOSTNAMES);
	return hostname;
}

getCurrentTabHostName();
