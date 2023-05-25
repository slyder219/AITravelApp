const express = require('express');
const path = require('path');
const app = express();
const Amadeus = require('amadeus');

// set up Amadeus client credentials
const key = process.env.AMADEUS_KEY;
const secret = process.env.AMADEUS_SECRET;
const amadeus = new Amadeus({
  clientId: key,
  clientSecret: secret,
});

// Serve static files from directory
app.use(express.static('public'));

// root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/search.html");
});



// Define carrier code to business name route
app.get('/airlines', (req, res) => {
  const carrierCode = req.query.carrierCode;
  amadeus.referenceData.airlines.get({
    airlineCodes: carrierCode,
}).then(response => {
  console.log("Here2");
  res.json(response.data);
}).catch(error => {
  console.log("Error2");
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
});
});

// Define flight search route 
app.get("/flights", (req, res) => {
  const { origin, destination, date } = req.query;

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: date,
    adults: 1,
    max: 10,
  })
    .then(response => {
      console.log("Here1");
      res.json(response.data);
    })
    .catch(error => {
      console.log("Erorr1");
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
