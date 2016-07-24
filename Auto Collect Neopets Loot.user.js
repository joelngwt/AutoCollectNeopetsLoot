// ==UserScript==
// @name         Auto Collect Neopets Loot
// @version      1.1
// @description  Collects bank interest, Coltzan's Shrine, Healing Springs, Tombola, fishing, and Fruit Machine when www.neopets.com is loaded
// @author       bloodelves88
// @match        http://www.neopets.com/
// @include      http://www.neopets.com/desert/shrine.phtml
// @include      http://www.neopets.com/island/tombola2.phtml
// @include      http://www.neopets.com/faerieland/springs.phtml
// @include      http://www.neopets.com/bank.phtml
// @include      http://www.neopets.com/process_bank.phtml
// @include      http://www.neopets.com/desert/fruit/index.phtml
// @include      http://www.neopets.com/desert/fruitmachine.phtml
// @include      http://www.neopets.com/water/fishing.phtml
// @include      http://www.neopets.com/faerieland/tdmbgpop.phtml
// @include      http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes
// @include      http://www.neopets.com/freebies/index.phtml
// ==/UserScript==

if (window.location.href === "http://www.neopets.com/") {
    visitTombola();
} else if (window.location.href === "http://www.neopets.com/island/tombola2.phtml") {
    visitHealingSprings();
} else if (window.location.href === "http://www.neopets.com/faerieland/springs.phtml") {
    visitColtzan();
} else if (window.location.href === "http://www.neopets.com/desert/shrine.phtml") {
    visitBank();
} else if (window.location.href === "http://www.neopets.com/process_bank.phtml" || window.location.href === "http://www.neopets.com/bank.phtml") {
    visitFruitMachine();
} else if (window.location.href === "http://www.neopets.com/desert/fruit/index.phtml" || window.location.href === "http://www.neopets.com/desert/fruitmachine.phtml") {
    visitFishing();
} else if (window.location.href === "http://www.neopets.com/water/fishing.phtml") {
    visitGrundo();
} else if (window.location.href === "http://www.neopets.com/faerieland/tdmbgpop.phtml") {
    visitSlorg();
} else if (window.location.href === "http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes") {
    monthlyFreebies();
} else {
    visitInventory();
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

function visitInventory() {
    window.location.href = "http://www.neopets.com/inventory.phtml";
}
