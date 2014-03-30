
Puzzle.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

Puzzle.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.game.add.sprite(25, 0, 'frame');
		var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.add(this.startGame, this);
		var btt_play   = this.game.add.button(this.game.world.centerX , this.world.centerY + 60, 'btts', this.startGame, this, 'play1', 'play0', 'play2');
		var btt_abut   = this.game.add.button(this.game.world.centerX - 75 , this.world.centerY + 60, 'btts', this.startGame, this, 'about1', 'about0', 'about2');
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, "- Main Menu - \n Click to Start", {
			font: "20px Arial",
			fill: "#0F0F0F",
			align: "center"
		});
		text.anchor.setTo(0.5, 0.5);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.game.state.start('Game');

	}

};
