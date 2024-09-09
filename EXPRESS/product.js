var express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json()); // for using body 
const p = 'product'; // Main database
// URL of the database
const url = 'mongodb+srv://Santhosh:Santhosh2803@cluster1.wztwm.mongodb.net/';
const client = new MongoClient(url);

// Creating product details using req.body
app.post('/createproduct',async(req,res)=>{
    let {Product_Name,Price,Qty,Ratings} = req.body;
    let data = {
        "Product_Name" : Product_Name,
        "Price" : Price,
        "Qty" : Qty,
        "Ratings" : Ratings,
    };
    // Connect to the postman server
    await client.connect();
    let db = client.db(p);
    await db.collection('product1').insertOne(data);
    res.status(200).json({"message":"Product added successfully"});
});

// Listing all the data from mongodb to postman
app.get('/listproduct', async (req, res) => {
    await client.connect();
    let db = client.db(p);
    let data = await db.collection('product1').find().toArray();
    res.status(200).json(data);
});

// For getting specific employee details from mongoDB(Database)
// http://localhost:3000/listproductbyname/Laptop => Postman url
app.get('/listproductbyname/:Product_Name',async(req,res)=>{
    await client.connect();
    let {Product_Name} = req.params;
    let db = client.db(p);
    let filterproduct = await db.collection('product1').find({Product_Name:Product_Name}).toArray();
    res.status(200).json(filterproduct);
})
// GPT 
app.get('/pricerangeproduct',async(req,res)=>{
    await client.connect();
    let {Price,Price2} = req.params;
    let db = client.db(p);
    let list = await db.collection('product1').find({"Price":{$gte : Price,$lte : Price2}}).toArray();
    res.status(200).json(list); // $gte -> greater than equal to $lte -> less than equal to
})

// Start the Express server 
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});