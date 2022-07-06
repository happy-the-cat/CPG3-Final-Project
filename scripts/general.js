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


/**************************** FUNCTIONS FOR OBJECTS ****************************/

/**
 * Check if a given object is an object, not an array, and not null.
 * @param {any} obj object to be checked.
 * @returns {boolean} true if object is an object, else false.
 */
function isObject(obj) {
  // Source: https://stackoverflow.com/a/8511350
  return (
    typeof obj === 'object' &&
    !Array.isArray(obj) && obj !== null && obj !== ''
  );
}

/**
 * Recursive function for dynamically checking if the values of a nested object
 * of unknown depth is empty, null, or undefined. Also checks non-nested objects.
 * Returns true if so, otherwise, false.
 * @param {object} obj nested or non-nested object to be checked
 * @returns {boolean} true if `obj` is nullish or empty, else false.
 */
function isEmpty(obj) {
  return (obj === '' || obj === null || obj === undefined) 
        || Object.values(obj).every(
            x => isObject(x) ? isEmpty(x) : (x === '' || x === null || x === undefined)
        );
}

// Source: https://stackoverflow.com/a/29516227
function printNestedObject(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "object") {
        printValues(obj[key]);   
    } else {
        console.log(obj[key]);    
    }
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
  if (isObject(object)) {
    let date = new Date();
    date.setDate(date.getDate() + 1);  // set cookie to expire 1 day later
    document.cookie = name + "=" + JSON.stringify(object) + "; expires=" + date.toUTCString() + "; ";
  }
}

/**
 * Set a bunch of cookies by setting each key-value pair in a given object
 * as a cookie. Values in `cookiesObj` can be another object or a non-object.
 * @param {object} cookiesObj object contianing a bunch of cookies as key-value pairs
 */
function setCookies(cookiesObj) {
  const keys = Object.keys(cookiesObj);
  // If keys array is not empty, iterate thru each key (not index thus not for in).
  // Cookie will be stored in the form of `name=value;`
  // where name = key, value = cookieObj[key]
  if (keys.length) {
    for (let key of keys) {
      if (isObject(cookiesObj[key])) {
        setObjectCookie(key, cookiesObj[key]);
      } else {
        setCookie(key, cookiesObj[key]);
      }
    }
  }
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
  let decodedCookies = decodeURIComponent(document.cookie);
  let cookies = decodedCookies.split(';');
  for(let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
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

/**
 * Get all cookies stored in the site and return them as an object with a collection of cookies.
 * Assumes that each cookie only has one value and takes into account object values.
 * @returns Object containing the parsed collection of cookies, or null if empty.
 */
function getCookies() {
  // Source: https://stackoverflow.com/a/252959
  // Get the list of escaped/encoded key-value pairs (cookies), decode them,
  // and split them by their delimiter (;)
  const c = document.cookie;
  if (!c.length) return null;  // If there are no cookies, return.

  const pairs = decodeURIComponent(c).split(";");
  let cookies = {};  // empty object for the parsed cookies
  // Iterate thru each key-value pair and parse them.
  for (let i = 0; i < pairs.length; i++){
    const pair = pairs[i].split("=");
    // For multiple values: pair.slice(1).join('='));
    if (pair[1].trim().startsWith("{")) {
      cookies[(pair[0]+'').trim()] = JSON.parse(pair[1]);
    } else {
      cookies[(pair[0]+'').trim()] = pair[1];
    }
  }
  return cookies;
}

/**
 * Delete all cookies in the site.
 */
function deleteAllCookies() {
  // Source: https://stackoverflow.com/a/179514
  const c = document.cookie;
  if (!c.length) return;

  const cookies = c.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const index = cookie.indexOf("=");
    const name = (index > -1) ? cookie.substring(0, index) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
