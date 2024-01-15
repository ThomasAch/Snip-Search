console.log("hi")

chrome.contextMenus.create({
  id: "reverse-search",
  title: "Reverse Image Search",
  contexts: ["image"]
});

chrome.contextMenus.create({
  id: "snip-search",
  title: "Snip Search",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "window-search",
  title: "Window Search",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function() {
  //handle context menu actions
 })