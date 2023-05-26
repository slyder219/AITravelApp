const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const Amadeus = require('amadeus');
const { newDocument } = require('./controllers/newDocCont.js');
const { handleRegister } = require('./controllers/newRegCont.js');
const { checkLogin } = require('./controllers/checkLoginCont.js')


//______________________________________________________________________________


// set up sessions
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));


// set up Amadeus client credentials
const key = process.env.AMADEUS_KEY;
const secret = process.env.AMADEUS_SECRET;
const amadeus = new Amadeus({
  clientId: key,
  clientSecret: secret,
});

// Serve static files from directory
app.use(express.static('public'));

// ejs
app.set('view engine', 'ejs');

// set up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/landing.html");
});

//______________________________________________________________________________

// TEST DB POST
// Handle test post to database
app.post("/testSave", (req, res) => {
  newDocument(req, res);
});

// AMADEUS GET AIRLINE NAME 
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

// AMADEUS GET FLIGHT RESULTS
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


// POST REGISTERATION
// Define register route
app.post("/register", (req, res) => {
  handleRegister(req, res);
});

// GET LOGIN CHECK 
// Define login route
app.get("/login", (req, res) => {
  checkLogin(req, res);
});




//______________________________________________________________________________


// Start the server
// define port from local var
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

