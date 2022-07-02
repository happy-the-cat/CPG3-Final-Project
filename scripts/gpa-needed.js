/***************************** CONSTANTS & OBJETCS *****************************/
const COOKIE_NAME = "gpaNeededCalc";

class GPANeededCalc {

  constructor(cgpaDesired=0, cgpaCurrent=0, unitsEarned=0, unitsLeft=0) {
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


/**************************** Sequential function calls *************************/
// Instantiate GPANeeded
const gpaNeededCalc = new GPANeededCalc();

// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements
loadSavedValues();

document.getElementById("form").addEventListener("submit", 
  function (event) {
    updateParamsToUserInputs(gpaNeededCalc);
    let res;
    try {
      res = gpaNeededCalc.calculate();
    } catch (e) {
      res = e;
    }
    document.getElementById("result").value = res;
    // Prevent the default behavior of submit buttons 
    // -- submit form data to server & reload page.
    event.preventDefault();
  }
);


/********************************** FUNCTIONS ***********************************/
/**
 * Updates parameters the given GPANeeded instance to what the user has inputted.
 * @param {GPANeededCalc} obj 
 */
function updateParamsToUserInputs(obj) {
  obj.cgpaDesired = parseFloat(document.getElementById("desired-cgpa").value);
  obj.cgpaCurrent = parseFloat(document.getElementById("last-cgpa").value);
  obj.unitsEarned = parseInt(document.getElementById("units-earned").value);
  obj.unitsLeft = parseInt(document.getElementById("units-left").value);
}

function navItemsClickHandler() {
  updateParamsToUserInputs(gpaNeededCalc);
  setObjectCookie(COOKIE_NAME, gpaNeededCalc);
  delete gpaNeededCalc;
}

function loadSavedValues() {
  const cookieObj = getObjectCookieByName(COOKIE_NAME);
  const keys = Object.keys(cookieObj);
  // If cookie object is not empty, iterate thru each key and set the its value
  // as the value of its counterpart in the GPANeeded object instance. 
  // for-of is used instead of for-in to retrieve the key value and not index.
  // Source: https://stackoverflow.com/a/684692
  if (keys.length) {
    for (let key of keys) {
      gpaNeededCalc[key] = cookieObj[key];
    }
  }
  document.getElementById("desired-cgpa").value = gpaNeededCalc.cgpaDesired;
  document.getElementById("last-cgpa").value = gpaNeededCalc.cgpaCurrent;
  document.getElementById("units-earned").value = gpaNeededCalc.unitsEarned;
  document.getElementById("units-left").value = gpaNeededCalc.unitsLeft;
}
