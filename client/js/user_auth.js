"use strict";
$(function() {
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

            console.log(data);
        },
        error: function(err) {

            if(err.status === 401) {
                // user is NOT logged in
                $("#nav-logout").hide();
            }
            else {
                console.log(err);
            }
        }
    });



    $("#loginForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {

        },
        submitSuccess: function($form, event) {
            var userid = $("input#login-userid").val();
            console.log(userid);
            var pass = $("input#login-pass").val();
            console.log(pass);

            // $.post("/login", { username : userid, password : pass },
            //     function(data) {
            //         console.log(data);
            //         location.reload();
            // });

            $.ajax({
                url: "/login",
                type: "POST",
                dataType: "json",
                data: {
                    username: userid,
                    password: pass
                },
                success: function(data) {
                    console.log("Successful login: " + data);
                    location.reload();
                },
                error: function(err) {
                    console.log("Error: ");
                    console.log("Error on login: " + err);
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    $("#signupForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from signup FORM
            var userid = $("input#signup-userid").val();
            console.log(userid);

            var firstName = $("input#fname").val();
            var lastName = $("input#lname").val();
            var userEmail = $("input#email").val();
            console.log(userEmail);
            var password1 = $("input#signup-pass1").val();
            var password2 = $("input#signup-pass2").val();

            // var name = $("input#name").val();
            // var email = $("input#email").val();
            // var phone = $("input#phone").val();
            // var message = $("textarea#message").val();
            // var firstName = name; // For Success/Failure Message
            // // Check for white space in name for Success/Fail message
            // if (firstName.indexOf(' ') >= 0) {
            //     firstName = name.split(' ').slice(0, -1).join(' ');
            // }
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
                    pass2: password2
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#signupForm').trigger("reset");
                },
                error: function(err) {
                    console.log(err);
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems like there was a problem. " + err.responseText + " Please try again!");
                    $('#success > .alert-danger').append('</div>');
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
