let startTime = 0;
let currentTimeSpent = 0;
let active = false;

function updateTimer(tabId, changeInfo, tab) {
  if (tab.url && tab.url.includes('purdue.brightspace.com')) {
    if (!active) {
      active = true;
      startTime = Date.now();
    }
  } else {
    if (active) {
      currentTimeSpent += Date.now() - startTime;
      console.log(`Time spent on Purdue Brightspace: ${currentTimeSpent / 1000} seconds`);
      active = false; // Reset the activity flag
    }
  }
}

chrome.tabs.onUpdated.addListener(updateTimer);
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    updateTimer(activeInfo.tabId, {}, tab);
  });
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (active) {
      currentTimeSpent += Date.now() - startTime;
      console.log(`Time spent on Purdue Brightspace: ${currentTimeSpent / 1000} seconds`);
      active = false; // Reset the activity flag
    }
  } else {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      if (tabs[0]) {
        updateTimer(tabs[0].id, {}, tabs[0]);
      }
    });
  }
});
