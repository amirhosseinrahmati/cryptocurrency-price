const coinsEndPoint = 'https://api.coinranking.com/v1/public/coins';

let coins = [];


fetch(coinsEndPoint, {
  method: 'GET'
})
.then((response) => response.json())
.then((coinsData) => {
   coins.push(...coinsData.data.coins)
})
.catch((error) => {
  console.error('Error:', error);
});


function findMatches(coinToMatch, coins) {
  return coins.filter(coin => {
    const regex = new RegExp(coinToMatch, 'gi');
    return coin.name.match(regex) || coin.symbol.match(regex);
  })
}

function displayMatches() {
  const matchArr = findMatches(this.value, coins);
  const html = matchArr.map(coin => {
    const regex = new RegExp(this.value, 'gi');
    const coinName = coin.name.replace(regex, `<span>${this.value}</span>`);
    const coinSymbol = coin.symbol.replace(regex, `<span>${this.value}</span>`);

    return `
    <a href="${coin.websiteUrl}" target="_blank" class="coin-card">
      <img src="${coin.iconUrl}" alt="${coinName}">
      <span>${coinName}</span>
      <span>${coinSymbol}</span>
      <span>${coin.price}</span>
    </a>`;
  }).join('');
  coinListOutput.innerHTML = html;
}

const searchField = document.querySelector('.search-field');
const coinListOutput = document.querySelector('.coin-result-list');

searchField.addEventListener('change', displayMatches);
searchField.addEventListener('keyup', displayMatches);