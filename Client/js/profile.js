var main = function () {

    $.get("/db.json", function (users) {
        var getUser = [];
        
        // If users didn't look for particular hashtag, then display 8 random profiles
        if (_.isEmpty(getUser)) {
            getUser = _.sample(users, 4);
        }
        
        console.log(users);
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
                "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R",
                "width": "140",
                "height": "140",
                "class": "img-circle"
            });
            $a.append($img);
            
            var $h3 = $("<h3>").text(user.username);
            
            var $chat_button = $("<div>").addClass("chat-button");
            var $button = $("<button>").attr({
                "type": "button",
                "class": "btn btn-default",
                "data-dismiss": "modal"
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
            $h4.text(user.first + " " + user.last)
            $modal_header.append($button, $h4);
            
            
            // modal-body
            $modal_body = $("<div>").addClass("modal-body");
            $img = $("<img>").attr({
                "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R",
                "width": "140",
                "height": "140",
                "class": "img-circle"
            });
            $h3 = $("<h3>").addClass("media-headerin").text(user.first);
            $span = $("<span>").text("Languages ");
            $language = $("<span>").addClass("label label-warning").text(user.lang);
            $p = $("<p>").addClass("text-left");
            $p.text(user.variable + " " + user.scientist);
            $strong = $("<strong>").text("Bio: ").append("<br>");
            $p.prepend($strong)
            $modal_body.append($img, $h3, $span, $language, $("<hr>"), $p);
            
            
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
            $modal_footer.append($modal_exit_button.append($button));
            
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
});

