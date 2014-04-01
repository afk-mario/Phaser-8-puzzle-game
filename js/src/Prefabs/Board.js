/*
	Board
	Author: Arlefreak
	*/

//'use strict';


Board = function (arrNumbs) {
	Phaser.Group.call(this, game);
	this.h = 0;
	this.isGoal = false;
	this.isSolvable = false;
	this.moves = 0;
	this.totalCost = 0;

	if(arrNumbs){
		this.arrNumbs = arrNumbs;
	}
	else {
		arrNumbs = [];
	}
};

Board.prototype = Object.create(Phaser.Group.prototype);
Board.prototype.constructor = Board;

Board.prototype.genFinal = function (){
	this.arrNumbs = [1,2,3,4,5,6,7,8,0];
	//this.logBoard();
};

Board.prototype.genRandom = function (){
	this.arrNumbs = [];
	this.clearBoard();
	var tempArr = [1,2,3,4,5,6,7,8,0];
	this.arrNumbs = Phaser.Utils.shuffle(tempArr);
	if (this.checkSolvable(this.arrNumbs)) {
		this.isSolvable = true;
		this.logBoard();
	}else {
		this.genRandom();
	}
};

Board.prototype.genTest = function (){
	this.arrNumbs = [];
	this.clearBoard();
	//this.arrNumbs = [1, 0, 3, 7, 2, 5, 8, 4, 6];
	//this.arrNumbs = [6,1,4,0,2,5,3,7,8 ];
	this.arrNumbs = [1,2,3,4,5,6,0,7,8 ];
	console.log('Solvable: ' + this.checkSolvable(this.arrNumbs));
	this.logBoard();
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
		console.log('Solvable - ' + arr + ' - ' + inversion);
		return true;
	}
	else{
		console.log('Unsulvable - ' + arr + ' - ' + inversion);
		return false;
	}
	/*
	var inversions = 0;
	var i = 0,
	j = 0;

	for(i = 0; i < arr.length - 1; i++) {
		// Check if a larger number exists after the current
		// place in the array, if so increment inversions.
		for(j = i + 1; j < arr.length; j++){
			if(arr[i] > arr[j]){
				inversions++;
			}
		}
		// Determine if the distance of the blank space from the bottom 
		// right is even or odd, and increment inversions if it is odd.
		if(arr[i] === 0 && i % 2 === 1){
			inversions++;
		}
	}
	if (inversions % 2 === 0) {
		console.log('Solvable - ' + arr + ' - ' + inversions);
		return true;
	}else{
		console.log('Unsulvable - ' + arr + ' - ' + inversions);
		return false;
	}
	// If inversions is even, the puzzle is solvable.
	//return (inversions % 2 === 0);*/
}

Board.prototype.equals = function (board){
	if (!board) {
		return false;
	}
	if (!board.arrNumbs) {
		return false;
	}
	if (this.arrNumbs.length !== board.arrNumbs.length) {
		return false;
	}
	var i = 0;

	for (i = this.arrNumbs.length - 1; i >= 0; i--) {
		if(this.arrNumbs[i] != board.arrNumbs[i]){
			return false;
		}
	}
	return true;
};

Board.prototype.logBoard = function(){
	console.log('Board: ' + this.arrNumbs);
};

Board.prototype.checkPosition = function(_numb){
	var i = 0;
	for (i = this.arrNumbs.length - 1; i >= 0; i--) {
		if(this.arrNumbs[i] === _numb){
			return i;
		}
	}
}

Board.prototype.draw = function(){
	this.clearBoard(this);
	var k = 0,
	i = 0,
	j = 0;
	var tmpBlock = {};
	for (i = 3; i > 0; i--)
	{
		for (j = 3; j > 0; j--){
			if (this.arrNumbs[k] !== 0){
				tmpBlock = new NumberBlock((j-3)*-50 + 50 , (i-3)*-50 + 50,this.arrNumbs[k],this);
				this.add(tmpBlock);
			}
			k++;
		}
	}
};

Board.prototype.clearBoard = function(){
	this.forEach(this.clearTxt,this,true);
	this.removeAll();
};

Board.prototype.calcHueristic = function(){
	var h = 0;
	var i = 0;
	for (i = this.arrNumbs.length - 1; i >= 0; i--) {
		if(this.arrNumbs[i] !== 0){
			h +=  Math.abs(i - (this.arrNumbs[i] - 1));
		}
	}
	this.h = h;
};

Board.prototype.calcTotalCost = function(){
	this.totalCost = this.moves + this.h;
};

Board.prototype.clearTxt = function(child){
	child.txt.destroy();
};

Board.prototype.move = function(_where){
	if(window.isMoving){
		return false;
	}
	var position0 = this.checkPosition(0);
	var numberblock = {};
	console.log(_where + ' - ', position0);
	if(_where === 'up'){
		if(position0 >= 6 && position0 <= 8){
			return false;
		}else{
			numberblock = this.getAt(position0 + 2);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,position0);

			this.arrNumbs[position0] = this.arrNumbs[position0 + 3];
			this.arrNumbs[position0 + 3] = 0;
		}
	}else if(_where == 'down'){
		if(position0 >= 0 && position0 <= 2){
			return false;
		}else{
			numberblock = this.getAt(position0 - 3);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,position0 -1);

			this.arrNumbs[position0] = this.arrNumbs[position0 - 3];
			this.arrNumbs[position0 - 3] = 0;
		}
	}else if(_where == 'right'){
		if(position0 === 0 || position0 === 3 || position0 === 6){
			return false;
		}else{
			numberblock = this.getAt(position0 - 1);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,position0 - 1);

			this.arrNumbs[position0] = this.arrNumbs[position0 - 1];
			this.arrNumbs[position0 - 1] = 0;
		}
	}else if(_where == 'left'){
		if(position0 === 2 || position0 === 5 || position0 === 8){
			return false;
		}else{
			numberblock = this.getAt(position0);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,position0);

			this.arrNumbs[position0] = this.arrNumbs[position0 + 1];
			this.arrNumbs[position0 + 1] = 0;
		}
	}
	this.logBoard();
};