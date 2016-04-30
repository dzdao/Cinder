"use strict";
$(function() {
    $("login").on("click", function() {

        var user, password;
        user = $("#userid").val();
        password = $("#pass").val();

        $.post("/register", { userid : user, pass : password },
            function(data) {
                console.log(data);
                location.reload();
        });
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

            // get values from FORM
            var userid = $("input#userid").val();
            console.log(userid);

            var firstName = $("input#fname").val();
            var lastName = $("input#lname").val();
            var userEmail = $("input#email").val();
            console.log(userEmail);
            var password1 = $("input#pass1").val();
            var password2 = $("input#pass2").val();






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
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#signupForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
});
