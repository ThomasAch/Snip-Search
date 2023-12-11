// content_script.js
var snipPage = document.getElementById("snip-page");
var snipArea = document.getElementById("snip-area");

snipPage.addEventListener("click", function() {
    // do something to snip the whole page
});

snipArea.addEventListener("click", function() {
    // send a message to the extension
    chrome.runtime.sendMessage("capture", function(response) {
        // handle the response from the extension
    });
});
