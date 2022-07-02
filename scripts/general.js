/**
 * Add click event listener with the specified handler function to all nav items.
 * @param {function} handler event handler for clicking navbar buttons
 */
function addListenerToNavItems(handler) {
  const navBrand = document.querySelector(".navbar-brand");
  navBrand.addEventListener("click", handler);
  const navItems = document.getElementsByClassName("nav-link");
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", handler);
  }
}

/**************************** FUNCTIONS FOR COOKIES ****************************/
/**
 * Set a cookie in the form of `name=value;`  
 * If a cookie with similar name exists, update its value instead.
 * @param {string} name cookie name
 * @param {string} value cookie value
 */
function setCookie(name, value) {
  let date = new Date();
  date.setDate(date.getDate() + 1);  // set cookie to expire 1 day later
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; ";
}
 
/**
 * Similar to setCookie() but sets a cookie with an object for value instead.
 * @param {string} name cookie name
 * @param {object} object cookie value in the form of an object
 */
function setObjectCookie(name, object) {
  let date = new Date();
  date.setDate(date.getDate() + 1);  // set cookie to expire 1 day later
  document.cookie = name + "=" + JSON.stringify(object) + "; expires=" + date.toUTCString() + "; ";
}

/**
 * Get a cookie value by its name and return it as a string.  
 * @param {string} cname cookie name
 * @returns cookie value
 */
function getCookieByName(cname) {
  // Source: https://www.w3schools.com/js/js_cookies.asp
  let name = cname + "=";
  // Decode string of cookies to accomodate cookies with special characters
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(';');
  for(let i = 0; i <cookieArray.length; i++) {
    let c = cookieArray[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    // if cookie found, return value
    if (c.indexOf(name) == 0) { 
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


/**
 * Get a cookie whose value is a JSON string of an object by its name. 
 * Returns an object.
 * @param {string} name cookie name
 * @returns {object} cookie value as an object
 */
function getObjectCookieByName(name) {
  // Source: https://stackoverflow.com/a/11344672
  // cookie.match() returns an array of match results or null if empty
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  
  // SHORT CIRC EVAL: If result is false/null, AND operator stops, returns orig. 
  // value of result, and the 2nd operand won't be evaluated.
  // Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
  result && (result = JSON.parse(result[1]));
  return result;
}

