let money = 0;
let thugs = 0;
let soldiers = 0;
let casinos = 0;
let bribes = 0;

let baseThugCost = 10;
let baseSoldierCost = 1000;
let baseCasinoCost = 50000;
const bribeCost = 250000;

let thugCost = baseThugCost;
let soldierCost = baseSoldierCost;
let casinoCost = baseCasinoCost;

const moneyCounter = document.getElementById("money-counter");
const thugCounter = document.getElementById("thug-counter");
const soldierCounter = document.getElementById("soldier-counter");
const casinoCounter = document.getElementById("casino-counter");
const bribeCounter = document.getElementById("bribe-counter");

document.getElementById("click-button").addEventListener("click", function() {
    money += 1;
    updateDisplay();
});

function updateCosts() {
    let discountFactor = Math.pow(0.75, bribes);
    thugCost = baseThugCost * discountFactor;
    soldierCost = baseSoldierCost * discountFactor;
    casinoCost = baseCasinoCost * discountFactor;
}

function buyUpgrade(unit, cost, amount) {
    let totalCost = 0;
    for (let i = 0; i < amount; i++) {
        totalCost += cost * Math.pow(1.15, unit + i);
    }
    if (money >= totalCost) {
        money -= totalCost;
        return amount;
    }
    return 0;
}

function buyMaxUpgrade(unit, cost) {
    let amount = 0;
    while (money >= cost * Math.pow(1.15, unit + amount)) {
        money -= cost * Math.pow(1.15, unit + amount);
        amount++;
    }
    return amount;
}

function addEventListeners(idPrefix, unitVar, costVar) {
    document.getElementById(`${idPrefix}-1`).addEventListener("click", function() {
        window[unitVar] += buyUpgrade(window[unitVar], window[costVar], 1);
        updateDisplay();
    });
    document.getElementById(`${idPrefix}-10`).addEventListener("click", function() {
        window[unitVar] += buyUpgrade(window[unitVar], window[costVar], 10);
        updateDisplay();
    });
    document.getElementById(`${idPrefix}-100`).addEventListener("click", function() {
        window[unitVar] += buyUpgrade(window[unitVar], window[costVar], 100);
        updateDisplay();
    });
    document.getElementById(`${idPrefix}-max`).addEventListener("click", function() {
        window[unitVar] += buyMaxUpgrade(window[unitVar], window[costVar]);
        updateDisplay();
    });
}

addEventListeners("hire-thug", "thugs", "thugCost");
addEventListeners("hire-soldier", "soldiers", "soldierCost");
addEventListeners("buy-casino", "casinos", "casinoCost");

document.getElementById("bribe-politician-1").addEventListener("click", function() {
    if (money >= bribeCost) {
        money -= bribeCost;
        bribes++;
        updateCosts();
        updateDisplay();
    }
});

document.getElementById("bribe-politician-max").addEventListener("click", function() {
    let maxBribes = Math.floor(money / bribeCost);
    if (maxBribes > 0) {
        money -= maxBribes * bribeCost;
        bribes += maxBribes;
        updateCosts();
        updateDisplay();
    }
});

function updateDisplay() {
    moneyCounter.textContent = Math.floor(money);
    thugCounter.textContent = thugs;
    soldierCounter.textContent = soldiers;
    casinoCounter.textContent = casinos;
    bribeCounter.textContent = bribes;
}

// Passive income generation
function generateIncome() {
    money += (thugs * 1) + (soldiers * 10) + (casinos * 100);
    updateDisplay();
}

setInterval(generateIncome, 1000);
