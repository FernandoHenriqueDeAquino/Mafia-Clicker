document.addEventListener("DOMContentLoaded", () => {
    let money = 0;
    let thugs = 0;
    let soldiers = 0;
    let casinos = 0;

    let thugCost = 10;
    let soldierCost = 1000;
    let casinoCost = 50000;
    let bribeCost = 250000;

    const thugIncome = 1; // Cada Thug gera $1/segundo
    const soldierIncome = 5; // Cada Soldier gera $5/segundo
    const casinoIncome = 100; // Cada Casino gera $100/segundo

    let priceMultiplier = 1.15; // Aumenta o preço dos upgrades em 15% após cada compra
    let discountMultiplier = 1.0; // Redução de custo caso suborne políticos

    const moneyCounter = document.getElementById("money-counter");
    const thugCounter = document.getElementById("thug-counter");
    const soldierCounter = document.getElementById("soldier-counter");
    const casinoCounter = document.getElementById("casino-counter");

    const clickButton = document.getElementById("click-button");
    const hireThug1 = document.getElementById("hire-thug-1");
    const hireThug10 = document.getElementById("hire-thug-10");
    const hireThug100 = document.getElementById("hire-thug-100");
    const hireThugMax = document.getElementById("hire-thug-max");

    const hireSoldier = document.getElementById("hire-soldier");
    const buyCasino = document.getElementById("buy-casino");
    const bribePolitician = document.getElementById("bribe-politician");

    // Atualiza os preços na UI
    function updatePrices() {
        hireThug1.textContent = `Hire 1 Thug ($${Math.floor(thugCost)})`;
        hireThug10.textContent = `Hire 10 Thugs ($${Math.floor(thugCost * 10)})`;
        hireThug100.textContent = `Hire 100 Thugs ($${Math.floor(thugCost * 100)})`;
        hireSoldier.textContent = `Hire 1 Soldier ($${Math.floor(soldierCost)})`;
        buyCasino.textContent = `Buy Illegal Casino ($${Math.floor(casinoCost)})`;
        bribePolitician.textContent = `Bribe Politician ($${Math.floor(bribeCost)})`;
    }

    // Atualiza os contadores na interface
    function updateUI() {
        moneyCounter.textContent = money;
        thugCounter.textContent = thugs;
        soldierCounter.textContent = soldiers;
        casinoCounter.textContent = casinos;
        updatePrices();
    }

    // Adiciona dinheiro ao clicar no botão
    clickButton.addEventListener("click", () => {
        money += 1;
        updateUI();
    });

    // Função para contratar capangas
    function hireThugs(amount) {
        const totalCost = thugCost * amount;
        if (money >= totalCost) {
            money -= totalCost;
            thugs += amount;
            thugCost *= Math.pow(priceMultiplier, amount);
            updateUI();
        }
    }

    // Função para contratar o máximo possível de capangas
    function hireMaxThugs() {
        let maxThugs = Math.floor(money / thugCost);
        if (maxThugs > 0) {
            money -= maxThugs * thugCost;
            thugs += maxThugs;
            thugCost *= Math.pow(priceMultiplier, maxThugs);
            updateUI();
        }
    }

    // Função para contratar soldados
    function hireSoldiers() {
        if (money >= soldierCost) {
            money -= soldierCost;
            soldiers += 1;
            soldierCost *= priceMultiplier;
            updateUI();
        }
    }

    // Função para comprar um cassino
    function buyCasinos() {
        if (money >= casinoCost) {
            money -= casinoCost;
            casinos += 1;
            casinoCost *= priceMultiplier;
            updateUI();
        }
    }

    // Função para subornar políticos
    function bribePoliticians() {
        if (money >= bribeCost) {
            money -= bribeCost;
            discountMultiplier *= 0.75; // Reduz os preços em 25%
            thugCost *= discountMultiplier;
            soldierCost *= discountMultiplier;
            casinoCost *= discountMultiplier;
            bribeCost *= priceMultiplier;
            updateUI();
        }
    }

    // Renda passiva gerada pelos capangas, soldados e cassinos a cada segundo
    function generatePassiveIncome() {
        money += (thugs * thugIncome) + (soldiers * soldierIncome) + (casinos * casinoIncome);
        updateUI();
    }

    // Loop de geração de dinheiro passivo
    setInterval(generatePassiveIncome, 1000);

    // Eventos de compra de capangas
    hireThug1.addEventListener("click", () => hireThugs(1));
    hireThug10.addEventListener("click", () => hireThugs(10));
    hireThug100.addEventListener("click", () => hireThugs(100));
    hireThugMax.addEventListener("click", hireMaxThugs);

    // Eventos de compra de upgrades avançados
    hireSoldier.addEventListener("click", hireSoldiers);
    buyCasino.addEventListener("click", buyCasinos);
    bribePolitician.addEventListener("click", bribePoliticians);

    // Inicializa a UI
    updateUI();
});

// Assuming the functions are defined in script.js
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function deleteCookie(name) {
  setCookie(name, '', -1);
}

// Set the initial values of money and upgrades in the cookies
function setInitialValues() {
  const initialMoney = 100; // Initial money value
  const initialUpgrades = { level: 1, speed: 1, multiplier: 1 }; // Initial upgrades JSON object

  // Save initial values to cookies
  setCookie('money', initialMoney.toString(), 30); // Save money value
  setCookie('upgrades', JSON.stringify(initialUpgrades), 30); // Save upgrades JSON string
}

// Set the interval to update cookies every minute
setInterval(updateCookies, 60000); // 60000 milliseconds = 1 minute

// Function to update cookies
function updateCookies() {
  // Retrieve current values from cookies
  const money = getCookie('money');
  const upgrades = getCookie('upgrades');

  // Update values as needed
  const newMoney = parseInt(money) + 10; // Add 10 money every minute
  const newUpgrades = JSON.parse(upgrades); // Parse upgrades JSON string
  newUpgrades.level += 1; // Upgrade level every minute

  // Save updated values back to cookies
  setCookie('money', newMoney.toString(), 30); // Save money value
  setCookie('upgrades', JSON.stringify(newUpgrades), 30); // Save upgrades JSON string
}

// Call the setInitialValues function to set the initial values
setInitialValues();