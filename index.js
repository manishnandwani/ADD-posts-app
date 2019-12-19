var express=require('express');
var server = express()
var bodyParser = require('body-parser');

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

// server.use(express.static('../public/view'));
server.use(express.static( "public"));
server.use(bodyParser.json())

var url = "mongodb://localhost:27017";
var db;

MongoClient.connect(url,function(err,client){
    db = client.db("demoDB");
    console.log("error :",err);
})

server.get("/list",function(req,res){
    console.log("test")
    db.collection("posts").find({}).toArray(function(err,results){
        console.log("test",results)
        res.json(results)
    },function(err){
        res.send('results.')
    })
})

server.post("/add",function(req,res){
    console.log("body",req.body)
    db.collection("posts").insertOne(req.body,function(err,results){
        // console.log("lets0---",results,err)
        if(err == null){
            res.json(req.body)
        }
    })
})

server.put("/edit",function(req,res){
    console.log("body",req.body)
    db.collection("posts").updateOne({_id :new mongodb.ObjectID( req.body._id)},{$set:{votes :req.body.votes}},function(err,results){
        // console.log("lets0---",results,err)
        if(err == null){
            // console.log("edit",results)
            res.json(req.body)
        }
        else{
            console.log(err)
        }
    })
})

server.listen(8000,function(){
    console.log("server started")
})
