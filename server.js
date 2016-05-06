"use strict";
var express = require("express"),
    //http = require("http"),
    bodyParser = require("body-parser"),
    mongo = require("mongoose"),
    sessions = require("client-sessions"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoURL = process.env.MONGODB_URI || "mongodb://localhost/accounts";
    
var fs = require("fs"),
    db;


// Start listening at port 3000
app.listen(port, function() {
    console.log("Server is listening at port " + port);
});

// connect to mongoDB
mongo.connect(mongoURL);

var userSchema = mongo.Schema({
    username: String,
    first: String,
    last: String,
    email: {
        type: String,
        unique: true    // 1 unique email per account
    },
    password: String,
    language: String,
    scientist: String,
    variable: String
});

// access the collection table called Users
var Users = mongo.model("Users", userSchema);


// middleware below...
// Set static route to html files.
app.use(express.static(__dirname + "/Client"));

app.get("/db.json", function(req, res){
    console.log("Server working");
    fs.readFile("db.json", "utf8", function (err, data) {
        db = JSON.parse(data);
    });

    res.send(db.users);
});
// used for parsing content type: application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

// setup the configurations for client-sessions
app.use(sessions({
    cookieName: "session", // cookie name dictates the key name added to the request object
    secret: "#lj39*(D823jf9*D793j3ldflj3,mn<Mnkjwe", // should be a large unguessable string
    duration: 30 * 60 * 1000, // how long the session will stay valid in ms

    // If expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    // to prevent the user from being logged out while they are using the site.
    activeDuration: 5 * 60 * 1000

    // add the below options for a more secure configuration
    //     httpOnly: true,  // prevents browser JavaScript from accessing cookies
    //     secure: true,    // ensures cookies are only used over https
    //     emphemeral: true // deletes the cookie when browser is closed
}));

// still working on this
// app.use(function(req, res, next) {
//     if (req.session.user && req.session.user) {
//
//     }
// });


/* ROUTES are defined below */

app.get("/checklogin", function(req, res) {
    if (req.session && req.session.user) {
        res.send(req.session.user.email);
    } else {
        res.status("401").send({
            error: "Unauthorized. Please login first"
        });
        //res.send("401");
    }
});

// login via mongoDB accounts database
app.post("/login", function(req, res) {
    console.log("User login for user: " + req.body.username);

    // search mongoDB for user's email
    Users.findOne({
        username: req.body.username
    }, function(err, user) {
        if (!user) {
            res.send("Error. This user is not registered.");
        } else {
            if (user.password === req.body.password) {
                console.log("Password matches");
                req.session.user = user;
                res.json(user);
            } else {
                console.log("Wrong password");
                res.send("Error. Wrong email or password");
            }
        }
    });
});

app.post("/register", function(req, res) {

    // check to make sure both password fields match
    if (req.body.pass1 === req.body.pass2) {
        var newUser = new Users({
            username: req.body.username,
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            password: req.body.pass1,
            language: req.body.language,
            scientist: req.body.scientist,
            variable: req.body.variable
        });

        // attempt to insert the new user account to mongo
        newUser.save(function(err) {
            if (err) {
                var error = "Error... Try again!";
                if (err.code === 11000) {
                    error = "Email already registered. Please register with another email.";
                }
                res.send(error);
            } else {
                //req.session.user = user; ??
                console.log("A new user was registered on the system.");
                //res.status("200").send("User was registered.");
                res.send("200");
            }
        });
    } else {
        res.send("Error. Make sure your passwords match.");
    }
});

app.post("/updateProfile", function(req, res) {
    console.log("User is updating profile");

    if (req.session && req.session.user.email) {
        Users.update({
                email: req.session.user.email
            }, {
                $set: {
                    language: req.body.language,
                    scientist: req.body.scientist,
                    variable: req.body.variable
                }
            },
            function(err) {
                if (err !== null) {
                    res.send("Profile updated.");
                } else {
                    res.send("Error, could not update profile." + err);
                }
            });
    } else {
        res.redirect("/login");
    }
});

app.get("/dashboard", function(req, res) {

    if (req.session && req.session.user) {
        var data = req.session.user;
        delete data.password; // remove the user password from object

        //res.send(req.session.user);
        res.send(data);
    } else {
        res.status("401").send({
            error: "Unauthorized. Please login first"
        });
    }
});

app.get("/logout", function(req, res) {

    console.log("User logging out");
    req.session.reset(); // erase session cookies
    res.redirect("/");
});

app.get("/customData", function(req, res) {
    if (req.session && req.session.user) {
        Users.findOne({
            email: req.session.user.email
        }, function(err, user) {
            if (err) {

            } else {
                // var data = {
                //     email : user.email,
                //     language : user.language,
                //     scientist : user.scientist,
                //     variable : user.variable
                // }

                var data = user;
                delete data.password; // remove the user password from object
                res.json(data);
            }
        });
    } else {
        res.status("401").send({
            error: "Unauthorized. Please login first"
        });
    }
});
