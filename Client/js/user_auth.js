/*globals $:false*/

"use strict";
$(function() {

    console.log(localStorage.getItem("user"));
    // var currentUser = localStorage.getItem("user");

    var queryName = "user=" + localStorage.getItem("user");
    console.log(queryName);
    var socket = io("", {
        query: queryName
    });

    socket.on("user online", function(data) {
        data.forEach(function(item) {
            console.log(item);
            console.log(item.id + " " + item.user_name);
        });
    });

    socket.on("get msg", function(data) {
        console.log("getting message");
        console.log(data.msg);
    });

    // See if user is logged in. Use low-level ajax call in order to setup error handler because $.get does not allow for that.
    $.ajax({
        url: "/checklogin",
        type: "GET",
        success: function(data) {

            // user is logged in
            $("#nav-signup").hide();
            $("#nav-login").hide();
            $("#signup").hide();
            $("#login").hide();
            $("#nav-userid").text(data);

            console.log(data + " is logged in.");
        },
        error: function(err) {

            if (err.status === 401) {
                // user is NOT logged in
                $("#nav-logout").hide();
                $("#nav-match").hide();
                $("#nav-profile").hide();
                $("#nav-settings").hide();
                //$("#matches").hide();
                //$("#userTiles").hide();
                $("#settings").hide();
                console.log(err);
            } else {
                console.log(err);
            }
        }
    });

    $("#loginForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            console.log(errors);
        },
        submitSuccess: function($form, event) {
            event.preventDefault();

            var userid = $("input#login-userid").val();
            var pass = $("input#login-pass").val();

            $.ajax({
                url: "/login",
                type: "POST",
                //contentType: "application/json",
                dataType: "json",
                data: {
                    username: userid,
                    password: pass
                },
                success: function(data) {
                    console.log("Successful login: " + data);
                    location.reload();
                    //setting localStorage to keep username
                    localStorage.setItem("user", userid);

                    // sending userid to server of new logged in user
                    socket.emit("new online user", userid);

                    window.location.replace("/settings.html");
                },
                error: function(err) {
                    console.log("Error on login: " + err.responseText);
                    // Fail message
                    $("#success-login").html("<div class='alert alert-danger'>");
                    $("#success-login > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success-login > .alert-danger").append("<strong>Sorry " + userid + ", " + err.responseText + " Please try again!");
                    $("#success-login > .alert-danger").append("</div>");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("#signupForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log(errors);
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from signup FORM
            var userid = $("input#signup-userid").val();
            var firstName = $("input#fname").val();
            var lastName = $("input#lname").val();
            var userEmail = $("input#email").val();
            var password1 = $("input#signup-pass1").val();
            var password2 = $("input#signup-pass2").val();
            var lang = $("select#language").val();
            var sci = $("select#scientist").val();
            var varType = $("select#variable").val();
            var profilePicURL = "img/profile_pic/formal_girl.png";

            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = firstName.split(" ").slice(0, -1).join(" ");
            }

            $.ajax({
                url: "/register",
                type: "POST",
                //contentType: "application/json",
                dataType: "json",
                data: {
                    username: userid,
                    first: firstName,
                    last: lastName,
                    email: userEmail,
                    pass1: password1,
                    pass2: password2,
                    language: lang,
                    scientist: sci,
                    variable: varType,
                    picURL: profilePicURL
                },
                cache: false,
                success: function(data) {
                    console.log(data);
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $("#success-signup").html("<div class='alert alert-success'>");
                    $("#success-signup > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success-signup > .alert-success")
                        .append("<strong>Your account was created. Please login. </strong>");
                    $("#success-signup > .alert-success")
                        .append("</div>");

                    //clear all fields
                    $("#signupForm").trigger("reset");
                },
                error: function(err) {
                    console.log(err);
                    // Fail message
                    $("#success-signup").html("<div class='alert alert-danger'>");
                    $("#success-signup > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success-signup > .alert-danger").append("<strong>Sorry " + firstName + ", it seems like there was a problem. " + err.responseText + " Please try again!");
                    $("#success-signup > .alert-danger").append("</div>");
                    //clear all fields
                    //$('#signupForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
});