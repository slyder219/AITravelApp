const { MongoClient } = require("mongodb");
const { validate } = require("jsonschema");
const bcrypt = require("bcrypt");
const userSchema = require("../schemas/user.json");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function handleRegister(req, res) {
  const { username, password, email } = req.query;

  console.log(`username: ${username}, password: ${password}, email: ${email}`);

  try {
    bcrypt.hash(password, 10)
      .then(async function(hash) {
        const newUser = {
          username: username,
          passwordHash: hash,
          email: email
        };

        // print the newuser json object as string to console
        console.log(JSON.stringify(newUser));

        const validationResult = validate(newUser, userSchema);
        if (validationResult.valid) {
          console.log("Valid format. Connecting to DB.");
          
          await client.connect();
          const database = client.db("Odyssey");
          const collection = database.collection("users");
          console.log("Connected");

          // check if username already exists
          const query = { username: username };
          const existing = await collection.findOne(query);
          if (existing) {
            console.log("Username already exists");
            res.json({ message: "Username already exists" });
            return;
          } else {
            console.log("Usernmame does not exist, moving on to saving newUser.");
          };


          await collection.insertOne(newUser);
          console.log("Document saved successfully");
          res.json({ message: "User saved successfully" });
        } else {
          console.log("Validation errors:");
          validationResult.errors.forEach(error => {
            console.log(`- ${error.stack}`);
          });
          res.json({ message: "Validation errors" });
        }
      });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "Try to connect to DB failed" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

module.exports = { handleRegister };
