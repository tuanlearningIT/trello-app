import { MongoClient, ServerApiVersion } from "mongodb";
require('dotenv').config()

const uri = process.env.URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let dbInstance = null
const connectDB = async () => {
    // Connect the client to the server

    let conected = client.connect();
    // 
    dbInstance = await client.db(process.env.DATABASE_NAME)

    // client.close()
    return conected;

}
const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to database!')
    return dbInstance;
}
module.exports = {
    connectDB,
    getDB,
    client
};
