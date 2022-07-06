/********************************** CONSTANTS **********************************/
const COOKIE_NAME = "gpa";
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
  const units = [];
  const grades = [];
  const leng = table.rows.length;
  
  for(let i = 1; i<table.rows.length; i++){
    names[i-1] = table.rows[i].cells[1].children[0].value;
    units[i-1] = table.rows[i].cells[2].children[0].value;
    grades[i-1] = table.rows[i].cells[3].children[0].value;
  }

  let obj = {
    namelist: names,
    unitlist: units,
    gradelist: grades,
    len: leng,
  };

  console.log(obj);
  setObjectCookie(COOKIE_NAME, obj);   
}

function loadSavedValues() {
  let obj = getObjectCookieByName(COOKIE_NAME);
  var table = document.getElementById("table");

  if(obj.len>6){
    for(let i=0;i<obj.len-6;i++){
      addrow();
    }
  }

  for(let i = 1; i<obj.len; i++){
      if(obj.namelist[i-1]!="undefined"){
        table.rows[i].cells[1].children[0].value = obj.namelist[i-1];
        table.rows[i].cells[2].children[0].value = obj.unitlist[i-1];
        table.rows[i].cells[3].children[0].value = obj.gradelist[i-1];
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
  var cell3 = row.insertCell(2);
  row.insertCell(0).outerHTML = "<th scope='row' style='display: none;'></th>"

  //https://stackoverflow.com/questions/34091136/insert-a-new-row-of-input-tags-using-javascript
  var inputItem1 = document.createElement('input');
  inputItem1.setAttribute("type", "text");
  inputItem1.setAttribute("class", "form-control");
  inputItem1.setAttribute("placeholder", "Name of Course");
  inputItem1.required = true;
  inputItem1.id = "name";
  cell1.appendChild(inputItem1);
  
  var inputItem2 = document.createElement('input');
  inputItem2.setAttribute("type", "number");
  inputItem2.setAttribute("class", "form-control");
  inputItem2.setAttribute("placeholder", "Units of Course");
  inputItem2.setAttribute("min", "1");
  inputItem2.setAttribute("max", "5");
  inputItem2.setAttribute("oninvalid", "this.setCustomValidity('Please a number between 1 to 5.')");
  inputItem2.setAttribute("oninput", "this.setCustomValidity('')");
  inputItem2.required = true;
  inputItem2.id = "weight"
  cell2.appendChild(inputItem2);

  var inputItem3 = document.createElement('input');
  inputItem3.setAttribute("type", "number");
  inputItem3.setAttribute("class", "form-control");
  inputItem3.setAttribute("placeholder", "Grade Recieved");
  inputItem3.setAttribute("min", "1");
  inputItem3.setAttribute("max", "4");
  inputItem3.setAttribute("oninvalid", "this.setCustomValidity('Please a number between 1 to 4.')");
  inputItem3.setAttribute("oninput", "this.setCustomValidity('')");
  inputItem3.required = true;
  inputItem3.id="percentage"
  cell3.appendChild(inputItem3);

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
  let summation = 0;
  let divider = 0;
  let checker =0;
  
  for(let i = 1; i<table.rows.length; i++){
      if(Number(table.rows[i].cells[2].children[0].value)==0||Number(table.rows[i].cells[3].children[0].value)==0){
        checker++;
        break;
      }
      let units=Number(table.rows[i].cells[2].children[0].value);
      let grade=Number(table.rows[i].cells[3].children[0].value);
      console.log(units*grade);
      summation+=units*grade;
      divider+=units;
  }
  if(checker==0){
    document.getElementById("result").value = (summation/divider).toFixed(2);
  }
}