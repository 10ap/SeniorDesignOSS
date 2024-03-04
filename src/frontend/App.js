import "./App.css";
import React, { useState, useEffect } from "react";
// import { injectTabsRepositorySingleton } from "../backend/tabs/injectTabRepository.js";
import { PieChart, Pie } from 'recharts';

function App() {
	// const [tabs, setTabs] = useState([]);
	const data2= [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];

	// useEffect(() => {
	// 	const fetchTabs = async () => {
	// 		const repo = await injectTabsRepositorySingleton();
	// 		try {
	// 			const tabsFromRepo = await repo.getTabs();
	// 			setTabs(tabsFromRepo);
	// 		} catch (error) {
	// 			console.error("Error fetching tabs:", error); // Add this line
	// 		}
	// 	};

	// 	fetchTabs();
	// }, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>ECE 49595 0SS Senior Design Project</p>
			</header>
			<p>	List </p>
			<PieChart width={400} height={300}>
				<Pie data={data2} dataKey="students" fill="white" />
			</PieChart>
			console.log(data2);
		</div>
	);
}

export default App;
