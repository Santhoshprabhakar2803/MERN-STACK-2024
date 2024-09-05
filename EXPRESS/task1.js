var express = require('express');
const { MongoClient } = require('mongodb'); // This should be always at beginning  of the file

var app = express();
app.use(express.json());
app.post("/createtask",async(req,res)=>{
    let body = req.body;
    //let {name,age,date,city,task} = req.body
    let t = {
        "name" : body['name'],
        "age" :  body['age'],
        "date" : body['date'],
        "city" : body['city'],
        "task" : body['task'],
    }
    const url = 'mongodb+srv://Santhosh:Santhosh2803@cluster1.wztwm.mongodb.net/';
    const client = new MongoClient(url);
    // Database Name
    const dbName = 'task';
    
    console.log('Connected to server successfully');
    
    await client.connect();
    let db = client.db(dbName);
    await db.collection('task1').insertOne(t);
    res.status(200).json({"message":"Created a record"})


})

// Start the Express server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});