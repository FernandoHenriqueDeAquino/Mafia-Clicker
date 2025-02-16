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
    thugCost = baseThugCost * Math.pow(1.15, thugs) * discountFactor;
    soldierCost = baseSoldierCost * Math.pow(1.15, soldiers) * discountFactor;
    casinoCost = baseCasinoCost * Math.pow(1.15, casinos) * discountFactor;
}

function buyUpgrade(unitVar, baseCost) {
    let cost = baseCost * Math.pow(1.15, window[unitVar]);
    if (money >= cost) {
        money -= cost;
        window[unitVar]++;
        updateCosts();
        updateDisplay();
    }
}

function buyMultipleUpgrades(unitVar, baseCost, amount) {
    let totalCost = 0;
    for (let i = 0; i < amount; i++) {
        totalCost += baseCost * Math.pow(1.15, window[unitVar] + i);
    }
    if (money >= totalCost) {
        money -= totalCost;
        window[unitVar] += amount;
        updateCosts();
        updateDisplay();
    }
}

function buyMaxUpgrade(unitVar, baseCost) {
    let amount = 0;
    let cost = baseCost * Math.pow(1.15, window[unitVar]);
    while (money >= cost) {
        money -= cost;
        window[unitVar]++;
        amount++;
        cost = baseCost * Math.pow(1.15, window[unitVar]);
    }
    updateCosts();
    updateDisplay();
}

function addEventListeners(idPrefix, unitVar, baseCost) {
    document.getElementById(`${idPrefix}-1`).addEventListener("click", function() {
        buyUpgrade(unitVar, baseCost);
    });
    document.getElementById(`${idPrefix}-10`).addEventListener("click", function() {
        buyMultipleUpgrades(unitVar, baseCost, 10);
    });
    document.getElementById(`${idPrefix}-100`).addEventListener("click", function() {
        buyMultipleUpgrades(unitVar, baseCost, 100);
    });
    document.getElementById(`${idPrefix}-max`).addEventListener("click", function() {
        buyMaxUpgrade(unitVar, baseCost);
    });
}

addEventListeners("hire-thug", "thugs", baseThugCost);
addEventListeners("hire-soldier", "soldiers", baseSoldierCost);
addEventListeners("buy-casino", "casinos", baseCasinoCost);

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
