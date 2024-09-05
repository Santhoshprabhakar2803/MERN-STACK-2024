var express = require('express');
const { MongoClient } = require('mongodb'); 

var app = express();
app.use(express.json());
// main database
const ex = "office"
// url of the database
const url = 'mongodb+srv://Santhosh:Santhosh2803@cluster1.wztwm.mongodb.net/';
const client = new MongoClient(url);
// creating employee data using req.body
app.post("/createEmployee",async(req,res)=>{
    let {name,email,password,mobile_no} = req.body;
    let data = {
        "name" : name,
        "email" :  email,
        "password" : password,
        "mobile_no" : mobile_no,
    }
    // use to connect to the server        
    await client.connect();
    let db = client.db(ex);
    await db.collection('employee').insertOne(data);
    res.status(200).json({"message":"Employee Created"})
})

// for listing all employee details from mongoDB(Database)
app.get("/getemployee",async(req,res)=>{
    await client.connect();
    let db = client.db(ex);
    let list = await db.collection('employee').find({}).toArray();
    res.status(200).json(list)
});

// for getting specific employee details from mongoDB(Database)
app.get("/listempbyname/:name",async(req,res)=>{   // "/listempbyname/:name" => path variable
    await client.connect();
    let {name} = req.params; // postman url
    let db = client.db(ex);
    let list = await db.collection('employee').find({name:name}).toArray(); //find({name:name}) => mongodb 
    res.status(200).json(list)
})

// checking for login details of employee from database (2 condition) using req.body() for secure information
// postman => body => raw
// Type the email and password in postman(json format) in post method then send
// so it check both condition if it matches the information to the database it fetch the data from database and list in postman
app.post("/logindata",async(req,res)=>{
    await client.connect();
    let { email, password } = req.body; // postman url
    let db = client.db(ex);
    let list = await db.collection('employee').find({"email":email,"password":password}).toArray();

    if(list.length > 0){
        //res.json({"msg":"You are correct"})
        //res.status(200).json(list)
        res.status(200).json({
            "msg": "Login successful,correct details",
            "data": list
        });
    }else{
        res.json({"msg":"Email or password is incorrect"})
    }
    
})

// Start the Express server 
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// req.body => sending the details to server (secure) (json format)
// path variable => contain the data in the url so it's not secure (url format)