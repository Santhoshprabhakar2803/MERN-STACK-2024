var express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 
var jwt = require('jsonwebtoken');// For using job token @jwt nodejs
// npm i express-fileupload (for file upload concept)
// File upload can be done only with POST method

var app = express();
app.use(express.json());

// enable to run on diffrent portal
var cors = require("cors");
const fileUpload = require('express-fileupload');
app.use(cors());

// Limit for user for uploading file
app.use(fileUpload({
    limits : {fileSize: 50 * 1024 * 1024},
}));

// middle ware for token verification
// unauthorized person can't access the data so  we use middleware(token)
// Use next in  the middleware to pass control to the next middleware function in the stack
app.use('/api/',(req,res,next)=>{
    // reading the header from the header
    let {token} = req.headers;
    if(token == "" || token == undefined){
        res.json({"msg":"please send the token"})
    }else{
        jwt.verify(token, 'SECRET');
        next();
    }
});

// main database
const ex = "job_portal"
// url of the database
const url = 'mongodb+srv://Santhosh:Santhosh2803@cluster1.wztwm.mongodb.net/';
const client = new MongoClient(url);
// creating employee data using req.body
app.post("/createjob",async(req,res)=>{
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
    await db.collection('job1').insertOne(data);
    res.status(200).json({"message":"Job Created"})
})

// for listing all Job details from mongoDB(Database)
app.get("/api/getjob",async(req,res)=>{
    await client.connect();
    let db = client.db(ex);
    let list = await db.collection('job1').find({}).toArray();
    res.status(200).json(list)
});

// for getting specific employee details from mongoDB(Database)
// http://localhost:3000/listjobbyname/santhosh
app.get("/api/listjobbyname/:name",async(req,res)=>{   // "/listempbyname/:name" => path variable
    await client.connect();
    let {name} = req.params; // postman url
    let db = client.db(ex);
    let list = await db.collection('job1').find({name:name}).toArray(); //find({name:name}) => mongodb 
    res.status(200).json(list)
})

// checking for login details of employee from database (2 condition) using req.body() for secure information
// postman => body => raw
// Type the email and password in postman(json format) in post method then send
// so it check both condition if it matches the information to the database it fetch the data from database and list in postman
app.post("/joblogin",async(req,res)=>{
    await client.connect();
    let { email, password } = req.body; // postman url
    let db = client.db(ex);
    let list = await db.collection('job1').find({"email":email,"password":password}).toArray();

    if(list.length > 0){
        //res.json({"msg":"You are correct"})
        //res.status(200).json(list)
        var token_n = jwt.sign({ "name": list[0]['name'] }, 'SECRET');
        res.status(200).json({
            "msg": "Login successful,correct details","token":token_n,
            "data": list
        });
    }else{
        res.json({"msg":"Email or password is incorrect"})
    } 
})

app.delete("/api/deletejobbyname",async(req,res)=>{
    let {id} = req.query;
    await client.connect();
    let db = client.db(ex);
    await db.collection("job1").deleteOne({"_id":new ObjectId(id)})
    res.json({"msg":"user deleted"})
})

/* This code snippet is handling a PUT request to update the password of a job in the MongoDB database.
Here's a breakdown of what it does: */
app.put("/api/updatejobbyname",async(req,res)=>{
    let {name,password} = req.query;
    await client.connect();
    let db = client.db(ex);
    await db.collection("job1").updateOne({"name":name},{
        $set: {"password":password}
        });
    res.status(200).json({"message":"Data updated successfully"})
});

// Using post method
app.post('/api/updatejob',async(req,res)=>{
    let{name,email,id} = req.body;
    await client.connect();
    let db = client.db(ex);
    await db.collection("job1").updateOne({"_id":new ObjectId(id)},{
        $set:{"email":email}
    });
    res.json({"message":"Password updated successfully"});
})

app.get('/api/updatejobusingget',async(req,res)=>{
    let{id} = req.query;
    await client.connect();
    let db = client.db(ex);
    // we should import Objectid [const { MongoClient, ObjectId } = require('mongodb');] 
    // This code getting data from mongodb using the objectid() new is a keyword
    let data = await db.collection("job1").find({"_id":new ObjectId(id)}).toArray();
    res.json(data)
})

// Simple file uplaod code
//app.post('/upload',function(req,res){
  //  console.log(req.files.foo) // foo -> is a file name
//});

// File upload concept
// Create one folder called uploads in express
// Go to post man -> Enter url -> body -> form-data
// enter key(img) , choose option as file instead of text and choose file in file column and hit the url
app.post('/upload',function(req,res){
    let file = req.files.img; // img -> key postman
    let uploadpath = __dirname + '/uploads/' + file.name; // __dirname ->  current directory +


    file.mv(uploadpath,function(err){
        if(err){
            return res.status(500).send(err)
        }else{
            res.send("File uploaded successfully")
        }
    })
}) 


// Start the Express server 
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});


// req.body => sending the details to server (secure) (json format)
// path variable => contain the data in the url so it's not secure (url format)
// npm i cors -> helps to run both react and express in diffrent portal
// var cors = require("cors")
// app.use(cors());