var jTinder = function () {
    var audio; // Credit: Audio files from http://www.livetim.tim.com.br/emotisounds/
    var lastEffect = _.sample(dislikedEffects, 1)[0];
    var likedList = [];
    var dislikedList = [];
    var currentIndex = -1;
    
    var $tinderSlideDiv = $("#tinderslide");

    var likedEffects = [
        {
            emoji: "😘",
            soundFile: "face-throwing-a-kiss.mp3"
        },
        {
            emoji: "💋",
            soundFile: "kiss-mark.mp3"
        },
        {
            emoji: "🎹",
            soundFile: "musical-notes.mp3"
        },
        {
            emoji: "🎉",
            soundFile: "party-popper.mp3"
        },
        {
            emoji: "😉",
            soundFile: "winking-face.mp3"
        }
    ];

    var dislikedEffects = [
        {
            emoji: "😤",
            soundFile: "face-with-look-of-triumph.mp3"
        },
        {
            emoji: "😣",
            soundFile: "disappointed-face.mp3"
        },
        {
            emoji: "🐐",
            soundFile: "goat.mp3"
        },
        {
            emoji: "🔪",
            soundFile: "hocho.mp3"
        },
        {
            emoji: "😠",
            soundFile: "angry-face.mp3"
        }
    ];
    
    var showResult = function () {
        $tinderSlideDiv.delay(800).hide( function () {
            var $container = $(".wrap");
            
            if(likedList.length === 0) {
                noMatchPrompt();
            } else {
                $container.append($("<h4>").text("You liked:"));
                
                likedList.forEach(function (name) {
                    $container.append($("<p>").text(name)).slideDown();
                });
            }
        });
    }

    var flickResponse = function (effect) {
            $('#status').html(effect.emoji).show().delay(500).fadeOut();
            audio = new Audio("../sounds/" + effect.soundFile);
            audio.play();
    };

    $tinderSlideDiv.jTinder({
        // dislike callback
        onDislike: function (item) {
            currentIndex = item.index();
            dislikedList.push($(".fade:nth-child(" + (currentIndex + 1) + ") h4").text());
            // set the status text
            var effect = _.sample(dislikedEffects, 1)[0];

            while (lastEffect === effect) {
                effect = _.sample(dislikedEffects, 1)[0];
            }

            flickResponse(effect);
            lastEffect = effect;
            if (currentIndex === 0) {
                showResult();
            }
        },
        // like callback
        onLike: function (item) {
            currentIndex = item.index();
            likedList.push($(".fade:nth-child(" + (currentIndex + 1) + ") h4").text());
            
            // set the status text
            var effect = _.sample(likedEffects, 1)[0];

            while (lastEffect === effect) {
                effect = _.sample(likedEffects, 1)[0];
            }

            flickResponse(effect);
            lastEffect = effect;
            
            if (currentIndex === 0) {
                showResult();
            }
        },
        animationRevertSpeed: 150,
        animationSpeed: 300,
        threshold: 1
    });
}

// var main = function () {
//     "use strict";
//     /**
//      * jTinder initialization
//      */
    
//     var $tinderSlideDiv = $("#tinderslide");
    
//     // Populate a match page
//     $tinderSlideDiv.hide();
    
//     var $icon = $("<i>").attr( { class: "fa fa-refresh fa-spin fa-3x fa-fw margin-bottom" } );
//     var $p = $("<p>").text("Matching...");
    
//     var $span = $("<span>").append($icon, $("<br>"), $("<br>"), $("<br>"), $p);
//     $(".wrap").append($span);
    
//     $.get("/matchUsers", function (data) {
//         if(data.length === 0) {
//             console.log("No match");
//         }
//         else {
//             var count = 1;
//             data.forEach(function (user) {
                
//                 // Creat new user tile
//                 var $userProfileImg = $("<img>").attr({
//                     src: "../img/portfolio/formal guy.png",
//                     name: "aboutme",
//                     width: "235",
//                     height: "235",
//                     class: "img-thumbnail"});
                    
//                 var $userNameH3 = $("<h3>").text(user.first + " " +user.last);
                
//                 var $newTileDiv = $("<div>").addClass("tile").append($userProfileImg, $userNameH3);

//                 var $buttonA = $("<a>").attr({
//                     href: "#aboutModal",
//                     "data-toggle": "modal",
//                     "data-target": "#myModal" + count,
//                 }).append($("<button>").attr({
//                     class: "btn btn-default",
//                     "data-dismiss": "modal"
//                 }).text("Hack me out!"));
                
//                 var $buttonDiv = $("<div>").addClass("chat-button").append($buttonA);
                
//                 var $newCardLi = $("<li>").addClass("pane").append($("<div>").addClass("span3 well").append($newTileDiv, $buttonDiv));
//                 var $swipeCardUl = $("#tinderslide ul").append($newCardLi);
//             });
            
//             count++;
//         }
//     }).done( function () {
//         setTimeout(function () {
//             $(".wrap span i, .wrap span p").fadeOut(function () {
//                 $(".wrap span i, .wrap span p, .wrap span br").remove();
//                 $tinderSlideDiv.slideDown();
//                 jTinder();
//             });
//         }, 2000);
//     } );
// }

// $(document).ready(main);

var noMatchPrompt = function () {
    var powerfulQuotes = [
        { 
            first: "“And suddenly you just know … ",
            second: "it’s time to start something new and trust the magic of beginnings.” -Meister Eckhart"
        },
        {
            first: "“It might take a year. It might take a day.",
            second: "But, what’s meant to be will always find a way.” - Unknown"
        },
        {
            first: "“We are sometimes taken into troubled waters",
            second: "not be drowned but to be cleansed.” - Unkown"
        },
        {
            first: "“Difficult roads",
            second: "often lead to beautiful destinations.” - Unkown"
        },
        {
            first: "“Faith and fear both demand you believe",
            second: "in something you cannot see. You choose.” – Bob Proctor"
        }
    ];
    
    var $icon = $("<i>").attr( { class: "fa fa-heart fa-5x fa-fw margin-bottom", "aria-hidden":"true" } );
    var $p1 = $("<h3>").text("Cannot find your match");
    var quote = _.sample(powerfulQuotes);
    var $p2 = $("<p>").text(quote.first);
    var $p3 = $("<p>").text(quote.second);
    
    var $span = $("<span>").append($icon, $("<br>"), $("<br>"), $("<br>"), $p1, $p2, $p3).fadeIn();
    $(".wrap").append($span);
}

function appViewModel () {
    var $tinderSlideDiv = $("#tinderslide");
    var noMatch = false;
    
    // Populate a match page
    $tinderSlideDiv.hide();
    
    var $icon = $("<i>").attr( { class: "fa fa-refresh fa-spin fa-3x fa-fw margin-bottom" } );
    var $p = $("<p>").text("Matching...");
    
    var $span = $("<span>").append($icon, $("<br>"), $("<br>"), $("<br>"), $p);
    $(".wrap").append($span);
    var self = this;
    self.users = ko.observableArray([]);
    
    var incrementCount = function () {
        
    }
        
    $.ajax({
        url: "/matchUsers",
        type: "GET", 
        dataType: "json",
        success: function (data) {
            console.log(data.status);
            if(data.length === 0) {
                noMatch = true;
            }
            else {
                self.users(data);
                    
                setTimeout(function () {
                    $(".wrap span i, .wrap span p").fadeOut(function () {
                        $(".wrap span i, .wrap span p, .wrap span br").remove();
                        
                        if(noMatch === false) {
                            $tinderSlideDiv.slideDown();
                            jTinder();
                        }
                        else {
                            noMatchPrompt();
                        }
                    });
                }, 2000);
            }
        },
        error: function (error){
            $(".wrap span p").text(error.responseText).fadeIn();
        }
    });
    
}

ko.applyBindings( new appViewModel() );