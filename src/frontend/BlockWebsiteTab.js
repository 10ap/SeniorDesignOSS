import {
	getAllBlockedTabs,
	addBlockedTab,
	deleteBlockedTab,
	resetBlockedTabs,
} from "../backend/BlockWebsiteTab.js";

import React, { Component } from "react";
import "./BlockWebsiteTab.css";

class BlockWebsiteTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blockedTabs: [],
			newTabUrl: "",
		};
	}

	componentDidMount() {
		this.setState({ blockedTabs: getAllBlockedTabs() });
	}

	handleInputChange = (event) => {
		this.setState({ newTabUrl: event.target.value });
	};

	addBlockedTab = (event) => {
		event.preventDefault();
		const { newTabUrl } = this.state;
		if (newTabUrl) {
			addBlockedTab(newTabUrl);
			this.setState({ blockedTabs: getAllBlockedTabs(), newTabUrl: "" });
		}
	};

	removeBlockedTab = (index) => {
		deleteBlockedTab(index);
		this.setState({ blockedTabs: getAllBlockedTabs() });
	};

	resetBlockedTabs = () => {
		resetBlockedTabs();
		this.setState({ blockedTabs: [] });
	};

	render() {
		const { blockedTabs, newTabUrl } = this.state;

		return (
			<div className="BlockWebsiteTab">
				<h2>Block Websites</h2>
				<form onSubmit={this.addBlockedTab}>
					<input
						type="text"
						value={newTabUrl}
						onChange={this.handleInputChange}
						placeholder="Enter website URL"
					/>
					<button type="submit">Add</button>
				</form>
				<ul>
					{blockedTabs.map((tab, index) => (
						<li key={index}>
							{tab}
							<button
								onClick={() => this.removeBlockedTab(index)}
							>
								Remove
							</button>
						</li>
					))}
				</ul>
				<button onClick={this.resetBlockedTabs}>Reset</button>
			</div>
		);
	}
}

export default BlockWebsiteTab;
