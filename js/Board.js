/*
	Board
	Author: Arlefreak
	*/

	Board = function (game) {
		this.game = game;
		Phaser.Group.call(this, game);
		this.h = 0; //Haming 	 - Wich numbers are not on their place + moves to get there.
		this.m = 0; //Manhattan  - How many moves to get to their final state.
		this.isGoal = false;
		this.isSolvable = false;
		this.equals = false;
		this.arrNumbs = [];
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
		console.log('Board: ' + board.arrNumbs);
		console.log(board.length);
	};

	Board.prototype.genRandom = function (board){
		var i = 3,
		j = 3,
		k = 0;
		board.arrNumbs = [];
		this.clearBoard(board);
		console.log('test');
		var tempArr = [1,2,3,4,5,6,7,8,0];
		board.arrNumbs = Phaser.Utils.shuffle(tempArr);
		if (this.checkSolvable(board.arrNumbs)) {
			for (i = 3; i > 0; i--)
			{
				for (j = 3; j > 0; j--){
					if (tempArr[k] !== 0) {
						var tmp_block =new NumberBlock(board.game,(j-3)*-50 + 50 , (i-3)*-50 + 50, board.arrNumbs[k],board);
						board.add(tmp_block);
					}k++;
				}
			}
			console.log('Board: ' + board.arrNumbs);
		}else this.genRandom(board);
	};

	Board.prototype.checkSolvable = function (arr){
		var inversion = 0;
		console.log(arr);
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] < arr[i--])
				if (arr[i--] - arr[i] == 1)
					inversion++;
		};
		if (inversion % 2)
			return false;
		else
			return true;
	};

	Board.prototype.clearBoard = function(board){
		board.forEach(this.clearTxt,this,true);
		board.removeAll();
	};
	Board.prototype.clearTxt = function(child){
		child.txt.destroy();
	};