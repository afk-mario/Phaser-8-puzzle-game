
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    this.board;

};

BasicGame.Game.prototype = {

	create: function () {
        this.game.stage.backgroundColor = '#F0F0F0';
        var btt_play   = this.game.add.button(this.game.world.centerX - 50 , this.world.centerY + 80, 'btt_play', this.shuffleBoard, this, 1, 0, 2);
        text = this.game.add.text(this.game.world.centerX, 100, "- 8 Game -", {
            font: "65px Arial",
            fill: "#0F0F0F",
            align: "center"
        });

        text.anchor.setTo(0.5, 0.5);
        board = new Board(this.game);
        board.genFinal(board);
        console.log('Board:');console.log(board.length);


    },

    update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.game.state.start('MainMenu');

	},

    /*==========================================*/

    shuffleBoard: function (){
        board.genRandom(board);

    }

};
