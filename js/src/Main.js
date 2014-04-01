'use strict';
var isMoving;
var BootS, PreloaderS, MainMenuS, PlayS, game;


window.onload = function () {
	isMoving = false;

	game = new Phaser.Game(250, 300, Phaser.AUTO, 'gameContainer');
	
	// Game States
	game.state.add('boot', BootS);
	game.state.add('preloader', PreloaderS);
	game.state.add('mainmenu', MainMenuS);
	game.state.add('play', PlayS);

	game.state.start('boot');
};