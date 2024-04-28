import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import BlockWebsiteTab from "../frontend/BlockWebsiteTab.js";
import UsageSummary from "../frontend/UsageSummary.js";
import ProductivityandReminders from "../frontend/ProductivityandReminders.js";

function App() {
  const [activeTab, setActiveTab] = useState("Usage Summary");
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef(null);

  useEffect(() => {
    const activeTabElement = tabsRef.current.querySelector(".active");
    if (activeTabElement) {
      const newTabStyle = {
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      };
      setTabStyle(newTabStyle);
    }
  }, [activeTab]);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>WellQuest Productivity Tracker</p>
      </header>
      <div className="tabs" ref={tabsRef}>
        <div
          title="Usage Summary"
          onClick={() => handleTabClick("Usage Summary")}
          className={activeTab === "Usage Summary" ? "active" : ""}
        >
          <label role="button">
            <span>{"Usage Summary"}</span>
          </label>
        </div>
        <div
          title="Block Website"
          onClick={() => handleTabClick("Block Website")}
          className={activeTab === "Block Website" ? "active" : ""}
        >
          <label role="button">
            <span>{"Block Website"}</span>
          </label>
        </div>
        <div
          title="Habit Tracker"
          onClick={() => handleTabClick("Productivity and Reminders")}
          className={
            activeTab === "Productivity and Reminders" ? "active" : ""
          }
        >
          <label role="button">
            <span>{"Habit Tracker"}</span>
          </label>
        </div>
        <div className="tab-slider" style={tabStyle}></div>
      </div>
      {activeTab === "Usage Summary" && <UsageSummary />}
      {activeTab === "Block Website" && <BlockWebsiteTab />}
      {activeTab === "Productivity and Reminders" && <ProductivityandReminders />}
    </div>
  );
}

export default App;

// import "./App.css";
// import React, { useState } from "react";
// import BlockWebsiteTab from "../frontend/BlockWebsiteTab.js";
// import UsageSummary from "../frontend/UsageSummary.js";
// import ProductivityandReminders from "../frontend/ProductivityandReminders.js";

// function App() {
// 	const [activeTab, setActiveTab] = useState("Usage Summary"); // Set default active tab to "Usage Summary"

// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<p>WellQuest Productivity Tracker</p>
// 			</header>

// 			<div className="tabs">
// 				<ul>
// 					<li
// 						title="Usage Summary"
// 						onClick={() => setActiveTab("Usage Summary")}
// 						className={
// 							activeTab === "Usage Summary" ? "active" : ""
// 						}
// 					>
// 						<label role="button">
// 							<span>{"Usage Summary"}</span>
// 						</label>
// 					</li>
// 					<li
// 						title="Block Website"
// 						onClick={() => setActiveTab("Block Website")}
// 						className={
// 							activeTab === "Block Website" ? "active" : ""
// 						}
// 					>
// 						<label role="button">
// 							<span>{"Block Website"}</span>
// 						</label>
// 					</li>
// 					<li
// 						title="Productivity and Reminders"
// 						onClick={() =>
// 							setActiveTab("Productivity and Reminders")
// 						}
// 						className={
// 							activeTab === "Productivity and Reminders"
// 								? "active"
// 								: ""
// 						}
// 					>
// 						<label role="button">
// 							<span>{"Productivity and Reminders"}</span>
// 						</label>
// 					</li>
// 				</ul>
// 			</div>
// 			{activeTab === "Usage Summary" && <UsageSummary />}
// 			{activeTab === "Block Website" && <BlockWebsiteTab />}
// 			{activeTab === "Productivity and Reminders" && (
// 				<ProductivityandReminders />
// 			)}
// 		</div>
// 	);
// }

// export default App;
