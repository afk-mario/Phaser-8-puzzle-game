/*
	Board
	Author: Arlefreak
	*/

	Board = function (game, arrNumbs, parent) {
		this.game = game;
		Phaser.Group.call(this, game);
		this.h = 0; //Haming 	 - Wich numbers are not on their place + moves to get there.
		this.m = 0; //Manhattan  - How many moves to get to their final state.
		this.isGoal = false;
		this.isSolvable = false;
		this.moves = 0;
		this.totalCost = 0;

		if(arrNumbs)this.arrNumbs = arrNumbs;
		else arrNumbs = [];

		if (parent) this.parent = parent;
		else this.parent = {};
	};

	Board.prototype = Object.create(Phaser.Group.prototype);
	Board.prototype.constructor = Board;

	Board.prototype.genFinal = function (){
		this.arrNumbs = [1,2,3,4,5,6,7,8,0];
		this.logBoard();
	};

	Board.prototype.genRandom = function (){
		this.arrNumbs = [];
		this.clearBoard();
		var tempArr = [1,2,3,4,5,6,7,8,0];
		this.arrNumbs = Phaser.Utils.shuffle(tempArr);
		if (this.checkSolvable(this.arrNumbs)) {
			this.isSolvable = true;
			this.logBoard();
		}else this.genRandom();
	};

	Board.prototype.checkSolvable = function (arr){
		var inversion = 0;
		var i = 0;
		var j = 0;
		for (i = arr.length - 1; i >= 0; i--) {
			for (j = i - 1; j >= 0; j--) {
				if (arr[j] > arr[i] && arr[i] !== 0 && arr[j] !== 0){
					inversion++;
				}
			}
		}
		if (inversion % 2 === 0){
			console.log("Solvable - " + arr + " - " + inversion);
			return true;
		}
		else{
			console.log("Unsulvable - " + arr + " - " + inversion)
			return false;
		}
	};

	Board.prototype.equals = function (board){
		if (!board) {return false};
		if (!board.arrNumbs) {return false};
		if (this.arrNumbs.length !== board.arrNumbs.length) {return false};
		var i = 0;

		for (i = this.arrNumbs.length - 1; i >= 0; i--) {
			if(this.arrNumbs[i] != board.arrNumbs[i])
				return false;
		}
		return true;
	};

	Board.prototype.solve = function(board_f){
		this.moves = 0;
	};

	Board.prototype.logBoard = function(){
		console.log('Board: ' + this.arrNumbs);
	};

	Board.prototype.draw = function(){
		this.clearBoard(this);
		var k = 0;
		for (i = 3; i > 0; i--)
		{
			for (j = 3; j > 0; j--){				
				if (this.arrNumbs[k] != 0){
					var tmp_block =new NumberBlock(this.game, (j-3)*-50 + 50 , (i-3)*-50 + 50,this.arrNumbs[k],this);
					this.add(tmp_block);
				}k++;
			}
		}
	};

	Board.prototype.clearBoard = function(){
		this.forEach(this.clearTxt,this,true);
		this.removeAll();
	};

	Board.prototype.calcTotalCost = function(){
		this.totalCost = moves + Manhattan;
	};

	Board.prototype.clearTxt = function(child){
		child.txt.destroy();
	};