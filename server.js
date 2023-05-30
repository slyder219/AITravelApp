9// express
const express = require('express');
const app = express();
// session
const session = require('express-session');
// path 
const path = require('path');
// amadeus ( flights API )
const Amadeus = require('amadeus');
// internal midware functions 
const { newDocument } = require('./controllers/newDocCont.js');
const { handleRegister } = require('./controllers/newRegCont.js');
const { checkLogin } = require('./controllers/checkLoginCont.js');
// isLoggedIn continues the call if true and vis versa
const { isLoggedIn, isLoggedOut, checkQuizComplete } = require('./controllers/checkSessionCont.js')(app.locals.session);

//______________________________________________________________________________

// set up ejs 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from directory
app.use(express.static('public'));

// set up sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "buftycgvgvycgvhbi",
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

// set up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LANDING FOR ALL NEW VISITS. MAIN ROUTE 
// root route
app.get("/", isLoggedOut, (req, res) => {
  res.render("landing", { loggedInBool : req.session.loggedin,
                          username : req.session.username});
});

//______________________________________________________________________________

// TEST DB POST
// Handle test post to database
//  ! Currently we have a 'Test Database' function on the live site. Was
//   used to test the database connection.
app.post("/testSave", (req, res) => {
  newDocument(req, res);
});

// AMADEUS GET AIRLINE NAME 
// Define carrier code to business name route
//  ! Needs to be moved to contollers and cleaned up. 
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
//  ! This needs to be moved to controllers and cleaned up, isn't even 
//    very relevant for the mvp 
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
// Define register route ( Register pressed )
app.post("/register", (req, res) => {
  handleRegister(req, res);
});

// GET LOGIN CHECK ( Login pressed )
// Define login route
app.get("/login", (req, res) => {
  console.log("Login route hit");
  checkLogin(req, res);
});

// PAGE ROUTES ( "/" route is above. all other page routes should be here )
//  ALL of these, when rendering a new page, need to pass info to the page: 
//    { LoggedInBool : req.session.loggedin, username : req.session.username}
//    ( The renders often use the username ) 

// handle logout, return to landing page 
app.get('/logout', (req, res) => {
  req.session.loggedin = false;
  req.session.username = "";
  res.render("landing", { 
    loggedInBool : req.session.loggedin,
    username : req.session.username});
});

//  flight search page route, made for testing. probably not in mvp 
app.get('/search', (req, res) => {
  res.render("search", { 
    loggedInBool : req.session.loggedin,
    username : req.session.username});
});

// go to Login Page
app.get('/loginPage', (req, res) => {
  res.render("login", { 
    loggedInBool : req.session.loggedin,
    username : req.session.username});
});

// go to register page 
app.get('/register', (req, res) => {
  res.render("register", { 
    loggedInBool : req.session.loggedin,
    username : req.session.username});
});

// go to database test page. just for DB testing. Not in mvp. 
app.get('/databaseTest', (req, res) => {
  res.render("databaseTest", { 
    loggedInBool : req.session.loggedin,
    username : req.session.username});
});


//-------- \/ Login Needed Area \/------------//
// All page routes below should require loggedin = true 

// Welcome page route for new accounts ( Different that normal landing page that those who aren't logged in see)
const questions = require("./models/questions.js")
app.get('/welcome', isLoggedIn, checkQuizComplete, (req, res) => {
  const quizComplete = req.session.quizCompleted;
  if (!quizComplete) {
    res.render("welcome", {
      loggedInBool : req.session.loggedin,
      username : req.session.username,
      questions : questions
    })
  } else {
    res.render("welcome", { 
      loggedInBool : req.session.loggedin,
      username : req.session.username
    });
  }
  
});

//______________________________________________________________________________
//
// This \/ should stay at the bottom. 
//______________________________________________________________________________

// Start the server
// define port from environment variable or 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//______________________________________________________________________________
//
// This /\ should stay at the bottom. 
//______________________________________________________________________________
