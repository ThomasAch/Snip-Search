chrome.storage.local.get(['image'], function(result) {
    document.getElementById('imageDisplay').src = result.image;
    tedddsagds = 1;
    console.log(result);
    setbuttons(result);
});

function setbuttons(imageData) {
    // document.getElementById("googleI").href = "https://images.google.com/searchbyimage?image_url=" + document.getElementById('imageDisplay').src
    var formData = new FormData();

// convert the data URL to a blob
    fetch(imageData)
    .then(response => response.blob())
     .then(blob => {
       // append the blob to the FormData object
        formData.append("image", blob);
    });

    // create a XMLHttpRequest object
var xhr = new XMLHttpRequest();

// set the upload URL for Bing or Google
var uploadUrl = "https://www.bing.com/images/searchbyimage/upload"; // for Bing
// var uploadUrl = "https://images.google.com/searchbyimage/upload"; // for Google

// open a POST request
xhr.open("POST", uploadUrl);

// send the FormData object
xhr.send(formData);

// handle the response
xhr.onload = function() {
  // get the response URL
  var responseUrl = xhr.responseURL;

  // do something with the response URL
  console.log(responseUrl);
};
}