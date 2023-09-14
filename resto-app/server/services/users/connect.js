const { MongoClient } = require("mongodb");
// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://dimronn:IFHxdeshgcfGUjME@users.w5zullv.mongodb.net/?retryWrites=true&w=majority";

// Connect to your Atlas cluster
const client = new MongoClient(url);

const dbName = "restoapp";

let db

async function connect() {
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.log(err.stack);
  }
}

function getDb() {
    return db
}



module.exports= {
    connect,
    getDb
}
