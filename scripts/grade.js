/********************************** CONSTANTS **********************************/
const COOKIE_NAME = "grade"; // change to w.e u want
var num = 6;
/**************************** Sequential function calls *************************/
// Add click event listener to all functions
addListenerToNavItems(navItemsClickHandler);
// Load save values onto their corresponding HTML elements

loadSavedValues();

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

  //https://stackoverflow.com/questions/34091136/insert-a-new-row-of-input-tags-using-javascript
  var inputItem1 = document.createElement('input');
  inputItem1.setAttribute("type", "text");
  inputItem1.setAttribute("class", "form-control");
  inputItem1.setAttribute("placeholder", "text");
  inputItem1.id = "name";
  cell1.appendChild(inputItem1);
  
  var inputItem2 = document.createElement('input');
  inputItem2.setAttribute("type", "number");
  inputItem2.setAttribute("class", "form-control");
  inputItem2.setAttribute("placeholder", "number");
  inputItem2.id = "weight"
  cell2.appendChild(inputItem2);

  var inputItem3 = document.createElement('input');
  inputItem3.setAttribute("type", "number");
  inputItem3.setAttribute("class", "form-control");
  inputItem3.setAttribute("placeholder", "number");
  inputItem3.id="percentage"
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
  
  for(let i = 1; i<table.rows.length; i++){
      let weight=Number(table.rows[i].cells[2].children[0].value);
      let percent=Number(table.rows[i].cells[3].children[0].value);
      document.getElementById("table").rows[i].cells[4].innerHTML = weight*(percent*0.01);
      totaln+=weight*(percent*0.01);
      
  }
  document.getElementById("result").value = totaln;
}