var main = function () {
    
    var curUser = localStorage.getItem("user")
    var queryName = "user=" + curUser;
    console.log(queryName);
    var socket = io('localhost:3000', {query: queryName});
    var userToSendMesssage;
    $("#userTiles").on("click", "button", function () {
        
        // button id is named buttonUSERNAME
        // ex) holly's button is buttonHOLLY
        // take substring of buttonid to get username of user who will receive message
        userToSendMesssage =  $(this).attr('id').substring(6)
        $("#live-chat").show();
        $("#live-chat h4").text(userToSendMesssage);
        
    });
    
    
    $("#chat-submit").on("click", function(e){
        // prevent from submitting form
        e.preventDefault();
        
        var msg = $("#chat-message").val();
        socket.emit('chat', {msg: msg, userToSend: userToSendMesssage, userWhoSent: curUser});
        console.log(msg);
        
        //Append current message the user just wrote to her/his chatbox
        
        var $chat_msg = $("<div>").addClass("chat-message clearfix");
        var $img = $("<img>")//.attr({
        //     "src": "http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32"
        // })
        
        var $chat_msg_content = $("<div>").addClass("chat-message-content clearfix");
        
        // things to append to $chat_msg_content
        var $chat_time = $("<span>").addClass("chat-time").text("11:11pm")
        var $h5 = $("<h5>").text(curUser);
        var $p = $("<p>").text(msg);
        
        $chat_msg_content.append($chat_time, $h5, $p);
        
        $chat_msg.append($img, $chat_msg_content);
        $(".chat-history").append($chat_msg, $("<hr>"));
        
        // end of generateing message to chatbox
   
        $("#chat-message").val('')
    });
    

    
    // logging user out
    $("#logout").on("click", function () {
        console.log("take user out of online users");

        $.get("/logout", function () {

            console.log("deleting user : " + curUser)
            socket.emit('delete user', curUser);

            // remove user from localStorage
            localStorage.removeItem("user");

            window.location.href = "index.html"
        });
    });
    // when someone sends message to user
    socket.on('get msg',function(data){
        console.log("getting message");
        console.log(data);
        
        var fromUser = data.fromUser;
        var msg = data.msg;
        
         // Change heading of chat box to user who sent message
         $("#live-chat h4").text(fromUser);
         
         // TO FIX BUG BUT WILL PROBABLY NEED TO FIGURE OUT A BETTER WAY TO DO THIS
         userToSendMesssage = fromUser
        
        //Generating chatbox content
        //Append msg to chatbox
        
        var $chat_msg = $("<div>").addClass("chat-message clearfix");
        var $img = $("<img>")//.attr({
        //     "src": "http://lorempixum.com/32/32/people"
        // })
        
        var $chat_msg_content = $("<div>").addClass("chat-message-content clearfix");
        
        // things to append to $chat_msg_content
        var $chat_time = $("<span>").addClass("chat-time").text("11:11pm")
        var $h5 = $("<h5>").text(fromUser);
        var $p = $("<p>").text(msg);
        
        $chat_msg_content.append($chat_time, $h5, $p);
        
        $chat_msg.append($img, $chat_msg_content);
        $(".chat-history").append($chat_msg, $("<hr>"));
        
        // end of generateing message to chatbox
   
        //need to generate message box to popup
        $("#live-chat").show();
        
    })
    // retrieving user's buddy list and displaying as tiles
    $.get("/buddies", function (users) {
        
        var getUser = [];
        
        // If users didn't look for particular hashtag, then display 8 random profiles
        if (_.isEmpty(getUser)) {
            getUser = _.sample(users, 4);
        }
        
        if(_.isEmpty(users)) {
            var $icon = $("<i>").attr( { class: "fa fa-heart-o fa-5x fa-fw margin-bottom", "aria-hidden":"true" } );
            var $h3 = $("<h3>").text("You have none. Please try Let Us Chill.");

            var $span = $("<span>").addClass("no_buddies_span").append($icon, $("<br>"), $("<br>"), $("<br>"), $h3).hide();
            $("#userTiles").append($span.fadeIn(1000));
        }
        
        // console.log(users);
        getUser.forEach(function (user) {
            // Generating HTML Template for Tile
            var $col = $("<div>").addClass("col-md-3");
            var $span = $("<div>").addClass("span3 well");
            var $tile = $("<div>").addClass("tile");
            
            var $a = $("<a>").attr({
                "href": "#aboutModal", 
                "data-toggle": "modal",
                "data-target": "#" + user.username
            });
            var $img = $("<img>").attr({
                "src": "../" + user.picURL,
                "width": "140",
                "height": "140",
                "class": "img-thumbnail"
            });
            $a.append($img);
            
            var $h3 = $("<h3>").text(user.first + " " + user.last);
            
            var $chat_button = $("<div>").addClass("chat-button");
            var $button = $("<button>").attr({
                "type": "button",
                "class": "btn btn-default",
                "data-dismiss": "modal",
                "id": "button" + user.username
            })
            $button.text("Chat with me!");
            $chat_button.append($button);
            
            
            $tile.append($a, $h3, $button);
            $span.append($tile);
            $col.append($span);
            
            // End of generating HTML Template for Tile
            
            // Generating Template for Modal
            var $modal_fade = $("<div>").attr({
                "class": "modal fade",
                "id": user.username,
                "tabIndex": "-1",
                "role": "dialog",
                "aria-labelledby": "myModalLabel",
                "aria-hidden": "true"
            });
            var $modal_dialog = $("<div>").addClass("modal-dialog");
            
            // modal-content
            var $modal_content = $("<div>").addClass("modal-content");
            
            // modal-header
            var $modal_header = $("<div>").addClass("modal-header");
            $button = $("<button>").attr({
                "type": "button",
                "class": "close",
                "data-dismiss": "modal",
                "aria-hidden": "true"
            })
            var $h4 = $("<h4>").attr({
                "class": "modal-title",
                "id": "myModalLabel"
            })
            $h4.text(user.username)
            $modal_header.append($button, $h4);
            
            
            // modal-body
            $modal_body = $("<div>").addClass("modal-body");
            $img = $("<img>").attr({
                "src": "../" + user.picURL,
                "width": "140",
                "height": "140",
                "class": "img-thumbnail"
            });
            $h3 = $("<h3>").addClass("media-headerin").text(user.first + " " + user.last);
            $span = $("<span>").text("Languages ");
            $language = $("<span>").addClass("label label-warning").text(user.language);
            $p = $("<p>").addClass("text-center");
            $p.text(user.variable);
            $strong = $("<strong>").text("Variable based on personality: ").append("<br>");
            $p.prepend($strong)
            $p1 = $("<p>").addClass("text-center");
            $p1.text(user.scientist);
            $strong1 = $("<strong>").text("Favorite computer scientist: ").append("<br>");
            $p1.prepend($strong1)
            $modal_body.append($img, $h3, $span, $language, $("<hr>"), $p, $p1);
            
            // // modal-footer
            $modal_footer = $("<div>").addClass("modal-footer");
            $modal_exit_button = $("<div>").addClass("modal-exit-button");
            $button = $("<button>").attr({
                "type": "button",
                "class": "btn btn-default",
                "data-dismiss": "modal",
                "aria-hidden": "true"
            })
            $button.text("I've heard enough about " + user.first);
            
            $unbuddyButton = $("<button>").attr({
                "type": "button",
                "class": "btn btn-danger",
                "data-dismiss": "modal",
                "aria-hidden": "true"
            }).on("click", function () {
                $.ajax({
                    url: "/buddies",
                    type: "DELETE", 
                    dataType: "json",
                    data: { buddy: user.username },
                    success: function (res) {
                        console.log(res.status);
                        location.reload();
                    },
                    error: function (res) {
                        console.log(res.responseText);
                    }
                });
            });
            
            $unbuddyButton.text("Unbuddy " + user.first);
            
            $modal_footer.append($modal_exit_button.append($button, $unbuddyButton));
            
            $modal_content.append($modal_header, $modal_body, $modal_footer);
            $modal_dialog.append($modal_content);
            $modal_fade.append($modal_dialog);
            
            // End generating modal
            
            // Append Tile and Modal
            $("#userTiles").append($col ,$modal_fade);

        });
    });
};

$(document).ready(function() {
    main();
    
    $("#live-chat").hide();
    // CHATBOX JAVASCRIPT credit to 
    $('#live-chat header').on('click', function () {

        $('.chat').slideToggle(300, 'swing');
        //$('.chat-message-counter').fadeToggle(300, 'swing');

    });

    $('.chat-close').on('click', function (e) {

        e.preventDefault();
        $('#live-chat').fadeOut(300);

    });
  
});

