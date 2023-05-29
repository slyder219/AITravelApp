9// express
const express = require('express');
const app = express();
// session
const session = require('express-session');
// path 
const path = require('path');
// set up sessions
app.use(session({
    secret: process.env.SESSION_SECRET || "buftycgvgvycgvhbi",
    resave: false,
    saveUninitialized: false,
  }));

// Two function in this file. First checks for logged in, continues if so, redirects if not.
// Second checks for logged OUT and CONTINUES if so, redirects to Welcome is not. This prefaces
//  the landing page 

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


module.exports = (session) => ({
    isLoggedIn: isLoggedIn(session),
    isLoggedOut: isLoggedOut(session)
  });
