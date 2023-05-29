// Database 
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// 3/4 functions in this file but just two types. First two check if user is logged in. 
//  There are two for this because sometimes we want to redirect when logged in, and
//  sometimes we want to redirect when logged out.
// The other 2 check if the user has completed the 5-questions personality quiz.

// -----------------------------------------------------------------------

// Whenever called this function should check first if user session exists,
//  if it doesn't -> straight to login page. If it does, check if 
//  logged in. If so, continue-- no redirects. If not -> Login Page. 
function isLoggedIn(session){
    return function (req, res, next) {
        // session exists?
        if (!req.session || typeof req.session.loggedin == "undefined") {
            // console.log("Session.loggedin undefined. Redirecting");
            res.redirect("/loginPage");
            return;
        } else {} // exists, can continue
    
        const holder = req.session.loggedin;
        if (holder) { // is logged in, function will do nothing  
            // console.log("Continuing");
            next();
            return;
        } else { // not logged in. Redirect to login page
            console.log("Redirecting");
            res.redirect("/loginPage")
        }
    }
}

function isLoggedOut(session){
    return function ( req, res, next) {
        // console.log("isLoggedOut called");
        // session exists?
        if (typeof req.session.loggedin == "undefined") {
            // console.log("Session.loggedin undefined. Allowing to continue");
            next();
            return; 
        } else {} 
    
        const holder = req.session.loggedin;
        if (!holder) {
            // not logged in, continue
            next();
            return;
        } else {
            // logged in, redirect to welcome page
            res.redirect("/welcome");
        }
    }
}


function checkQuizComplete(session) {
    return async function (req, res, next) {
        console.log("checkQuizComplete called");
      if (typeof req.session.loggedin == "undefined" || !req.session.loggedin) {
        return next(); // Pass to the next middleware
      }
  
      console.log("Starting DB");
      client.connect();
      const database = client.db("Odyssey");
      const collection = database.collection("users");
      console.log('Connected');
  
      const username = req.session.username;
      const query = { username: username };
      
      console.log(`Username: ${username}`);
      const user = await collection.findOne(query);

      console.log(`t/f: ${user.quizCompleted}`);

      if (user.quizCompleted == "false" || typeof user.quizCompleted == "undefined" || user.quizCompleted == false) {
        console.log("Quiz not completed");
        req.session.quizCompleted = false;
        return next();        
      } else {
        console.log("Quiz Completed");
        req.session.quizCompleted = true;
        return next();
      }

      client.close();
    };
  }
  
  


module.exports = (session) => ({
    isLoggedIn: isLoggedIn(session),
    isLoggedOut: isLoggedOut(session),
    checkQuizComplete: checkQuizComplete(session)
  });
