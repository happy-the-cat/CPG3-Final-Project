/********************************** CONSTANTS **********************************/
const COOKIE_NAME = "grade";
var num = 6;

/**************************** Sequential function calls *************************/
// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements
loadSavedValues();

/**************************** FUNCTIONS DEFNITIONS ******************************/
function navItemsClickHandler() {
  var table = document.getElementById("table");
  const names = [];
  const weights = [];
  const percentages = [];
  const leng = table.rows.length;
  
  for(let i = 1; i<table.rows.length; i++){
    names[i-1] = table.rows[i].cells[1].children[0].value;
    weights[i-1] = table.rows[i].cells[2].children[0].value;
    percentages[i-1] = table.rows[i].cells[3].children[0].value;
  }

  let obj = {
    namelist: names,
    weightlist: weights,
    percentagelist: percentages,
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
        table.rows[i].cells[2].children[0].value = obj.weightlist[i-1];
        table.rows[i].cells[3].children[0].value = obj.percentagelist[i-1];
      }else{
        break;
      }
  }
  
}

// insert other JS here

function addrow() { 
  var table = document.getElementById("table");
  var row = table.insertRow(-1);
  row.id = "row"+(num).toString();

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  row.insertCell(0).outerHTML = "<th scope='row' style='display: none;'></th>"

  //https://stackoverflow.com/questions/34091136/insert-a-new-row-of-input-tags-using-javascript
  var inputItem1 = document.createElement('input');
  inputItem1.setAttribute("type", "text");
  inputItem1.setAttribute("class", "form-control");
  inputItem1.setAttribute("placeholder", "Name of Category");
  inputItem1.id = "name";
  inputItem1.required = true;
  cell1.appendChild(inputItem1);
  
  var inputItem2 = document.createElement('input');
  inputItem2.setAttribute("type", "number");
  inputItem2.setAttribute("class", "form-control");
  inputItem2.setAttribute("placeholder", "Weighted of Category");
  inputItem2.setAttribute("min", "1");
  inputItem2.setAttribute("max", "100");
  inputItem2.setAttribute("oninvalid", "this.setCustomValidity('Please a number between 1 to 100.')");
  inputItem2.setAttribute("oninput", "this.setCustomValidity('')");
  inputItem2.id = "weight"
  inputItem2.required = true;
  cell2.appendChild(inputItem2);

  var inputItem3 = document.createElement('input');
  inputItem3.setAttribute("type", "number");
  inputItem3.setAttribute("class", "form-control");
  inputItem3.setAttribute("placeholder", "Your Grade Percent");
  inputItem3.setAttribute("min", "1");
  inputItem3.setAttribute("max", "100");
  inputItem3.setAttribute("oninvalid", "this.setCustomValidity('Please a number between 1 to 100.')");
  inputItem3.setAttribute("oninput", "this.setCustomValidity('')");
  inputItem3.id="percentage"
  inputItem3.required = true;
  cell3.appendChild(inputItem3);

  cell4.innerHTML = "-";

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
  let totaln = 0;
  let checker =0;

  for(let i = 1; i<table.rows.length; i++){
    if(Number(table.rows[i].cells[2].children[0].value)==0||Number(table.rows[i].cells[3].children[0].value)==0){
      checker++;
      break;
    }
    let weight=Number(table.rows[i].cells[2].children[0].value);
    let percent=Number(table.rows[i].cells[3].children[0].value);
    console.log(weight);
    table.rows[i].cells[4].innerHTML = weight*(percent*0.01);
    totaln+=weight*(percent*0.01);
  }
  if(checker==0){
    document.getElementById("result").value = totaln;
  }
  
}