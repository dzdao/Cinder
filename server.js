"use strict";
var express = require("express"),
    //http = require("http"),
    bodyParser = require("body-parser"),
    mongo = require("mongoose"),
    sessions = require("client-sessions"),
    stormpath = require("stormpath"),
    app = express();


// connect to mongoDB
mongo.connect("mongodb://localhost/accounts");

var userSchema = mongo.Schema({
    username : String,
    first : String,
    last : String,
    email : { type : String, unique : true }, // 1 unique email per account
    password : String,
    language : String,
    scientist : String,
    variable : String
});

// access the collection table called Users
var Users = mongo.model("Users", userSchema);


// middleware below...
//set up static file directory for default routing
app.use(express.static(__dirname + "/client"));

// used for parsing content type: application/json
app.use(bodyParser.urlencoded({ extended : true}));

// setup the configurations for client-sessions
app.use(sessions({
  cookieName: "session", // cookie name dictates the key name added to the request object
  secret: "#lj39*(D823jf9*D793j3ldflj3,mn<Mnkjwe", // should be a large unguessable string
  duration: 30 * 60 * 1000, // how long the session will stay valid in ms

  // If expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  // to prevent the user from being logged out while they are using the site.
  activeDuration: 5 * 60 *1000
}));

// a more secure configuration for sessions
// app.use(sessions({
//     cookieName: "session",
//     secret: "elkf23*(F#8h3r23rihH(@#*fh))",
//     duration: 30 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
//     httpOnly: true,  // prevents browser JavaScript from accessing cookies
//     secure: true,    // ensures cookies are only used over https
//     emphemeral: true // deletes the cookie when browser is closed
// }));

// app.use(function(req, res, next) {
//     if (req.session.user && req.session.user) {
//
//     }
// });



// create express powered http server
//http.createServer(app).listen(8000);
app.listen(8000, function() {
    console.log("Server is now listening on port 8000");
});

// app.on('storm.ready', function() {
//   console.log('Stormpath Ready');
// });

// function loginUser(userid, pass, callback) {
//
//     // get the Stormpath application
//     client.getApplication(applicationHref, function(err, application) {
//         if(err)
//             throw err;
//         else {
//             var authRequest = {
//                 username: userid,
//                 password: pass
//             };
//
//             // try to authenticate the account
//             application.authenticateAccount(authRequest, function(err, result) {
//                 // Description: If auth is successful, the result will have a method,
//                 // called getAccount(), for getting account details.
//                 // Input: Username and password
//                 // Output: If credentials are correct, a JSON object with account details is returned, otherwise,
//                 // an error is returned
//
//                 if(err) {
//                     //throw err;
//                     console.log("loginUser(): Error is: " + err);
//                     callback(err);
//                     //callback(user);
//                 }
//                 else {
//                     result.getAccount(function(err, account) {
//                         console.log("Authentication was sucessful. Account info: ", account);
//
//                         callback(account);
//                     });
//                 }
//             });
//         }
//     });
// }

// function getUserdata() {
//     // get the Stormpath application
//     client.getApplication(applicationHref, function(err, application) {
//         if(err)
//             throw err;
//         else {
//             var authRequest = {
//                 username: userid,
//                 password: pass
//             };
//
//             // try to authenticate the account
//             application.authenticateAccount(authRequest, function(err, result) {
//                 // Description: If auth is successful, the result will have a method,
//                 // called getAccount(), for getting account details.
//                 // Input: Username and password
//                 // Output: If credentials are correct, a JSON object with account details is returned, otherwise,
//                 // an error is returned
//
//                 if(err) {
//                     //throw err;
//                     console.log("loginUser(): Error is: " + err);
//                     callback(err);
//                     //callback(user);
//                 }
//                 else {
//                     result.getAccount(function(err, account) {
//                         console.log("Authentication was sucessful. Account info: ", account);
//
//                         var customData = account.customData;
//
//                         //callback(account);
//                         callback(account);
//                     });
//                 }
//             });
//         }
//     });
// }

/* ROUTES are defined below */



// login via mongoDB accounts database
app.post("/login", function(req, res) {
    console.log("User login for " + req.body.username);

    // search mongoDB for user's email
    Users.findOne({ username : req.body.username }, function(err, user) {
        if(!user) {
            res.send("Error. This user is not registered.");
        }
        else {
            if(user.password === req.body.password) {
                req.session.user = user;
                res.send("200");
            }
            else {
                console.log("Wrong password");
                res.send("Error. Wrong email or password");
            }
        }
    });
});

// login via stormpath database
// app.post("/login2", function(req, res) {
//     console.log("User login2");
//
//     console.log(req.body);
//     var userid = req.body.userid;
//     var pass = req.body.pass;
//
//     console.log(userid + " " + pass);
//
//     loginUser(userid, pass, function(user) {
//             req.session.user = user; // set encrypted cookie with user info
//             console.log("app.post(): user is: " + user);
//             res.json(user);
//
//     });
// });

app.post("/register", function(req, res) {

    // check to make sure both password fields match
    if(req.body.pass1 === req.body.pass2) {
        var newUser = new Users({
            username : req.body.username,
            first : req.body.first,
            last : req.body.last,
            email : req.body.email,
            password: req.body.pass1
        });

        // attempt to insert the new user account to mongo
        newUser.save(function(err) {
            if (err) {
                var error = "Error... Try again!";
                if(err.code === 11000) {
                    error = "Email already registered. Please register with another email.";
                }
                res.send(error);
            }
            else {
                //req.session.user = user; ??
                console.log("A new user was registered on the system.");
                //res.status("200").send("User was registered.");
                res.send("200");
            }
        });
    }
    else {
        res.send("Error. Make sure your passwords match.")
    }
});

app.post("/updateProfile", function(req, res) {
    console.log("User is updating profile");

    if(req.session && req.session.user.email) {
        Users.update({ email : req.session.user.email }, {
            $set :
            {
                language : req.body.language,
                scientist : req.body.scientist,
                variable : req.body.variable
            }},
        function(err) {
            if (err !== null) {
                res.send("Profile updated.");
            }
            else {
                res.send("Error, could not update profile." + err);
            }});
    }
    else {
        res.redirect("/login");
    }
});

app.get("/dashboard", function(req, res) {

    if(req.session && req.session.user) {
        var data = req.session.user;
        delete data.password;           // remove the user password from object

        //res.send(req.session.user);
        res.send(data);
    }
    else {
        res.status("401").send({ error : "Unauthorized. Please login first" });
    }
});

app.get("/logout", function(req, res) {

    console.log("User logging out");
    req.session.reset();    // erase session cookies
    res.redirect("/");
});

app.get("/checklogin", function(req, res) {
    if(req.session && req.session.user) {
        res.send(req.session.user.email);
    }
    else {
        res.status("401").send({ error : "Unauthorized. Please login first" });
        //res.send("401");
    }
});

app.get("/customData", function(req, res) {
    if(req.session && req.session.user) {
        Users.findOne({ email : req.session.user.email }, function(err, user) {
            if(err) {

            }
            else {
                // var data = {
                //     email : user.email,
                //     language : user.language,
                //     scientist : user.scientist,
                //     variable : user.variable
                // }

                var data = user;
                delete data.password;   // remove the user password from object
                res.json(data);
            }
        })
    }
    else {
        res.status("401").send({ error : "Unauthorized. Please login first" });
    }
});
