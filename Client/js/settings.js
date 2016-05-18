var main = function(userSession) {
    "use strict";

    $("#profilePic").attr({
        src: userSession.picURL
    });
    $("input#signup-userid").val(userSession.username);
    $("input#fname").val(userSession.first);
    $("input#lname").val(userSession.last);
    $("input#email").val(userSession.email);
    $("input#signup-pass1").val(userSession.password);
    $("select#language").val(userSession.language);
    $("select#scientist").val(userSession.scientist);
    $("select#variable").val(userSession.variable);

    $("span.name").text(userSession.first + " " + userSession.last);

    $("#updateForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log(errors);
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            var userid = $("input#signup-userid").val();
            var firstName = $("input#fname").val();
            var lastName = $("input#lname").val();
            var userEmail = $("input#email").val();
            var password1 = $("input#signup-pass1").val();
            var lang = $("select#language").val();
            var sci = $("select#scientist").val();
            var varType = $("select#variable").val();

            $.ajax({
                url: "/updateProfile",
                type: "POST",
                // contentType: "application/json",
                dataType: "json",
                data: {
                    username: userid,
                    first: firstName,
                    last: lastName,
                    email: userEmail,
                    pass: password1,
                    language: lang,
                    scientist: sci,
                    variable: varType
                },
                cache: false,
                success: function(data) {
                    console.log("posted");
                    console.log(data);
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $("#success-signup").html("<div class='alert alert-success'>");
                    $("#success-signup > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success-signup > .alert-success")
                        .append("<strong>Your profile was update! </strong>");
                    $("#success-signup > .alert-success")
                        .append("</div>");

                    //clear all fields
                    $("#signupForm").trigger("reset");
                },
                error: function(err) {
                    console.log("error");
                    console.log(err);
                    // Fail message
                    $("#success-signup").html("<div class='alert alert-danger'>");
                    $("#success-signup > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success-signup > .alert-danger").append("<strong>Sorry, it seems like there was a problem. " + err.responseText + " Please try again!");
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
};

$(document).ready(function() {
    "use strict";

    $.ajax({
        url: "/userSession",
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("get data");
            main(data);
        },
        error: function() {
            console.log("fail");
        }
    });
});