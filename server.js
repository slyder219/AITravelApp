const express = require('express');
const app = express();
const Amadeus = require('amadeus');

// set up Amadeus client credentials
const key = "OA1kI1wAG1U87REBGsmgGK3mF8isPd7a";
const secret = "KaQ1vwdHt1qoo1Xg";
const amadeus = new Amadeus({
  clientId: key,
  clientSecret: secret,
});

// Serve static files from directory
app.use(express.static('public'));

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
      res.json(response.data);
    })
    .catch(error => {
      console.log("Erorr1");
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start the server
const port = 5280;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
