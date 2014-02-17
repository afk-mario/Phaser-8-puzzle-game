/*
    Solver
    Author: Arlefreak
    */

    Solver = function (game, board_i, board_f) {
        this.game = game;
        this.open = [];
        this.close = [];
        this.moves = 0;
        this.board_i = board_i;
        this.board_f = board_f;
        this.open.push(board_i);
    };

    Solver.prototype.hueristic = function(arr){
        var h = 0;
        var i = 0;
        for (i = arr.length - 1; i >= 0; i--) {
            if (i === arr.length - 1){
                if(arr[i] !== 0) h++;
            }else if (arr[i] != i + 1 ) h++;
        };
        return h;
    };

    Solver.prototype.manhattan = function(arr, moves){
        var m = moves;
    };

    Solver.prototype.swap = function(board_c,direction,position){
        this.position = position;
        var bTemp = Phaser.Utils.extend(true,{},board_c);
        var arrTemp = [];

        switch(direction){
            case 1: // x <- 0
            bTemp.arrNumbs[this.position] =  bTemp.arrNumbs[this.position - 1];
            bTemp.arrNumbs[this.position - 1] = 0;
            break;
            case 2: // up
            switch (this.position){
                case 3:
                bTemp.arrNumbs[3] = bTemp.arrNumbs[0];
                bTemp.arrNumbs[0] = 0;
                break;
                case 4:
                bTemp.arrNumbs[4] = bTemp.arrNumbs[1];
                bTemp.arrNumbs[1] = 0;
                break;
                case 5:
                bTemp.arrNumbs[5] = bTemp.arrNumbs[2];
                bTemp.arrNumbs[2] = 0;
                break;
                case 6:
                bTemp.arrNumbs[6] = bTemp.arrNumbs[3];
                bTemp.arrNumbs[3] = 0;
                break;
                case 7:
                bTemp.arrNumbs[7] = bTemp.arrNumbs[4];
                bTemp.arrNumbs[4] = 0;
                break;
                case 8:
                bTemp.arrNumbs[8] = bTemp.arrNumbs[5];
                bTemp.arrNumbs[3] = 0;
                break;
            }
            break;
            case 3: // 0 -> x
            bTemp.arrNumbs[this.position] = bTemp.arrNumbs[this.position + 1]
            bTemp.arrNumbs[this.position + 1] = 0;
            break;
            case 4: // down
            switch (this.position){
                case 0:
                bTemp.arrNumbs[0] = bTemp.arrNumbs[3];
                bTemp.arrNumbs[3] = 0;
                break;
                case 1:
                bTemp.arrNumbs[1] = bTemp.arrNumbs[4];
                bTemp.arrNumbs[4] = 0;
                break;
                case 2:
                bTemp.arrNumbs[2] = bTemp.arrNumbs[5];
                bTemp.arrNumbs[5] = 0;
                break;
                case 3:
                bTemp.arrNumbs[3] = bTemp.arrNumbs[6];
                bTemp.arrNumbs[6] = 0;
                break;
                case 4:
                bTemp.arrNumbs[4] = bTemp.arrNumbs[7];
                bTemp.arrNumbs[7] = 0;
                break;
                case 5:
                bTemp.arrNumbs[5] = bTemp.arrNumbs[8];
                bTemp.arrNumbs[8] = 0;
                break;
            }
            break;
        }
        arrTemp = bTemp.arrNumbs;
        bTemp= new Board(this.game,arrTemp,board_c);
        bTemp.h = this.hueristic(arrTemp);
        bTemp.moves = board_c.moves + 1;
        bTemp.calcTotalCost;
        if(!this.checkClosed(bTemp))
            this.open.push(bTemp);
    };

    Solver.prototype.checkClosed = function(board){
        for (var i = this.close.length - 1; i >= 0; i--) {
            if (this.close[i].equals(board)) {
                return true;
            }
        };
    };

    function compare(a,b) {
        if (a.totalCost > b.totalCost)
            return -1;
        if (a.totalCost < b.totalCost)
            return 1;
        return 0;
    }


    Solver.prototype.solve = function(){
        var count = 0;
        while(!this.open[this.open.length - 1].equals(this.board_f)){
            var board_c = this.open[this.open.length - 1];
            var arr = board_c.arrNumbs;
            var i = 0;
            var position = 0;

            this.close.push(this.open.pop());

            for (i = board_c.arrNumbs.length - 1; i >= 0; i--) {
                if(board_c.arrNumbs[i] === 0)
                 position = i;
         }

         switch(position){
            case 0:
            this.swap(board_c,3,position);
            this.swap(board_c,4,position);
            break;
            case 1:
            this.swap(board_c,1,position);
            this.swap(board_c,3,position);
            this.swap(board_c,4,position);
            break;
            case 2:
            this.swap(board_c,1,position);
            this.swap(board_c,4,position);
            break;
            case 3:
            this.swap(board_c,2,position);
            this.swap(board_c,3,position);
            this.swap(board_c,4,position);
            break;
            case 4:
            this.swap(board_c,1,position);
            this.swap(board_c,2,position);
            this.swap(board_c,3,position);
            this.swap(board_c,4,position);
            break;
            case 5:
            this.swap(board_c,1,position);
            this.swap(board_c,2,position);
            this.swap(board_c,4,position);
            break;
            case 6:
            this.swap(board_c,2,position);
            this.swap(board_c,3,position);
            break;
            case 7:
            this.swap(board_c,1,position);
            this.swap(board_c,2,position);
            this.swap(board_c,3,position);
            break;
            case 8:
            this.swap(board_c,1,position);
            this.swap(board_c,2,position);
            break;
        }
        this.open.sort(this.compare);
        for (var i = this.open.length - 1; i > 0; i--) {
            this.close.push(this.open.pop());
        }
        count++;
        console.log('solving - ' + 'count: ' + count);
    };
    console.log('Solved: ' + this.open[this.open.length - 1]);
};