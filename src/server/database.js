import { MongoClient } from "mongodb";

const connectionString = "[connection-string]";
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
