'use strict';
var isMoving;
var BootS, PreloaderS, MainMenuS, PlayS, CreditsS, LeaderBoardsS, game;

var WebFontConfig;
WebFontConfig = {
	google: { families: [ 'Source+Code+Pro::latin' ] }
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();


window.onload = function () {
	isMoving = false;

	game = new Phaser.Game(200, 275, Phaser.AUTO, 'gameContainer');
	
	// Game States
	game.state.add('boot', BootS);
	game.state.add('preloader', PreloaderS);
	game.state.add('credits', CreditsS);
	game.state.add('leaderboards', LeaderBoardsS);
	game.state.add('mainmenu', MainMenuS);
	game.state.add('play', PlayS);
	game.state.start('boot');
};

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array){
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length != array.length){
        return false;
    }

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i])){
                return false;
            }
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}