console.log("hii")

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
    id: "window-search",
    title: "Window Search",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "window-search") {
    console.log("clicked")
    console.log(chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: captureScreenshot,
    }));
  }
});

function captureScreenshot() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.drawWindow(window, 0, 0, window.innerWidth, window.innerHeight, 'rgb(255,255,255)');
  return canvas.toDataURL();
}