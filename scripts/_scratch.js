// Allows active nav item to be set dynamically
// Source: https://www.w3schools.com/howto/howto_js_active_element.asp
function toggleActiveNavLinks(activeNavLinkId) {
    // Get the container element
    // let container = document.getElementById("navbarToggler");
  
    elements = document.getElementsByTagName("*");
    console.log(elements);
  
    if (activeNavLinkId != "grade") {
      var current = document.getElementsByClassName("active");
      console.log(current[0]);
      //current[0].className = current[0].className.replace(" active", "");
      let navItems = document.getElementsByClassName("nav-link");
      console.log(navItems);
      console.log(navItems.length);
      for (let i = 0; i < navItems.length; i++) {
        console.log(navItems[i]);
      }
      // current.className += " active";
  
      // lastActiveItem.className.replace(" active", "");
      // console.log(lastActiveItem);
  
    }
  
    // // Get all the elements with class="nav-link" inside the container
    // let navItems = container.getElementsByClassName("nav-link");
    // // Loop through the buttons and add the active class to the current/clicked button
    // // Get the nav item with 
    // let lastActive = navItems("active");
  
    // for (let i = 0; i < navItems.length; i++) {
    // current[0].className = current[0].className.replace(" active", "");
    // this.className += " active";
    // }
  }

  let obj = {gpaNeededCalc: {
    cgpaCurrent: null,
    cgpaDesired: null,
    gpaNeeded: 3.2,
    unitsEarned: null,
    unitsLeft: null},
    grade:{
    email: "ew",
    text: "ee"}};
    const house = {
      price: null,
      currency: null,
      address: {
        city: null,
        street: null,
        postal_code: null,
        state: {
          name: null,
          abbreviation: {
            key1 : null,
            key2: undefined,
            key3: {
              subk1: null,
              subk2: null,
              subk3: null,
              subk4: {
                sk1: '',
                sk2: '',
                sk3: null,
              },
              subk5: null,
              subk6: null,
            }
          }
        }
      },
      owner: {
        name: null
      }
    }
    console.log(isEmpty(obj));
    console.log(isEmpty(house));
    