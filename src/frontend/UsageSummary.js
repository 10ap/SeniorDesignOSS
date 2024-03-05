/* eslint-disable no-undef */ 
import React, { Component } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import "./UsageSummary.css";

function deserializeTabRepository(serializedData) {
	const deserializedTabs = JSON.parse(serializedData).map(
		(serializedTab) => ({
			url: serializedTab.url,
			counter: serializedTab.count,
			favicon: serializedTab.favicon,
		})
	);

	// Return the deserialized data
	return deserializedTabs;
}

class UsageSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			colors: {}, // Mapping between URL and color
			usedColors: new Set(), // Set of used colors
		};
	}

	componentDidMount() {
		this.interval = setInterval(this.getData, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getData = async () => {
		chrome.storage.local.get("tabData", (result) => {
			if (chrome.runtime.lastError) {
				console.error(
					"Error retrieving data:",
					chrome.runtime.lastError.message
				);
				return;
			}
			const tabData = result.tabData;
			const deserializedData = deserializeTabRepository(tabData);

			// Update the component state with the retrieved data
			this.setState((prevState) => {
				// Update colors for existing URLs and assign new colors for new URLs
				const newData = deserializedData.map((entry) => {
					let color = prevState.colors[entry.url];
					if (!color) {
						color = this.generateUniqueColor(prevState.usedColors);
						prevState.colors[entry.url] = color;
					}
					return { ...entry, color };
				});

				return { data: newData };
			});
		});
	};

	// Generate a unique color not already used
	generateUniqueColor = (usedColors) => {
		let color;
		do {
			color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
		} while (usedColors.has(color));
		usedColors.add(color);
		return color;
	};

	render() {
		const { data } = this.state;

		if (!Array.isArray(data)) {
			return <div>No data available</div>; // Render a message or placeholder
		}

		return (
			<div className="usage-summary-container">
				<h2>Usage Summary</h2>
				<div className="pie-chart-and-table-container">
					<div className="pie-chart-container">
						<PieChart width={400} height={400}>
							<Pie
								data={data}
								dataKey="counter"
								nameKey="url"
								cx="50%"
								cy="50%"
								legendType="circle"
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.color}
									/>
								))}
							</Pie>
							<Legend />
							<Tooltip />
						</PieChart>
					</div>
					<div className="table-container">
						<table>
							<thead>
								<tr>
									<th>URL</th>
									<th>Time Spent (seconds)</th>
								</tr>
							</thead>
							<tbody>
								{data.map((entry, index) => (
									<tr key={`row-${index}`}>
										<td>{entry.url}</td>
										<td>{entry.counter}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default UsageSummary;
