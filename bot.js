// ==UserScript==
// @name         JustDice
// @namespace    https://just-dice.com/
// @version      0.1
// @author       You
// @match        https://just-dice.com/
// @grant        none
// ==/UserScript==

var base = 0.00000310.toFixed(8);
var win = false;
var counter = 0;
var seedCounter = 0;
var multiplier = 1;
var minBalance = (base * 1048574);
var startCounter = true;
var investAmount = 0;
var investThreshold = base * 1048575 + 0.001;
var tipThreshold = base * 1048575 + 0.01;
function getBalance() {
	return parseFloat(document.getElementById('pct_balance').value);
}
var startingBalance = getBalance();

if (startingBalance > minBalance) {
	win = true;
}
var balanceNow = getBalance();

function invest(amount) {
	$("#invest_edit").click();
	document.getElementById('invest_input').value = amount;
	$("#invest_button").click();
}
function seedChange() {
	$("#a_random").click();
	document.getElementsByClassName('seed_button')[0].setAttribute("id", "clickSeed");
	$("#clickSeed").click();
	seedCounter = 0;
}

function tip(amount) {
	document.getElementsByClassName('fleft chatinput typing')[0].setAttribute("id", "chatbox");
	document.getElementsByClassName('fleft chatbutton')[0].setAttribute("id", "sendchat");
	document.getElementById('chatbox').value ="/tip private 1313455 " + amount;
	$("#sendchat").click();
	$("#tipyes").click();
}

function bet(amount) {
	document.getElementById('pct_bet').value = amount;
	$("#a_hi").click();
	console.log(amount);
	return getBalance();
}

(function() {
	function fetch() {
		setInterval(function(){
			balanceNow = getBalance();
			if (startingBalance > minBalance && startCounter) {
				win = true;
				startCounter = false;
			}
			if (balanceNow > investThreshold) {
				investAmount = balanceNow - minBalance;
				invest(investAmount);
			}
			if (win || startingBalance < balanceNow) {
				counter = 0;
				bet(base);
				win = false;
				seedCounter += 1;
			}
			if (startingBalance > balanceNow) {
				counter += 1;
				bet((base * Math.pow(2, counter)).toFixed(8));
				seedCounter += 1;
			}
			if (seedCounter > 5000) {
				seedCounter = 0;
				seedChange();
			}
			startingBalance = balanceNow;
		}, 3000);
	}

	fetch();
})();