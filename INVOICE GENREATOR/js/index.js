var ptCode;

var ptName;

var ptEmail;

var ptPhoneNumber;

var ptAddress;

var ptRate;

var partyData;

var partyDataArray = [];

var partyJsonLocal;

var getPartiesList = localStorage.getItem("parties");

var parsgetParties = JSON.parse(getPartiesList);

var date;

var day;

var fromTime;

var toTime;

var deduction;

var totalTime;

var description;

var rate;

var ratePerMin;

var cuPtCode;

var minutes = document.getElementById("minutes");
var amount = document.getElementById("amount").value;

var mydata;

var dataArray = [];

var cuPtData = [];

var jsonObject;

var selectedParty;

var selectedMonth;

var billingMonth;

var jsonDataObjects;

var getDataObjectsArray = localStorage.getItem("dataObjectsArray");

var parsDataObjectsArray = JSON.parse(getDataObjectsArray);

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var counting = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

if (parsDataObjectsArray !== null) {
  for (var j = 0; j < parsDataObjectsArray.length; j++) {
    dataArray.push(parsDataObjectsArray[j]);
  }
}

// current date work //

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  document.getElementById("date").value = today;
}

window.onload = function () {
  getDate();
};
// function of add new party modal close //
function partyModalClose() {
  document.getElementById("newParty").className = "close";
}

// var getData = localStorage.getItem("objectsArray");

// var parsData = JSON.parse(getData);

// if (parsData !== null) {
//   for (var j = 0; j < parsData.length; j++) {
//     dataArray.push(parsData[j]);
//   }
// }

// add new party //

if (parsgetParties !== null) {
  for (var j = 0; j < parsgetParties.length; j++) {
    partyDataArray.push(parsgetParties[j]);
  }
}

function addParty() {
  ptCode = document.getElementById("ptCode").value;
  ptName = document.getElementById("ptName").value;
  ptEmail = document.getElementById("ptEmail").value;
  ptPhoneNumber = document.getElementById("ptPhoneNumber").value;
  ptAddress = document.getElementById("ptAddress").value;
  ptRate = document.getElementById("ptRate").value;

  partyData = new PartyObject(
    ptCode,
    ptName,
    ptEmail,
    ptPhoneNumber,
    ptAddress,
    ptRate
  );

  partyDataArray.push(partyData);

  partyJsonLocal = JSON.stringify(partyDataArray);

  localStorage.setItem("parties", partyJsonLocal);

  getPartiesList = localStorage.getItem("parties");

  parsgetParties = JSON.parse(getPartiesList);

  document.getElementById("partiesList").innerHTML = null;
  updatePartiesList();
}

function PartyObject(
  ptCode,
  ptName,
  ptEmail,
  ptPhoneNumber,
  ptAddress,
  ptRate
) {
  this.ptCode = ptCode;
  this.ptName = ptName;
  this.ptEmail = ptEmail;
  this.ptPhoneNumber = ptPhoneNumber;
  this.ptAddress = ptAddress;
  this.ptRate = ptRate;
}

// function of new Party modal open //

function newPartyModalOpen() {
  document.getElementById("newParty").className = "modal";

  document.getElementById("ptCode").value = "00" + (partyDataArray.length + 1);
  document.getElementById("ptName").value = null;
  document.getElementById("ptEmail").value = null;
  document.getElementById("ptPhoneNumber").value = null;
  document.getElementById("ptAddress").value = null;
  document.getElementById("ptRate").value = null;
}

// function of main modal closed //

function modalClose() {
  document.getElementById("modal-div").className = "close";

  selectedParty = document.getElementById("partiesList").value;

  selectedMonth = document.getElementById("monthsList").value;

  document.getElementById("ptNameDisplay").innerHTML = selectedParty;

  billingMonth = document.getElementById(
    "ptBillingMonthDisplay"
  ).innerHTML = selectedMonth;

  for (var i = 0; i < parsgetParties.length; i++) {
    if (parsgetParties[i].ptName === selectedParty) {
      document.getElementById("ptEmailDisplay").innerHTML =
        parsgetParties[i].ptEmail;
      document.getElementById("ptNumberDisplay").innerHTML =
        parsgetParties[i].ptPhoneNumber;
      document.getElementById("ptAddressDisplay").innerHTML =
        parsgetParties[i].ptAddress;
      document.getElementById("rate").value = parsgetParties[i].ptRate;
      ratePerMin = parsgetParties[i].ptRate / 60;
      // cuPtCode = parsgetParties[i].ptcode;
    }
  }

  // document.getElementById("date").disabled = true;
  // document.getElementById("total-time").disabled = true;
  document.getElementById("rate").disabled = true;
  // document.getElementById("minutes").disabled = true;
  document.getElementById("amount").disabled = true;

  for (var n = 0; n < parsgetParties.length; n++) {
    if (
      document.getElementById("ptNameDisplay").innerHTML ===
      parsgetParties[n].ptName
    ) {
      cuPtCode = parsgetParties[n].ptCode;
      console.log(cuPtCode);
    }
  }

  if (parsDataObjectsArray !== null) {
    for (var j = 0; j < parsDataObjectsArray.length; j++) {
      if (parsDataObjectsArray[j].ptcode === cuPtCode) {
        cuPtData.push(parsDataObjectsArray[j]);
      }
    }
  }
  tableGenreator();
}

// parties list Work //

// fromTime = document.getElementById("from-time").value;
// toTime = document.getElementById("to-time").value;
// deduction = document.getElementById("deduction").value;
// document.getElementById("total-time").value = toTime - fromTime;

// update your Parties List //

function updatePartiesList() {
  for (var k = 0; k < parsgetParties.length; k++) {
    console.log("hello");
    document.getElementById("partiesList").innerHTML += `
        <option>${parsgetParties[k].ptName}</option>
        `;
  }
}
updatePartiesList();
// monthsList //

for (var m = 0; m < months.length; m++) {
  document.getElementById("monthsList").innerHTML += `
  <option>${months[m]}</option>
  `;
}

// line total work //

function lineTotal(val) {
  console.log(val);
  document.getElementById("amount").value = val * ratePerMin;
}

// Generate data of table //

function tableGenreator() {
  document.getElementById("viewData").innerHTML = null;

  for (var i = 0; i < cuPtData.length; i++) {
    document.getElementById("viewData").innerHTML += `
        <tr>
        <td>${i + 1}</td>
        <td>${cuPtData[i].date}</td>
        <td>${cuPtData[i].day}</td>
        <td>${cuPtData[i].fromTime}</td>
        <td>${cuPtData[i].toTime}</td>
        <td>${cuPtData[i].deduction}</td>
        <td>${cuPtData[i].totalTime}</td>
        <td>${cuPtData[i].description}</td>
        <td>${cuPtData[i].rate}</td>
        <td>${cuPtData[i].minutes}</td>
        <td>${cuPtData[i].amount}</td>
        <td><button onClick='del(${i})'>Delete</button></td>
        </tr>
        `;
  }
}

tableGenreator();

function del(trID) {
  dataArray.splice(trID, 1);
  localStorage.removeItem("dataObjectsArray");
  jsonDataObjects = JSON.stringify(dataArray);
  localStorage.setItem("dataObjectsArray", jsonDataObjects);
  getDataObjectsArray = localStorage.getItem("dataObjectsArray");
  parsDataObjectsArray = JSON.parse(getDataObjectsArray);
  cuPtData = [];
  for (var j = 0; j < parsDataObjectsArray.length; j++) {
    if (parsDataObjectsArray[j].ptcode === cuPtCode) {
      cuPtData.push(parsDataObjectsArray[j]);
    }
  }
  tableGenreator();
}

function add() {
  date = document.getElementById("date").value;
  day = document.getElementById("day").value;
  fromTime = document.getElementById("from-time").value;
  toTime = document.getElementById("to-time").value;
  deduction = document.getElementById("deduction").value;
  totalTime = document.getElementById("total-time").value;
  description = document.getElementById("description").value;
  rate = document.getElementById("rate").value;
  minutes = document.getElementById("minutes").value;
  amount = document.getElementById("amount").value;

  mydata = new Datta(
    cuPtCode,
    date,
    day,
    fromTime,
    toTime,
    deduction,
    totalTime,
    description,
    rate,
    minutes,
    amount
  );

  dataArray.push(mydata);

  jsonDataObjects = JSON.stringify(dataArray);

  localStorage.setItem("dataObjectsArray", jsonDataObjects);

  getDataObjectsArray = localStorage.getItem("dataObjectsArray");

  parsDataObjectsArray = JSON.parse(getDataObjectsArray);

  cuPtData = [];

  for (var j = 0; j < parsDataObjectsArray.length; j++) {
    if (parsDataObjectsArray[j].ptcode === cuPtCode) {
      cuPtData.push(parsDataObjectsArray[j]);
    }
  }
  tableGenreator();
}

function Datta(
  ptcode,
  date,
  day,
  fromTime,
  toTime,
  deduction,
  totalTime,
  description,
  rate,
  minutes,
  amount
) {
  this.ptcode = ptcode;
  this.date = date;
  this.day = day;
  this.fromTime = fromTime;
  this.toTime = toTime;
  this.deduction = deduction;
  this.totalTime = totalTime;
  this.description = description;
  this.rate = rate;
  this.minutes = minutes;
  this.amount = amount;
}
