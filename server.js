var express = require("express"),
    // bodyParser = require("body-parser"),
    // mongodb = require("mongodb"),
    app = express(),
    mongoClient,
    users = [
		{
			"username": "jasondoe",
			"first": "Jason",
			"last": "Doe",
			"email": "jason@doe.com",
			"password": "jason",
			"lang": "C++",
			"scientist": "Grace Hopper",
			"variable": "global = open and friendly with everyone"
		},
		{
			"username": "jane",
			"first": "Jane",
			"last": "Vi",
			"email": "jane@vi.com",
			"password": "jane",
			"lang": "C++",
			"scientist": "Darwin",
			"variable": "global = open and friendly with everyone"
		},
				{
			"username": "holly",
			"first": "holly",
			"last": "ho",
			"email": "holly@ho.com",
			"password": "holly",
			"lang": "Javascript",
			"scientist": "Darwin",
			"variable": "global = open and friendly with everyone"
		}
		,
				{
			"username": "test",
			"first": "holly",
			"last": "ho",
			"email": "holly@ho.com",
			"password": "holly",
			"lang": "Javascript",
			"scientist": "Darwin",
			"variable": "global = open and friendly with everyone"
		}
	]
    //port = process.env.PORT || 3000;


// Set static route to html files.
app.use(express.static(__dirname + "/Client"));

// Start listening at port 3000
app.listen(3000);
//console.log("Server is listening at port " + port);

app.get("/db.json", function(req, res){
    console.log("Server working");
    res.send(users);
});
