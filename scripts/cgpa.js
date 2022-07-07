/********************************** CONSTANTS **********************************/
const COOKIE_NAME = "cgpa";
var num = 5;

/**************************** Sequential function calls *************************/
// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements
loadSavedValues();

/**************************** FUNCTIONS DEFNITIONS ******************************/
function navItemsClickHandler() {
  var table = document.getElementById("table");
  const names = [];
  const cgpa  = [];
  const leng = table.rows.length;

  for(let i = 1; i<table.rows.length; i++){
    names[i-1] = table.rows[i].cells[1].children[0].value;
    cgpa [i-1] = table.rows[i].cells[2].children[0].value;
  }

  let obj = {
    namelist: names,
    cgpalist: cgpa,
    len: leng,
  };
  console.log("hello");
  console.log(obj);

  setObjectCookie(COOKIE_NAME, obj);
}

function loadSavedValues() {
  let obj = getObjectCookieByName(COOKIE_NAME);

  if (isEmpty(obj)) return; // if cookie non-existent, return
  
  var table = document.getElementById("table");
  // console.log("--------------");
  // console.log(obj);

  if(obj.len>6){
    for(let i=0;i<  obj.len-6;i++){
      addrow();
    }
  }

  for(let i = 1; i<obj.len; i++){
      if(obj.namelist[i-1]!="undefined"){
        table.rows[i].cells[1].children[0].value = obj.namelist[i-1];
        table.rows[i].cells[2].children[0].value = obj.cgpalist[i-1];
      }else{
        break;
      }
  }

}


// insert other JS here

function addrow() {
  console.log("Hello world!");
  var table = document.getElementById("table");
  var row = table.insertRow(-1);
  row.id = "row"+(num).toString();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  row.insertCell(0).outerHTML = "<th scope='row' style='display: none;'></th>"

  //https://stackoverflow.com/questions/34091136/insert-a-new-row-of-input-tags-using-javascript
  var inputItem1 = document.createElement('input');
  inputItem1.setAttribute("type", "text");
  inputItem1.setAttribute("class", "form-control");
  inputItem1.setAttribute("placeholder", "Term Number");
  inputItem1.id = "name";
  cell1.appendChild(inputItem1);

  var inputItem2 = document.createElement('input');
  inputItem2.setAttribute("type", "number");
  inputItem2.setAttribute("class", "form-control");
  inputItem2.setAttribute("placeholder", "Term GPA");
  inputItem2.setAttribute("step", "0.00001");
  inputItem2.setAttribute("min", "1");
  inputItem2.setAttribute("max", "4");
  inputItem2.setAttribute("oninvalid", "this.setCustomValidity('Please a whole number between 1 to 5.')");
  inputItem2.setAttribute("oninput", "this.setCustomValidity('')");
  inputItem2.required = true;
  inputItem2.id = "weight"
  cell2.appendChild(inputItem2);
  console.log(cell2);
  num++;
}

function delrow() {
  console.log(num);
  if(num>1){
    document.getElementById("table").deleteRow(-1);
    num--;
  }
}

function total(){
  var table = document.getElementById("table");
  let gpa = 0;
  console.log("Table Length: " + table.rows.length);
  console.log(table);

  for(let i = 1; i<table.rows.length; i++){
      gpa += Number(table.rows[i].cells[2].children[0].value);
  }

  document.getElementById("result").value = (gpa/ (table.rows.length - 1)).toFixed(2);
}
