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
  // Create a popup window for the extension
  chrome.windows.create(
    {
      url: "popup.html",
      type: "popup",
      width: 300,
      height: 200,
    },
    (window) => {
      // Send a message to the popup window with the tab information
      chrome.tabs.sendMessage(window.tabs[0].id, { tab: tab });
    }
  );
});

// Listen for messages from the popup window
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check the message type
  if (request.type === "capture") {
    // Capture the selected area of the tab
    chrome.tabs.captureVisibleTab(
      request.tab.windowId,
      { format: "png" },
      (image) => {
        // Crop the image according to the selection
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = request.selection.width;
        canvas.height = request.selection.height;
        let imageObj = new Image();
        imageObj.src = image;
        imageObj.onload = () => {
          context.drawImage(
            imageObj,
            request.selection.x,
            request.selection.y,
            request.selection.width,
            request.selection.height,
            0,
            0,
            request.selection.width,
            request.selection.height
          );
          // Create a blob object from the cropped image data
          canvas.toBlob((blob) => {
            // Create a URL for the blob object
            let url = URL.createObjectURL(blob);
            // Download the image using the URL
            chrome.downloads.download({
              url: url,
              filename: "screenshot.png",
            });
          }, "image/png");
        };
      }
    );
  }
});
