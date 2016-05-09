var main = function () {
	"use strict";
	/**
	 * jTinder initialization
	 */
	
	var audio; // Credit: Audio files from http://www.livetim.tim.com.br/emotisounds/
	var lastEffect = _.sample(dislikedEffects, 1)[0];
	var likedList = [];
	var dislikedList = [];
	var currentIndex = -1;

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
		console.log(likedList);
		$("#tinderslide").delay(800).hide( function () {
			var container = $(".wrap");
			container.append($("<h4>").text("You liked:"));
			
			likedList.forEach(function (name) {
				container.append($("<p>").text(name)).slideDown();
			});
		});
	}

	var flickResponse = function (effect) {
			$('#status').html(effect.emoji).show().delay(500).fadeOut();
			audio = new Audio("../sounds/" + effect.soundFile);
			audio.play();
			// $('#status').html(effect.emoji).delay(1000).fadeOut();
	};

	$("#tinderslide").jTinder({
		// dislike callback
		onDislike: function (item) {
			currentIndex = item.index();
			dislikedList.push($(".pane:nth-child(" + (currentIndex + 1) + ") .profile-name").text());
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
			likedList.push($(".pane:nth-child(" + (currentIndex + 1) + ") .profile-name").text());
			
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

	$("#tinderslide").hide();
	
	var $icon = $("<i>").attr( { class: "fa fa-refresh fa-spin fa-3x fa-fw margin-bottom" } );
	var $p = $("<p>").text("Matching...");
	
	var $span = $("<span>").append($icon, $("<br>"), $("<br>"), $("<br>"), $p);
	$(".wrap").append($span);
	
	setTimeout(function () {
		$(".wrap span i, .wrap span p").fadeOut(function () {
			$(".wrap span i, .wrap span p, .wrap span br").remove();
			$("#tinderslide").slideDown();
		});
	}, 2000);

	/**
	 * Set button action to trigger jTinder like & dislike.
	 */
	$('.actions .like, .actions .dislike').click(function(e){
		e.preventDefault();
		$("#tinderslide").jTinder($(this).attr('class'));
	});
}

$(document).ready(main);