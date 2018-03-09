const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const ERROR = 422;
const SUCCESS = 200;
const { getCurrentPrice, getYesterdayPrice } = require('../models/bitcoin.js');
const cors = require('cors');

router.get('/prices', (req, res) => {
  console.log('api request for prices');
  let bitcoin = {};
  getCurrentPrice()
  .then(current => {
    price = current.bpi.USD.rate.replace(/\,/g,'');
    price = parseInt(price, 10);
    bitcoin.currentPrice = price;
  })
  .then(getYesterdayPrice)
  .then(yesterday => {
    let price = Object.values(yesterday.bpi);
    bitcoin.yesterdayPrice = parseInt(price[0], 10);
    bitcoin.priceDifference = bitcoin.currentPrice - bitcoin.yesterdayPrice;
    res.status(SUCCESS);
    res.send(bitcoin);
  })
  .catch(err => {
    res.status(ERROR);
    res.send("Unable to get prices", err);
  });
});

router.get('*', (req, res) => {
  res.status(ERROR);
  res.send("Page not found");
});

module.exports = router;