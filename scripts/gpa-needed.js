/***************************** CONSTANTS & OBJETCS *****************************/
const COOKIE_NAME = "gpaNeeded"; // change to w.e u want

class GPANeeded {

  constructor(cgpaDesired, cgpaCurrent, unitsEarned, unitsLeft) {
    Object.assign(this, {
      cgpaDesired, cgpaCurrent, unitsEarned, unitsLeft
    });
  }

  calculate() {
    // Check if every value of this object is NOT null, NOT empty and IS a numeric.
    // Source: https://stackoverflow.com/a/49427583
    if (Object.values(this).every(val => val !== null && val !== '' && !isNaN(val))) {
      const gpa = (this.cgpaDesired * (this.unitsEarned + this.unitsLeft) - 
                   this.unitsEarned * this.cgpaCurrent) / this.unitsLeft;
      if (gpa > 4) return "Not achievable 😥";
      else return gpa.toFixed(3);;
    } 
    else {
      throw "Some of the parameters are either undefined, empty, or not a number!"
    } 
  }

}

/**
 * create object for table
 * make a get all and set all/update function
 * make new function to calculate
 * update navitems click handler
 * update load
 * call calculate funciton on Calculate button click/onsubmit
 * 
 * guide:
 *  add help instructions
 *  style it
 * 
 * CSS:
 * style result texts
 * edit smaller screens results padding
 * button? (no need)
 */

/**************************** Sequential function calls *************************/
// Instantiate GPANeeded
const gpaNeeded = new GPANeeded();

// Get Form & Results Field
const form = document.getElementById("form");
const resultField = document.getElementById("result");

// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements
loadSavedValues();

form.addEventListener("submit", function (event) {
  updateParamsToUserInputs(gpaNeeded);
  let res;
  try {
    res = gpaNeeded.calculate();
  } catch (e) {
    res = e;
  }
  resultField.value = res;
  console.log(resultField.value);
  // Prevent the default behavior of submit buttons -- submit form data to server.
  event.preventDefault();
});


/********************************** FUNCTIONS ***********************************/

/**
 * Updates parameters the given GPANeeded instance to what the user has inputted.
 * @param {GPANeeded} obj 
 */
function updateParamsToUserInputs(obj) {
  obj.cgpaDesired = parseFloat(document.getElementById("desired-cgpa").value);
  obj.cgpaCurrent = parseFloat(document.getElementById("last-cgpa").value);
  obj.unitsEarned = parseInt(document.getElementById("units-earned").value);
  obj.unitsLeft = parseInt(document.getElementById("units-left").value);
}

function navItemsClickHandler() {
  updateParamsToUserInputs(gpaNeeded);
  setObjectCookie(COOKIE_NAME, gpaNeeded);
  delete gpaNeeded;
}

function loadSavedValues() {
  const cookieObj = getObjectCookieByName(COOKIE_NAME);
  const keys = Object.keys(cookieObj);
  // If cookie object is not empty, iterate thru each key and set the its value
  // as the value of its counterpart in the GPANeeded object instance. 
  // for-of is used instead of for-in to retrieve the key value and not index.
  // Source: https://stackoverflow.com/a/684692
  if (keys.length) {
    for (var key of keys) {
      gpaNeeded[key] = cookieObj[key];
    }
  }
  document.getElementById("desired-cgpa").value = gpaNeeded.cgpaDesired;
  document.getElementById("last-cgpa").value = gpaNeeded.cgpaCurrent;
  document.getElementById("units-earned").value = gpaNeeded.unitsEarned;
  document.getElementById("units-left").value = gpaNeeded.unitsLeft;
}
