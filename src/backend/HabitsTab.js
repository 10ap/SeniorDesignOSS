/* eslint-disable no-undef */
// Define the storage key
const STORAGE_KEY = "habits";

// Initialize the habits array with the value from storage
let habits = [];

// Get the value of habits from storage and assign it to habits
browser.storage.local.get(STORAGE_KEY).then((result) => {
	habits = result[STORAGE_KEY] || [];
});

// Function to get all blocked tabs
export function getAllHabits() {
	return habits;
}

// Function to add a blocked tab
export async function addHabit(tab) {
	habits.push(tab);
	await browser.storage.local.set({ [STORAGE_KEY]: habits });
}

// Function to delete a blocked tab
export async function deleteHabit(index) {
	habits.splice(index, 1);
	await browser.storage.local.set({ [STORAGE_KEY]: habits });
}

export async function resetHabits() {
	habits = [];
	await browser.storage.local.set({ [STORAGE_KEY]: habits });
}

export async function updateHabits(updatedHabits) {
	// find the habit to update
	let habitToUpdate = habits.find(
		(habit) => habit.name === updatedHabits.name
	);
	// update the habit
	habitToUpdate = updatedHabits;
	// update this habit in the habits array
	habits = habits.map((habit) =>
		habit.name === habitToUpdate.name ? habitToUpdate : habit
	);
	await browser.storage.local.set({ [STORAGE_KEY]: habits });
}
