var express = require("express");
var app = express();
// app.use(express.json()); [use this if ur using body instead of query]
app.get("/myname",(req,res)=>{
    res.json({"msg":"yourname"});
});

app.post("/myname",(req,res)=>{
    res.json({"msg":"your post name"});
});

app.post("/login",(req,res)=>{
    //let {email,password,name,address} = req.body

    let email = req['query']['email']
    let pwd = req['query']['password']
	let uname = req['query']['name']
	let adrs = req['query']['address']
    
	console.log(email, pwd)

	if(email == 'admin@gmail.com' && pwd == 'admin' && uname == 'kadmin' && adrs == '12, b st, c nagar, d 600 001'){
        res.json({"msg":"You are correct"})
    }else{
        res.json({"msg":"You are Incorrect"})
    }
});

//method 2
app.post("/loginn",(req,res)=>{
    let {email,password,name,address} = req.query;
    
	if(email == 'admin@gmail.com' && password == 'admin' && name == 'kadmin' && address == '12, b st, c nagar, d 600 001'){
        res.json({"msg":"You are correct"});
    }else{
        res.json({"msg":"You are Incorrect"});
    }
});

app.listen(8080,()=>{
    console.log("Server Started")
});