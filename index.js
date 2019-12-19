var express=require('express');
var server = express()
var bodyParser = require('body-parser');

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

server.use(express.static( "public"));
server.use(bodyParser.json())

var url = "mongodb://54.89.215.71:27017";
var db;

MongoClient.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
},function(err,client){
    db = client.db("demoDB");
    console.log("error :",err);
})

server.get("/list",function(req,res){
    db.collection("posts").find({}).toArray(function(err,results){
        res.json(results)
    },function(err){
        res.send('results.')
    })
})

server.post("/add",function(req,res){
    db.collection("posts").insertOne(req.body,function(err,results){
        if(err == null){
            res.json(req.body)
        }
    })
})

server.put("/edit",function(req,res){
    db.collection("posts").updateOne({_id :new mongodb.ObjectID( req.body._id)},{$set:{votes :req.body.votes}},function(err,results){
        if(err == null){
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
