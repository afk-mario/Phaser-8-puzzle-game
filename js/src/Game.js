BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game = game;
    /*this.game;		//	a reference to the currently running game
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

    this.board;*/
};
var bttAbut;
var bttPlay;

BasicGame.Game.prototype = {

	create: function () {
        this.game.stage.backgroundColor = '#FFF';
        this.game.add.sprite(25, 0, 'frame');
        bttAbut   = this.game.add.button(this.game.world.centerX - 75 , this.world.centerY + 60, 'btts', this.solvedBoard, this, 'restart1', 'restart0', 'restart2');
        bttPlay   = this.game.add.button(this.game.world.centerX , this.world.centerY + 60, 'btts', this.shuffleBoard, this, 'random1', 'random0', 'random2');
        var text = this.game.add.text(this.game.world.centerX, 35, '- 8 Game -', {
            font: '20px Arial',
            fill: '#F0F0F0',
            align: 'center'
        });

        text.anchor.setTo(0.5, 0.5);
        this.board = new Board(this.game);
        this.board.genFinal();
        this.board.draw();
    },

    update: function () {
        //this.game.physics.collide(this.board);
    },

    quitGame: function () {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.game.state.start('MainMenu');

	},

    /*==========================================*/

    shuffleBoard: function (){
        console.clear();
        this.board.genRandom();
        //this.board.genTest();
        
        this.board.draw();
    },

    solvedBoard: function (){
        var fn  = new Board(this.game);
        fn.genFinal();
        //var solver = new Solver(this.game, Phaser.Utils.extend(false,{},this.board), fn);
        var solver = new Solver(this.game,this.board,fn);
        solver.solve();

    }
};
