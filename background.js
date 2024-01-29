console.log("hib")

//context menu buttons and id's
chrome.contextMenus.create({
  id: "reverse-search",
  title: "Reverse Image Search",
  contexts: ["image"] //context button only shows up when rightclicked img
});
chrome.contextMenus.create({
  id: "snip-search",
  title: "Snip Search",
  contexts: ["all"]
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "window-search-contextMenu",
    title: "Window Search",
    contexts: ["all"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "window-search-contextMenu") {
    console.log("clicked")
    // Take a screenshot of the current tab
    windowSearch(tab);
  }
});

// Listen for a message from the content script.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "window-search-btn") {
      // Perform an action here.
      console.log('Button was clicked in the content script.');
      windowSearch(request.tab);
      // Send a response back to the content script.
      sendResponse({message: 'Background script received the button click.'});
  }
});

function windowSearch(tab){
  chrome.tabs.captureVisibleTab(tab.windowId, (screenshotURL) => {
    chrome.storage.local.set({image: screenshotURL}, function() {
      console.log('Image saved locally');
  });
  chrome.tabs.create({url: chrome.runtime.getURL('LinkPage.html'), active: true});
    // Save the screenshot to the user's Downloads folder
    // chrome.tabs.create({ url: screenshotURL });
  });
}

// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//   if (info.menuItemId === "window-search") {
//     console.log("clicked")
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: captureScreenshot,
//     });
//   }
// });

// function captureScreenshot() {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   context.drawWindow(window, 0, 0, window.innerWidth, window.innerHeight, 'rgb(255,255,255)');
//   return canvas.toDataURL();
// }
