const { MongoClient } = require("mongodb");
const { validate } = require("jsonschema");
const placeSchema = require("../schemas/places.json");

const uri = process.env.MONGO_URI;
// process.env.MONGO_URI;
const client = new MongoClient(uri);

async function newDocument(req, res) {

  const { abr, country, state } = req.query;
  
  const newDoc = {
    abr: abr,
    country: country,
    state: state
  };

  try {
    console.log("Connecting to the database");
    await client.connect();

    const database = client.db("travelAI");
    const collection = database.collection("places");
    console.log("Connected");
    // Test if the document is valid
    const validationResult = validate(newDoc, placeSchema);
    if (validationResult.valid) {
      // Save the document to the database
      console.log("Valid");
      await collection.insertOne(newDoc);

      console.log("Document saved successfully");
      res.json({ message: "Document saved successfully" });
    } else {
      console.log("Validation errors:");
      validationResult.errors.forEach(error => {
        console.log(`- ${error.stack}`);
      res.json({ message: "Validation errors" })
      });

    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "Try to connect to DB failed" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

module.exports = { newDocument };
