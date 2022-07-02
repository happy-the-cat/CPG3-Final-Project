/***************************** CONSTANTS & OBJETCS *****************************/
const COOKIE_NAME = "gpaNeeded"; // change to w.e u want

class GPANeeded {

  constructor(cgpaDesired, cgpaCurrent, unitsEarned, unitsLeft) {
    Object.assign(this, {
      cgpaDesired, cgpaCurrent, unitsEarned, unitsLeft
    });
  }

  setAll(cgpaDesired, cgpaCurrent, unitsEarned, unitsLeft) {
    // shortcut for this.title = title assignment
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

// console.log(gpaNeeded);
// console.log(gpaNeeded.length);
// let x = JSON.stringify(gpaNeeded);
// console.log(x);
// console.log(JSON.parse(x));

// const gpa2 = new GPANeeded(1);
// gpa2.unitsLeft = 30;
// let y = JSON.stringify(gpa2);
// console.log(y);
// y = JSON.parse(y);
// console.log(y);
// console.log(y);

// const keys = Object.keys(y);
// console.log(keys.length);
// if (keys.length) {
//   for (var key of keys) {
//     console.log(key + " -> " + y[key]);
//     gpaNeeded[key] = y[key];
//   }
// }
// console.log(gpaNeeded);

// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements
// loadSavedValues();

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
}

function loadSavedValues() {
  const cookieObj = getObjectCookieByName(COOKIE_NAME);
  console.log(cookieObj);

  const keys = Object.keys(cookieObj);
  console.log(keys.length);
  if (keys.length) {
    for (var key of keys) {
      console.log(key + " -> " + cookieObj[key]);
      gpaNeeded[key] = cookieObj[key];
    }
  }

  // replace with ur codes to load the last saved table contents (saved in an object) here
  // check general.js for the list of cookie functions
  document.getElementById("desired-cgpa").value = gpaNeededObject.cgpaDesired;
  document.getElementById("last-cgpa").value = gpaNeededObject.cgpaCurrent;
  document.getElementById("units-earned").value = gpaNeededObject.unitsEarned;
  document.getElementById("units-left").value = gpaNeededObject.unitsLeft;
}
