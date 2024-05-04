## User Manual

### Table of Contents
1. [Introduction](#Introduction)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Features](#Features)
5. [Troubleshooting](#Troubleshooting)
6. [Contributing to the Project](#Contributing-to-the-Project)

### Introduction
WellQuest is an open-source software project that aims to improve productivity apps with health features. It works perfectly with existing productivity tools, providing users with a complete solution for successful time management and well-being. This user manual gives an overview of the project, the installation process, the ideal usage and some insight on its features.

### Installation

1. Clone the repository.
2. Run `npm install --legacy-peer-deps` to install dependencies.
3. Run `npm run build` to create the service worker.
4. Enable developer mode in your browser. by going to `chrome://extensions/` and toggling the switch.
5. Click on Load unpacked and select the folder containing the `manifest.json` file.

- Extension Pane:
This is what the extension pane looks like with the WellQuestExtension 
![Extension Screenshot](https://github.com/10ap/WellQuest/blob/master/src/userManualScreenshots/Extensions.png)

- Usage Summary Tab:
Click on the usage summary tab to get your browser summary 
![Usage Summary](https://github.com/10ap/WellQuest/blob/master/src/userManualScreenshots/UsageSummary.png)

- Block Websites Tab:
Example of how to enter a domain name so that it is blocked
![Block Websites](https://github.com/10ap/WellQuest/blob/master/src/userManualScreenshots/BlockWebsite.png)

- Habit Tracker:
Enter the count/ time you want for your customised habit
![Habit Tracker](https://github.com/10ap/WellQuest/blob/master/src/userManualScreenshots/HabitTracker.png)

### Usage

1. Open a new tab in your browser or in your current tab click on the extension from extensions sidebar.
2. Defualt pop-up would be the `Usage Summary` page.
3. Look at the pie chart and the table to see the usage summary for each website along with time spent on each website.
4. Click on the `Block Website` button to see a form to temporarily block a wesite.
5. Click on the `Productivity and Reminders` page to see a form to set reminders and productivity goals.

### Features

1. Usage Summary
2. Block Website
3. Productivity and Reminders
4. Service Worker


### Troubleshooting
1. If the extension is not working, try reloading the extension by going to `chrome://extensions/` and clicking on the reload button.
2. If the extension is still not working, try restarting your browser.
3. If the extension is still not working, try running `npm run build` again. and re-installing the extension.


### Contributing to the Project
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Push your changes to your fork.
5. Create a pull request.
