// content_script.js
var snipPage = document.getElementById("snipPage");
var snipArea = document.getElementById("snipArea");

snipPage.addEventListener("click", function() {
    // do something to snip the whole page
    console.log("clicked")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.runtime.sendMessage({type: "window-search-btn", tab: tab}, function(response) {})
    });
});

snipArea.addEventListener("click", function() {
    // send a message to the extension
    chrome.runtime.sendMessage("capture", function(response) {
        // handle the response from the extension
    });
});




// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type === 'capture') {
//         chrome.tabs.captureVisibleTab(null, {}, function(dataUri) {
//             var img = new Image();
//             img.onload = function() {
//                 var canvas = document.createElement('canvas');
//                 canvas.width = request.width;
//                 canvas.height = request.height;
//                 var context = canvas.getContext('2d');
//                 context.drawImage(img, request.x, request.y, request.width, request.height, 0, 0, request.width, request.height);
//                 sendResponse({dataUri: canvas.toDataURL('image/png')});
//             };
//             img.src = dataUri;
//         });
//         return true;  // Required to use sendResponse asynchronously.
//     }
// });