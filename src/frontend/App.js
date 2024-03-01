import "./App.css";
import React, { useState, useEffect } from "react";
import { injectTabsRepositorySingleton } from "../backend/tabs/injectTabRepository.js";

function App() {
	const [tabs, setTabs] = useState([]);

	useEffect(() => {
		const fetchTabs = async () => {
			const repo = await injectTabsRepositorySingleton();
			try {
				const tabsFromRepo = await repo.getTabs();
				setTabs(tabsFromRepo);
			} catch (error) {
				console.error("Error fetching tabs:", error); // Add this line
			}
		};

		fetchTabs();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>ECE 49595 0SS Senior Design Project</p>
			</header>
			<div></div>
		</div>
	);
}

export default App;
