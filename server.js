var express = require("express"),
    // bodyParser = require("body-parser"),
    // mongodb = require("mongodb"),
    app = express(),
    mongoClient;

// Set static route to html files.
app.use(express.static(__dirname + "/Client"));

// Start listening at port 3000
app.listen(3000);
console.log("Server is listening at port 3000.");
