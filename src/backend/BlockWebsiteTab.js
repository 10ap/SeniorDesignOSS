/* eslint-disable no-undef */
// Define the storage key
const STORAGE_KEY = "blockedTabs";

// Initialize the BlockedTabs array with the value from storage
let BlockedTabs = [];

// Get the value of BlockedTabs from storage and assign it to BlockedTabs
browser.storage.local.get(STORAGE_KEY).then((result) => {
	BlockedTabs = result[STORAGE_KEY] || [];
});

// Function to get all blocked tabs
export function getAllBlockedTabs() {
	return BlockedTabs;
}

// Function to add a blocked tab
export async function addBlockedTab(tab) {
	BlockedTabs.push(tab);
	await browser.storage.local.set({ [STORAGE_KEY]: BlockedTabs });
}

// Function to delete a blocked tab
export async function deleteBlockedTab(index) {
	BlockedTabs.splice(index, 1);
	await browser.storage.local.set({ [STORAGE_KEY]: BlockedTabs });
}

export async function resetBlockedTabs() {
	BlockedTabs = [];
	await browser.storage.local.set({ [STORAGE_KEY]: BlockedTabs });
}
