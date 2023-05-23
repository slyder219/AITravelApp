
const express = require('express');
// import amadeus
const Amadeus = require('amadeus');

// set up amadeus client credentials
const key = "OA1kI1wAG1U87REBGsmgGK3mF8isPd7a"
const secret = "KaQ1vwdHt1qoo1Xg"
const amadeus = new Amadeus({
    clientId: key,
    clientSecret: secret,
  });

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'NYC',
    destinationLocationCode: 'MAD',
    departureDate: '2023-06-01',
    adults: 1
  }).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error(error.response.data);
  });
  

// const app = express();

// app.get('/', (request, response) => {
//     response.send();
// })
