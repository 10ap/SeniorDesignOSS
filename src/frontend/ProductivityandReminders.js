import React, { Component } from "react";
import "./ProductivityandReminders.css";
import {
	getAllHabits,
	addHabit,
	updateHabits,
	deleteHabit,
	resetHabits,
} from "../backend/HabitsTab";

class ProductivityandReminders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			habits: [], // List of habits
			newHabitName: "", // Input for habit name
			measurementType: "count", // Default measurement type
			totalTime: 0, // totalTime for time-based habits
			totalCount: 0, // totalCount for count-based habits
		};
	}

	componentDidMount() {
		this.setState({ habits: getAllHabits() });
	}

	// Handle input change for habit name
	handleHabitNameChange = (event) => {
		this.setState({ newHabitName: event.target.value });
	};

	// Handle measurement type change (count or time)
	handleMeasurementTypeChange = (event) => {
		this.setState({ measurementType: event.target.value });
	};

	// Add a new habit to the list
	addHabit = (event) => {
		event.preventDefault();
		// don't let the user add empty habit
		if (!this.state.newHabitName) {
			return;
		}
		// check if the habit already exists
		if (
			this.state.habits.some(
				(habit) => habit.name === this.state.newHabitName
			)
		) {
			return;
		}

		const { newHabitName, measurementType } = this.state;
		let newHabit = {};
		if (measurementType === "time") {
			newHabit = {
				name: newHabitName,
				measurementType,
				totalTime: this.state.totalTime, // Initialize totalTime to 0
			};
		} else {
			newHabit = {
				name: newHabitName,
				measurementType,
				totalCount: this.state.totalCount, // Initialize count to 0
			};
		}
		// add to habits in state and clear all the other states
		this.setState(() => ({
			newHabitName: "",
			measurementType: "count",
			totalTime: 0,
			totalCount: 0,
		}));
		addHabit(newHabit);
	};

	// Increment the count for a habit
	incrementCount = (habitIndex) => {
		this.setState((prevState) => {
			const updatedHabits = [...prevState.habits];
			updatedHabits[habitIndex].totalCount -= 1;
			if (updatedHabits[habitIndex].totalCount === 0) {
				// remove the habit if the count reaches 0
				updatedHabits.splice(habitIndex, 1);
				deleteHabit(habitIndex);
			}
			updateHabits(updatedHabits);
			return { habits: updatedHabits };
		});
	};

	// Decrement the count for a habit
	decrementCount = (habitIndex) => {
		this.setState((prevState) => {
			const updatedHabits = [...prevState.habits];
			updatedHabits[habitIndex].totalCount += 1;
			updateHabits(updatedHabits);
			return { habits: updatedHabits };
		});
	};

	resetHabits = () => {
		resetHabits();
		this.setState({ habits: [] });
	};

	// Render the component
	render() {
		const { habits, newHabitName, measurementType } = this.state;

		return (
			<div className="productivity-container">
				<h1>Productivity and Reminders</h1>
				<div>
					<input
						type="text"
						placeholder="Enter habit name"
						value={newHabitName}
						onChange={this.handleHabitNameChange}
					/>
					<select
						value={measurementType}
						onChange={this.handleMeasurementTypeChange}
					>
						<option value="count">Count</option>
						<option value="time">Time</option>
					</select>
					{/* create a number to count down from or a total time to decrement from depending on the option above */}
					<input
						type="number"
						value={
							measurementType === "time"
								? this.state.totalTime
								: this.state.totalCount
						}
						// create an on change function to set the state of the total time or total count depending on the option above
						onChange={(e) => {
							if (measurementType === "time") {
								this.setState({
									totalTime: Number(e.target.value),
								});
							} else {
								this.setState({
									totalCount: Number(e.target.value),
								});
							}
						}}
					/>
					<button onClick={this.addHabit}>Add Habit</button>
				</div>
				<ul>
					{habits.map((habit, index) => (
						<li key={index}>
							{habit.name}
							{/* display the totalTime or totalCount  based on the habit.measurementType*/}
							(
							{habit.measurementType === "count"
								? `Remaining Count: ${habit.totalCount}`
								: `Time: ${habit.totalTime} seconds`}
							)
							{habit.measurementType === "count" && (
								<div>
									<button
										className="increment-button"
										onClick={() =>
											this.incrementCount(index)
										}
									>
										Increment Count
									</button>
									<button
										className="decrement-button"
										onClick={() =>
											this.decrementCount(index)
										}
									>
										Decrement Count
									</button>
								</div>
							)}
							{habit.measurementType === "time" && (
								<div>
									{/* create a start button to decerement the time once every second and then remove the habit*/}
									<button
										className="start-button"
										onClick={() => {
											const interval = setInterval(() => {
												this.setState((prevState) => {
													const updatedHabits = [
														...prevState.habits,
													];
													updatedHabits[
														index
													].totalTime -= 1;
													return {
														habits: updatedHabits,
													};
												});
											}, 1000);
											setTimeout(() => {
												clearInterval(interval);
											}, habit.totalTime * 1000);
											// remove the habit after the time is up
											setTimeout(() => {
												this.setState((prevState) => {
													const updatedHabits = [
														...prevState.habits,
													];
													updatedHabits.splice(
														index,
														1
													);
													return {
														habits: updatedHabits,
													};
												});
											}, habit.totalTime * 1000);
										}}
									>
										Start Timer
									</button>
								</div>
							)}
						</li>
					))}
				</ul>
				<button onClick={this.resetHabits}>Reset</button>
			</div>
		);
	}
}

export default ProductivityandReminders;
