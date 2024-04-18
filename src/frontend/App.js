import "./App.css";
import React, { useState } from "react";
import BlockWebsiteTab from "../frontend/BlockWebsiteTab.js";
import UsageSummary from "../frontend/UsageSummary.js";
import ProductivityandReminders from "../frontend/ProductivityandReminders.js";

function App() {
	const [activeTab, setActiveTab] = useState("Usage Summary"); // Set default active tab to "Usage Summary"

	return (
		<div className="App">
			<header className="App-header">
				<p>WellQuest Productivity Tracker</p>
			</header>

			<div className="tabs">
				<ul>
					<li
						title="Usage Summary"
						onClick={() => setActiveTab("Usage Summary")}
						className={
							activeTab === "Usage Summary" ? "active" : ""
						}
					>
						<label role="button">
							<span>{"Usage Summary"}</span>
						</label>
					</li>
					<li
						title="Block Website"
						onClick={() => setActiveTab("Block Website")}
						className={
							activeTab === "Block Website" ? "active" : ""
						}
					>
						<label role="button">
							<span>{"Block Website"}</span>
						</label>
					</li>
					<li
						title="Productivity and Reminders"
						onClick={() =>
							setActiveTab("Productivity and Reminders")
						}
						className={
							activeTab === "Productivity and Reminders"
								? "active"
								: ""
						}
					>
						<label role="button">
							<span>{"Productivity and Reminders"}</span>
						</label>
					</li>
				</ul>
			</div>
			{activeTab === "Usage Summary" && <UsageSummary />}
			{activeTab === "Block Website" && <BlockWebsiteTab />}
			{activeTab === "Productivity and Reminders" && (
				<ProductivityandReminders />
			)}
		</div>
	);
}

export default App;
