"use strict";

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
