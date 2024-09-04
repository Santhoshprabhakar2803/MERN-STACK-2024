const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://Santhosh:Santhosh2803@cluster1.wztwm.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'office';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const data = await db.collection('employee').find({}).toArray();
//   console.log(data);

//   // the following code examples can be pasted here...

//   return 'done.';
// }

async function insertData(){
    let empData = {
        "name" : "Santhosh",
        "mobile" : "8056082188",
        "address" : "Vadapalani"        
    }
    await client.connect();
    const db = client.db(dbName);
    const collection = await db.collection('employee');
    await collection.insertOne(empData);
    console.log("inserted")

}

insertData();

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());