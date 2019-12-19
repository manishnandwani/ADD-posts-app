var express = require('express');
var server = express()
var bodyParser = require('body-parser');

// var mongodb = require("mongodb");
// var MongoClient = mongodb.MongoClient;
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

server.use(express.static("public"));
server.use(bodyParser.json())

var url = "mongodb://localhost:27017";
var _db;
mongoose.connect(url, function (err, db) {
    if (err)
        console.log(err)
    _db = db;
    console.log('Connection established to');
});

// MongoClient.connect(url, function (err, client) {
//     db = client.db("demoDB");
//     console.log("error :", err);
// })

server.get("/list", function (req, res) {
    _db.collection("posts").find({}).toArray(function (err, results) {
        res.json(results)
    }, function (err) {
        res.send('results.')
    })
})

server.post("/add", function (req, res) {
    _db.collection("posts").insertOne(req.body, function (err, results) {
        if (err == null) {
            res.json(req.body)
        }
    })
})

server.put("/edit", function (req, res) {
    _db.collection("posts").updateOne({
        _id: ObjectId(req.body._id)
    }, {
        $set: {
            votes: req.body.votes
        }
    }, function (err, results) {
        if (err == null) {
            res.json(req.body)
        } else {
            console.log(err)
        }
    })
})

server.listen(8000, function () {
    console.log("server started")
})
