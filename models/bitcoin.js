const fetch = require('node-fetch');
const URL_YESTERDAY = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
const URL_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice/usd.json';

function getCurrentPrice() {
  console.log('getting current price');
	return fetch(URL_CURRENT)
	.then(res => res.json());
};

function getYesterdayPrice() {
  console.log('getting yesterday price');
  return fetch(URL_YESTERDAY)
  .then(res => res.json());
}

module.exports = {
  getCurrentPrice,
  getYesterdayPrice
}