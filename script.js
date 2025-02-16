let money = 0;
let thugs = 0;
let soldiers = 0;
let casinos = 0;
let bribes = 0;

const thugCost = 10;
const soldierCost = 1000;
const casinoCost = 50000;
const bribeCost = 250000;

const moneyCounter = document.getElementById("money-counter");
const thugCounter = document.getElementById("thug-counter");
const soldierCounter = document.getElementById("soldier-counter");
const casinoCounter = document.getElementById("casino-counter");
const bribeCounter = document.getElementById("bribe-counter");

document.getElementById("click-button").addEventListener("click", function() {
    money += 1;
    updateDisplay();
});

function buyUpgrade(unit, cost, amount) {
    let totalCost = 0;
    for (let i = 0; i < amount; i++) {
        totalCost += cost * Math.pow(1.15, unit);
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

function addEventListeners(idPrefix, unitVar, cost) {
    document.getElementById(`${idPrefix}-1`).addEventListener("click", function() {
        window[unitVar] += buyUpgrade(window[unitVar], cost, 1);
        updateDisplay();
    });
    document.getElementById(`${idPrefix}-10`).addEventListener("click", function() {
        window[unitVar] += buyUpgrade(window[unitVar], cost, 10);
        updateDisplay();
    });
    document.getElementById(`${idPrefix}-100`).addEventListener("click", function() {
        window[unitVar] += buyUpgrade(window[unitVar], cost, 100);
        updateDisplay();
    });
    document.getElementById(`${idPrefix}-max`).addEventListener("click", function() {
        window[unitVar] += buyMaxUpgrade(window[unitVar], cost);
        updateDisplay();
    });
}

addEventListeners("hire-thug", "thugs", thugCost);
addEventListeners("hire-soldier", "soldiers", soldierCost);
addEventListeners("buy-casino", "casinos", casinoCost);
addEventListeners("bribe-politician", "bribes", bribeCost);

function updateDisplay() {
    moneyCounter.textContent = Math.floor(money);
    thugCounter.textContent = thugs;
    soldierCounter.textContent = soldiers;
    casinoCounter.textContent = casinos;
    bribeCounter.textContent = bribes;
}
