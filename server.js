var express = require("express"),
    // bodyParser = require("body-parser"),
    // mongodb = require("mongodb"),
    app = express(),
    mongoClient,
    users = [
		{
			"username": "jasondoe",
			"name": "Jason Doe",
			"lang": ["c++", "java"],
			"ide": ["bracket", "vi"],
			"hobby": ["video games, movies"]
		},
		{
			"username": "janekim",
			"name": "Jane Kim",
			"lang": ["java", "python"],
			"ide": ["bracket", "visual studio code", "atom"],
			"hobby": ["video games, musics"]
		},
		{
			"username": "nathanwankhade",
			"name": "Nathan Wankhade",
			"lang": ["c++", "python"],
			"ide": ["vi", "code", "xcode"],
			"hobby": ["movies, musics"]
		},
		{
			"username": "nathanwankhade",
			"name": "Nathan Wankhade",
			"lang": ["c++", "python"],
			"ide": ["vi", "code", "xcode"],
			"hobby": ["movies, musics"]
		},
		{
			"username": "nathanwankhade",
			"name": "Nathan Wankhade",
			"lang": ["c++", "python"],
			"ide": ["vi", "code", "xcode"],
			"hobby": ["movies, musics"]
		},
		{
			"username": "nathanwankhade",
			"name": "Nathan Wankhade",
			"lang": ["c++", "python"],
			"ide": ["vi", "code", "xcode"],
			"hobby": ["movies, musics"]
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
