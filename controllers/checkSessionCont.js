


function isLoggedIn(req, res, next) {
    const holder = req.session.loggedin;
    if (holder) {
        console.log("Continuing");
        next();
    } else {
        console.log("Redirecting");
        res.redirect("loginPage")
    }
}


module.exports = { isLoggedIn };
