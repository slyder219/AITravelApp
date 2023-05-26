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


    // username: MxAdmin, password: feff
    // Connected
    // Username does not exist
    // Client closed

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
            req.session.username = username;
            // __________________________________________
            res.json({ message: "Login Successful" });

            return;
        } else{
            // NO MATCH 
            console.log("Incorrect Password");
            res.json({
                message: "Incorrect Password"
            });
            return;
        }
    } else {
        // DOESNT EXIST
        console.log("Username does not exist");
        res.json({
            message: "Username does not exist"
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