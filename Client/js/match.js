/**
 * jTinder initialization
 */

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

var audio; // Credit: Audio files from http://www.livetim.tim.com.br/emotisounds/
var lastEffect = _.sample(dislikedEffects, 1)[0];

var flickResponse = function (effect) {
		$('#status').html(effect.emoji).show();
		audio = new Audio("../sounds/" + effect.soundFile);
		audio.play();
		$('#status').html(effect.emoji);
};

$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
		var effect = _.sample(dislikedEffects, 1)[0];

		while (lastEffect === effect) {
			effect = _.sample(dislikedEffects, 1)[0];
		}
		// var effect = _.sample(dislikedEffects, 1)[0];
		flickResponse(effect);
		lastEffect = effect;
    },
	// like callback
    onLike: function (item) {
	    // set the status text
		var effect = _.sample(likedEffects, 1)[0];

		while (lastEffect === effect) {
			effect = _.sample(likedEffects, 1)[0];
		}
		// var effect = _.sample(dislikedEffects, 1)[0];
		flickResponse(effect);
		lastEffect = effect;
    },
	animationRevertSpeed: 150,
	animationSpeed: 300,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});

var main = function () {
	// var dir = "../img/portfolio";
	// var fileextension = ".png";
	// $.ajax({
	// 	//This will retrieve the contents of the folder if the folder is configured as 'browsable'
	// 	url: dir,
	// 	success: function (data) {
	// 		//List all .png file names in the page
	// 		$(data).find("a:contains(" + fileextension + ")").each(function () {
	// 			var filename = this.href.replace(window.location.host, "").replace("http://", "");
	// 			console.log(filename);
	// 		});
	// 	}
	// });
}

$(document).ready(main);