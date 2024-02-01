// Communicate with the background script to get the current time spent
chrome.runtime.getBackgroundPage(backgroundPage => {
    const time = backgroundPage.currentTimeSpent / 1000; // Convert ms to seconds
    document.getElementById('time').textContent = `Time spent: ${time} seconds`;
  });
  