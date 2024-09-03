var express = require("express");
var app = express();
app.get("/myname",(req,res)=>{
    res.json({"msg":"yourname"});
});
app.post("/myname",(req,res)=>{
    res.json({"msg":"your post name"});
});
app.listen(8080,()=>{
    console.log("Server Started")
});