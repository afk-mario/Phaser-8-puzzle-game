(function() {
    'use strict';
    function Play() {}
    Play.prototype = {
        create: function() {
            game.stage.backgroundColor = '#FFF';
            game.add.sprite(25, 0, 'frame');
            this.bttSolve = game.add.button(
                game.world.centerX - 75 , this.world.centerY + 60,
                'btts', this.solvedBoard, this,
                'restart1', 'restart0', 'restart2');

            this.bttPlay = game.add.button(
                game.world.centerX , this.world.centerY + 60,
                'btts', this.shuffleBoard, this,
                'random1', 'random0', 'random2');
            
            this.movesTxt = game.add.text(game.world.centerX, 35, 'Moves: ', {
                font: "25px Source Code Pro",
                fill: '#FFF',
                align: 'center'
            });
            this.movesTxt.anchor.setTo(0.5, 0.5);

            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            this.board = new Board();
            this.board.genFinal();
            this.board.draw();

            this.upKey.onDown.add(function () { this.board.move('up'); },this);
            this.downKey.onDown.add(function () { this.board.move('down'); },this);
            this.leftKey.onDown.add(function () { this.board.move('left'); },this);
            this.rightKey.onDown.add(function () { this.board.move('right'); },this);
        },
        update: function() {
            this.movesTxt.setText('Moves: ' + this.board.moves);
        },
        
        quitGame: function () {
            game.state.start('MainMenu');
        },

        shuffleBoard: function (){
            console.clear();
            this.board.genRandom();
            //this.board.genTest();
            this.board.draw();
        },

        solvedBoard: function (){
            var fn  = new Board();
            fn.genFinal();
            var solver = new Solver(this.board,fn);
            solver.solve();
        }
    };
    PlayS = Play;
}());