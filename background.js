chrome.contextMenus.create({
  id: "open-link",
  title: "Open Link",
  contexts: ["all"], // Show the item on any context
  onclick: function() {
    // Open a new tab in image search
    chrome.tabs.create({url: ""});
  }
});
