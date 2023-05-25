const express = require('express');
const path = require('path');
const app = express();
const Amadeus = require('amadeus');
const { newDocument } = require('./controllers/newDocCont.js');


// set up Amadeus client credentials
const key = process.env.AMADEUS_KEY;
const secret = process.env.AMADEUS_SECRET;
const amadeus = new Amadeus({
  clientId: key,
  clientSecret: secret,
});

// Serve static files from directory
app.use(express.static('public'));

// set up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/landing.html");
});

// Handle test post to database
app.post("/testSave", (req, res) => {
  newDocument(req, res);
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
    travelClass: 'ECONOMY',
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
// define port from local var
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

