chrome.storage.local.get(['image'], function(result) {
    document.getElementById('imageDisplay').src = result.image;
    console.log("set image")
});