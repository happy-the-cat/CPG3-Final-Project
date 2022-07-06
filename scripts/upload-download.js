// Add click event listener & handler for DOWNLOAD button.
// This handler extracts all the site's cookies into a single object and save it to a JSON file.
document.getElementById("download-btn").addEventListener("click", function(e) {
  let cookies = getCookies();
  let statusField = document.getElementById("download-status");
  if (isEmpty(cookies)) {
    statusField.textContent = "No values to save. Please start inputting first or upload a JSON file containing previous inputs.";
    this.removeAttribute("download");
    statusField.classList.remove("green");
    statusField.classList.add("red");
  } else {
    // Source: https://stackoverflow.com/a/68330734
    this.href = URL.createObjectURL(
      new Blob([JSON.stringify(cookies, null, 2)], {type: "application/json"})
    );
    this.setAttribute("download", "grade-calculator-data.json");
    statusField.textContent = "Downloaded successfully!";
    statusField.classList.add("green");
  }
});


// Click event handler for UPLOAD button.
document.getElementById("form").addEventListener("submit", function(event) {
  // Source: https://gomakethings.com/how-to-upload-and-process-a-json-file-with-vanilla-js/
  const file = document.getElementById("fileInput");
  event.preventDefault();  // prevent default page reload on submit
  // If file is not JSON, set a custom validity and report it to show the message.
  if (!file.value.endsWith(".json")) {
    file.setCustomValidity("Please select a JSON file.");
    file.reportValidity();
    return;
  } 
  // FileReader API allows reading and processing of files' content
  let reader = new FileReader();
	// Said API is asynchronous, thus, requiring an on load event handler to be run
  // everytime it reads a file. Said handler is where we can access the contents of the file read.
	reader.onload = loadFile;
  // Read file. input[type="file"] has a `files` property that returns an array of files selected.
	reader.readAsText(file.files[0]);
});

// FileReader on load event handler. This is also where cookies are updated based 
// on the contents of the file read.
function loadFile(event) {
  // `event.target.result` returns a string of the contents of the file read by the reader.
  const strFileContent = event.target.result;
  const statusField = document.getElementById("upload-status");
  if (!strFileContent.length) {
    statusField.textContent = "Chosen JSON file is empty. Nothing to load.";
    statusField.classList.remove("green");
    statusField.classList.add("red");
  } else {
    const objFileContent = JSON.parse(strFileContent);
    setCookies(objFileContent);
    statusField.textContent = "Load successfully!";
    statusField.classList.remove("red");
    statusField.classList.add("green");    
  }
}


// Event click handler for RESET button.
document.getElementById("reset-btn").addEventListener("click", function(event) {
  const statusField = document.getElementById("reset-status");
  if (confirm("Reset will clear ALL data inputted thus far. Are you sure you want to proceed?")) {
    deleteAllCookies();
    statusField.textContent = "Data cleared!";
    statusField.classList.remove("green");
    statusField.classList.add("red");
  } else {
    statusField.textContent = "Reset data cancelled!";
    statusField.classList.remove("red");
    statusField.classList.add("green"); 
  }
});
