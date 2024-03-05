import "./App.css";
import React, { useState } from "react";
import BlockWebsiteTab from "../frontend/BlockWebsiteTab.js";
import UsageSummary from "../frontend/UsageSummary.js";

function App() {
	const [activeTab, setActiveTab] = useState(null);

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
					>
						<label role="button">
							<span>{"Usage Summary"}</span>
						</label>
					</li>
					<li
						title="Block Website"
						onClick={() => setActiveTab("Block Website")}
					>
						<label role="button">
							<span>{"Block Website"}</span>
						</label>
					</li>
				</ul>
			</div>
			{activeTab === "Usage Summary" && <UsageSummary />}
			{activeTab === "Block Website" && <BlockWebsiteTab />}
		</div>
	);
}

export default App;
