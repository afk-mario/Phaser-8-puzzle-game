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

		if(arrNumbs)this.arrNumbs = arrNumbs;
		else arrNumbs = [];
		
		if (parent) this.parent = parent;
		else this.parent = {};
	};

	Board.prototype = Object.create(Phaser.Group.prototype);
	Board.prototype.constructor = Board;

	Board.prototype.genFinal = function (board){
		var i = 3,
		j = 3,
		k = 0;
		board.arrNumbs = [];
		this.clearBoard(board);

		for (i = 3; i > 0; i--)
		{	
			for (j = 3; j > 0; j--){
				k++;
				if (k != 9){
					board.arrNumbs.push(k);
					var tmp_block =new NumberBlock(board.game, (j-3)*-50 + 50 , (i-3)*-50 + 50,k,board);
					board.add(tmp_block);
				}else{
					board.arrNumbs.push(0);
				}
			}
		}
	};

	Board.prototype.genRandom = function (board){
		var i = 3,
		j = 3,
		k = 0;
		board.arrNumbs = [];
		this.clearBoard(board);
		var tempArr = [1,2,3,4,5,6,7,8,0];
		board.arrNumbs = Phaser.Utils.shuffle(tempArr);
		if (this.checkSolvable(board.arrNumbs)) {
			board.isSolvable = true;
			for (i = 3; i > 0; i--)
			{
				for (j = 3; j > 0; j--){
					if (tempArr[k] !== 0) {
						var tmp_block =new NumberBlock(board.game,(j-3)*-50 + 50 , (i-3)*-50 + 50, board.arrNumbs[k],board);
						board.add(tmp_block);
					}k++;
				}
			}this.logBoard();
		}else this.genRandom(board);
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
		if (this.arrNumbs.length !== board.arrNumbs) {return false};
		var i = 0;

		for (i = this.arrNumbs - 1; i >= 0; i--) {
			if(this.arrNumbs[i] != board.arrNumbs[i])
				return false;
		}
		return true;
	};

	Board.prototype.solve = function(board_f){
		this.moves = 0;
	};

	Board.prototype.logBoard = function(){
		var k = 0;
		/*for (i = 3; i > 0; i--)
		{
			for (j = 3; j > 0; j--){
				console.log(this.arrNumbs[k+(j-3)*-1]);
			}k++;console.log('---');
		}*/
		console.log('Board: ' + this.arrNumbs);
		
	};

	Board.prototype.clearBoard = function(board){
		board.forEach(this.clearTxt,this,true);
		board.removeAll();
	};

	Board.prototype.clearTxt = function(child){
		child.txt.destroy();
	};