import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://bilmart888:a39F108BA7@cluster0.rmgik7n.mongodb.net/TopraTek";
const dbName = "TopraTek";
const client = new MongoClient(connectionString);

let conn;

try {
    console.log("Connecting to MongoDB Atlas...");
    conn = await client.connect();
    console.log("Connected to MongoDB Atlas");
} catch (e) {
    console.error("Error connecting to MongoDB Atlas:", e);
    // Log additional information about the error
    if (e instanceof Error && e.name === 'MongoServerSelectionError') {
        console.error("Topology Description:", e.reason);
    }

    // Handle the error or throw it to be caught by the calling code
    throw e;
}

const db = conn.db(dbName);

export default db;
