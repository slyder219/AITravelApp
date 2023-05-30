const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function checkLogin(req, res) {
    // get vars
    const { username, password } = req.query;
    console.log(`username: ${username}, password: ${password}`);

    try {
        // connect to db
    await client.connect();
    const database = client.db("Odyssey");
    const collection = database.collection("users");
    console.log("Connected");



    // query users with the username
    const query = { username: username };
    const existing = await collection.findOne(query);
    if (existing) {
        // save its passwordHash 
        const passwordHash = existing.passwordHash;
        // compare passwordHash with bcrypt
        const match = await bcrypt.compare(password, passwordHash);
        if(match) {
            // MATCH 
            console.log("Login Successful");
            // __________________________________________
            req.session.loggedin = true;
            console.log("Session loggedin set to true");
            req.session.username = username;
            // __________________________________________
            console.log("Sending back true")
            res.json({
                    success: true,
                    message : "Login Successful"});
        } else{
            // NO MATCH 
            console.log("Incorrect Password");
            console.log("Sending back false")
            res.json({
                success: false,
                message: "Incorrect password"
            });
            return;
        }
    } else {
        // DOESNT EXIST
        console.log("Username does not exist");
        console.log("Sending back false")
        res.json({
            success: false,
            message: "Username not found"
        });
        return;
    }

    } catch {
        console.error("Error:", error);
        res.json({ message: "Try to connect to DB failed" });

    } finally {
        await client.close();
        console.log("Client closed");

    }


    





}

module.exports = { checkLogin };