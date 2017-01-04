// ==UserScript==
// @name         Auto Collect Neopets Loot
// @version      1.3
// @description  Collects bank interest, Coltzan's Shrine, Healing Springs, Tombola, fishing,
//               Advent Calendar, and Fruit Machine when www.neopets.com is loaded
// @author       bloodelves88
// @match        http://www.neopets.com/*
// @include      http://www.neopets.com/desert/shrine.phtml
// @include      http://www.neopets.com/island/tombola2.phtml
// @include      http://www.neopets.com/faerieland/springs.phtml
// @include      http://www.neopets.com/bank.phtml
// @include      http://www.neopets.com/process_bank.phtml
// @include      http://www.neopets.com/water/fishing.phtml
// @include      http://www.neopets.com/faerieland/tdmbgpop.phtml
// @include      http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes
// @include      http://www.neopets.com/freebies/index.phtml
// @include      http://www.neopets.com/winter/process_adventcalendar.phtml
// @grant        GM_addStyle
// ==/UserScript==

// Gets data on whether script is on or off. Returns true if no data exists
var scriptIsOn = window.localStorage.getItem("scriptIsOnValue");
if (scriptIsOn === "false") {
    scriptIsOn = false;
} else { // This means also defaults to true if no data
    scriptIsOn = true;
}

// Get the current month (for Advent Calendar)
var thisMonth = new Date().getMonth(); // January is 0, December is 11

// Create button
var onOffButton = document.createElement ('div');
displayCorrectButtonText(onOffButton);
onOffButton.setAttribute ('id', 'onOffButtonContainer');
document.body.appendChild (onOffButton);

document.getElementById ("onOffButton").addEventListener (
    "click", onOffToggle, false
);

// Called by event listener
function onOffToggle(event) {
    scriptIsOn = !scriptIsOn;
    window.localStorage.setItem("scriptIsOnValue", scriptIsOn); // Saves value of scriptIsOn
    var onOffButton = document.getElementById("onOffButton");
    displayCorrectButtonText(onOffButton);
}

function displayCorrectButtonText(buttonName) {
    if (scriptIsOn === "true" || scriptIsOn === true) {
        buttonName.innerHTML = '<button id="onOffButton" type="button">Turn off script</button>';
    } else if (scriptIsOn === "false" || scriptIsOn === false) {
        buttonName.innerHTML = '<button id="onOffButton" type="button">Turn on script</button>';
    }
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #onOffButtonContainer {
        position:               absolute;
        top:                    0;
        right:                  1%;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #onOffButton {
        cursor:                 pointer;
    }
    #onOffButtonContainer p {
        color:                  red;
        background:             white;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
        .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return str;
}

if (scriptIsOn) {
    if (window.location.href === "http://www.neopets.com/") {
        visitTombola();
    } else if (window.location.href === "http://www.neopets.com/island/tombola2.phtml") {
        visitHealingSprings();
    } else if (window.location.href === "http://www.neopets.com/faerieland/springs.phtml") {
        visitColtzan();
    } else if (window.location.href === "http://www.neopets.com/desert/shrine.phtml") {
        visitBank();
    } else if (window.location.href === "http://www.neopets.com/process_bank.phtml" ||
               window.location.href === "http://www.neopets.com/bank.phtml") {
        visitFishing();
    } else if (window.location.href === "http://www.neopets.com/water/fishing.phtml") {
        visitGrundo();
    } else if (window.location.href === "http://www.neopets.com/faerieland/tdmbgpop.phtml") {
        visitSlorg();
    } else if (window.location.href === "http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes") {
        monthlyFreebies();
    } else if (thisMonth == 11 && window.location.href === "http://www.neopets.com/freebies/index.phtml") {
        adventCalendar();
    } else if (window.location.href === "http://www.neopets.com/freebies/index.phtml" ||
               window.location.href === "http://www.neopets.com/winter/process_adventcalendar.phtml") {
        visitInventory();
    }
}

// Copied from http://stackoverflow.com/a/134033/2098597
function visitColtzan() {
    document.body.innerHTML += '<form id="coltzan" action="http://www.neopets.com/desert/shrine.phtml" method="post"><input type="hidden" name="type" value="approach"></form>';
    document.getElementById("coltzan").submit();
}

function visitHealingSprings() {
    document.body.innerHTML += '<form id="faerie" action="http://www.neopets.com/faerieland/springs.phtml" method="post"><input type="hidden" name="type" value="heal"></form>';
    document.getElementById("faerie").submit();
}

function visitTombola() {
    document.body.innerHTML += '<form id="tombola" action="http://www.neopets.com/island/tombola2.phtml" method="post"><input type="submit" name="type" value="Play Tombola!"></form>';
    document.getElementById("tombola").submit();
}

function visitBank() {
    document.body.innerHTML += '<form id="bank" action="http://www.neopets.com/process_bank.phtml" method="post"><input type="hidden" name="type" value="interest"></form>';
    document.getElementById("bank").submit();
}

function visitFruitMachine() {
    document.body.innerHTML += '<form id="fruit" action="http://www.neopets.com/desert/fruit/index.phtml" method="post"><input type="hidden" name="spin" value="1"><input type="hidden" name="ck" value="c5728741609a2c5045f8032665d97a38"></form>';
    document.getElementById("fruit").submit();
}

function visitFishing() {
    document.body.innerHTML += '<form id="fishing" action="http://www.neopets.com/water/fishing.phtml" method="post"><input type="hidden" name="go_fish" value="1"></form>';
    document.getElementById("fishing").submit();
}

function visitGrundo() {
    document.body.innerHTML += '<form id="grundo" action="http://www.neopets.com/faerieland/tdmbgpop.phtml" method="post"><input type="hidden" name="talkto" value="1"></form>';
    document.getElementById("grundo").submit();
}

function visitSlorg() {
    window.location.href = "http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes";
}

function monthlyFreebies() {
    window.location.href = "http://www.neopets.com/freebies/index.phtml";
}

function adventCalendar() {
    window.location.href = "http://www.neopets.com/winter/process_adventcalendar.phtml";
}

function visitInventory() {
    window.location.href = "http://www.neopets.com/inventory.phtml";
}
