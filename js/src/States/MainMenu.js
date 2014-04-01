(function() {
	'use strict';
	function Menu() {}

	Menu.prototype = {
		create: function() {
			game.add.sprite(25, 0, 'frame');
			this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
			this.enterKey.onDown.add(this.startGame, this);
			
			this.bttPlay = game.add.button(game.world.centerX , game.world.centerY + 60, 'btts', this.startGame, this, 'play1', 'play0', 'play2');
			this.bttAbout = game.add.button(game.world.centerX - 75 , game.world.centerY + 60, 'btts', this.startGame, this, 'about1', 'about0', 'about2');
			this.text = game.add.text(game.world.centerX, game.world.centerY - 50, "8 Puzzle\n", {
				font: "30px Source Code Pro",
				fill: "#0F0F0F",
				align: "center"
			});
			this.text.anchor.setTo(0.5, 0.5);
		},

		update: function() {
			if(game.input.activePointer.justPressed()) {
				game.state.start('play');
			}
		},

		startGame: function() {
			game.state.start('play');
		}
	};
	MainMenuS = Menu;
}());