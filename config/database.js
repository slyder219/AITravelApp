const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);


// adding a document 
async function adding() {
    try {
        console.log("Connecting to the db");
        const database = client.db("travelAI");
        const collection = database.collection("places");

        console.log("Making Doc");
        const doc = {
            abr : "NYC",
            country : "USA",
            state: "New York",
        }

        console.log("Inserting")
        const result = await collection.insertOne(doc);

        console.log(`Doc inserted with id ${result.insertedId}`);


    } finally {
        console.log("Closing the connection");
        await client.close();
    }
}

// adding().catch(console.dir);

// finding a document
async function finding() {
    try {
        const database = client.db("travelAI");
        const collection = database.collection("places");

        const query = { abr: "NYC" };

        const options = {
            sort: { abr: -1 },
        }

        const result = await collection.findOne(query, options);
        console.log(result);

    } finally {
        await client.close();
    }
}

// finding().catch(console.dir);

