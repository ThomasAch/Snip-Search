chrome.contextMenus.create({
  id: "open-link",
  title: "Open Link",
  contexts: ["all"], // Show the item on any context
  onclick: function() {
    // Open a new tab in image search
    chrome.tabs.create({url: ""});
  }
});

// Add an event listener to the extension icon
chrome.action.onClicked.addListener((tab) => {
  // Capture the visible area of the current tab
  chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" }, (image) => {
    // Create a blob object from the image data
    let blob = new Blob([image], { type: "image/png" });
    // Create a URL for the blob object
    let url = URL.createObjectURL(blob);
    // Download the image using the URL
    chrome.downloads.download({ url: url, filename: "screenshot.png" });
  });
});
