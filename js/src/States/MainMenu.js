(function() {
	'use strict';
	function Menu() {}

	Menu.prototype = {
		create: function() {
			game.stage.backgroundColor = '#333333';
			game.add.sprite(0, 0, 'frame');
			this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
			this.enterKey.onDown.add(this.startGame, this);
			
			this.bttPlay = game.add.button(game.world.centerX , game.world.centerY + 75, 'btts', this.startGame, this, 'play1', 'play0', 'play2');
			this.bttAbout = game.add.button(game.world.centerX - 75 , game.world.centerY + 75, 'btts', this.credits, this, 'about1', 'about0', 'about2');
			this.text = game.add.text(game.world.centerX, game.world.centerY - 40, "Tutorial", {
				font: "25px Source Code Pro",
				fill: "#f0f0f0",
				align: "center"
			});
			this.textTut = game.add.text(game.world.centerX, game.world.centerY , "Use the arroy keys", {
				font: "12px Source Code Pro",
				fill: "#f0f0f0",
				align: "center"
			});
			this.text.anchor.setTo(0.5, 0.5);
			this.textTut.anchor.setTo(0.5, 0.5);
		},

		update: function() {
		},

		startGame: function() {
			game.state.start('play');
		},
		credits: function(){
			game.state.start('credits');
		}
	};
	MainMenuS = Menu;
}());