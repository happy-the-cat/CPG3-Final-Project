const COOKIE_NAME = "grade";  // change to w.e u want

/******* Sequential function calls *******/
// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// get table cookie and load last table values to table
loadSavedValues();


function navItemsClickHandler() {
    // save table input objects using setCookiedByObject() here
    // check general.js for the list of cookie functions
    const emailContent = document.getElementById("exampleFormControlInput1").value; 
    const textContent = document.getElementById("exampleFormControlTextarea1").value;
    let obj = {
        email: emailContent,
        text: textContent,
    }
    console.log(obj);
    setObjectCookie(COOKIE_NAME, obj);
    alert("Hi");
}

function loadSavedValues() {
    let obj = getObjectCookieByName(COOKIE_NAME);
    // save table input objects using setCookiedByObject() here
    // check general.js for the list of cookie functions
    document.getElementById("exampleFormControlInput1").value = obj.email; 
    document.getElementById("exampleFormControlTextarea1").value = obj.text;
}


// insert other JS here
