/********************************** CONSTANTS **********************************/
const COOKIE_NAME = "grade";  // change to w.e u want

/**************************** Sequential function calls *************************/
// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements
loadSavedValues();


function navItemsClickHandler() {
    // replace with ur codes to save table input objects using setCookiedByObject() here
    // check general.js for the list of cookie functions
    const emailContent = document.getElementById("exampleFormControlInput1").value; 
    const textContent = document.getElementById("exampleFormControlTextarea1").value;
    let obj = {
        email: emailContent,
        text: textContent,
    }
    console.log(obj);
    setObjectCookie(COOKIE_NAME, obj);
}

function loadSavedValues() {
    let obj = getObjectCookieByName(COOKIE_NAME);
    // replace with ur codes to load the last saved table contents (saved in an object) here
    // check general.js for the list of cookie functions
    document.getElementById("exampleFormControlInput1").value = obj.email; 
    document.getElementById("exampleFormControlTextarea1").value = obj.text;
}


// insert other JS here
