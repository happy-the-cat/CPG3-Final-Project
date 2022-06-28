// This function handles the w3-include-html attribute and imports the specified 
// html into the html document where it was called.
// Source: https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
  let elements, i, element, filename, xhttp;
  // Loop through each HTML elements
  elements = document.getElementsByTagName("*");
  for (i = 0; i < elements.length; i++) {
    element = elements[i];
    // Check if the element has the specified attribute
    filename = element.getAttribute("w3-include-html");
    if (filename) {
      // If true, make HTTP request with the attribute value as the filename
      xhttp = new XMLHttpRequest();
      // Set the XMLHttpRequest.onreadystatechange event handler property.
      // This is triggered whenever XMLHttpRequest.readyState property changes.
      xhttp.onreadystatechange = function() {
        // XMLHttpRequest.readyState property returns the state of the XMLHttpRequest
        // Docu: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if (this.readyState == 4) {  // 4 for DONE state
          // XMLHttpRequest.status property returns the numerical HTTP response status codes
          // If OK or SUCCESS (200), change content of element to the received text from the HTTP request
          if (this.status == 200) {
            element.innerHTML = this.responseText;
          }
          // If NOT FOUND (404)
          if (this.status == 404) {
            element.innerHTML = "Navigation bar not found.";
          }
          // Remove the attribute, and call this function again for succeeding elements with that attribute
          element.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      // Initialize new HTTP request and send request
      xhttp.open("GET", filename, true);  // method, url, async
      xhttp.send();
      return;
    }
  }
}

// Allows active nav item to be set dynamically
function toggleActiveNavLinks() {
 
}
