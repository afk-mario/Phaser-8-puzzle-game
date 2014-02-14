/*
    Solver
    Author: Arlefreak
    */

    Solver = function (game, board_i, board_f) {
        this.game = game;
        this.open = [];
        this.close = [];
        this.moves = 0;
        this.board_f = board_f;
        this.board_i = board_i;
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

    Solver.prototype.swap = function(arr,direction,position, board_c){
        this.arr = arr;
        this.position = position;
        var bTemp = {};

        switch(direction){
            case 1: // x <- 0
            this.arr[this.position] = this.arr[this.position - 1];
            this.arr[this.position - 1] = 0;
            break;
            case 2: // up
            switch (this.position){
                case 3:
                this.arr[3] = this.arr[0];
                this.arr[0] = 0;
                break;
                case 4:
                this.arr[4] = this.arr[1];
                this.arr[1] = 0;
                break;
                case 5:
                this.arr[5] = this.arr[2];
                this.arr[2] = 0;
                break;
                case 6:
                this.arr[6] = this.arr[3];
                this.arr[3] = 0;
                break;
                case 7:
                this.arr[7] = this.arr[4];
                this.arr[4] = 0;
                break;
                case 8:
                this.arr[8] = this.arr[5];
                this.arr[3] = 0;
                break;
            }
            break;
            case 3: // 0 -> x
            this.arr[this.position] = this.arr[this.position + 1]
            this.arr[this.position + 1] = 0;
            break;
            case 4: // down
            switch (this.position){
                case 0:
                this.arr[0] = this.arr[3];
                this.arr[3] = 0;
                break;
                case 1:
                this.arr[1] = this.arr[4];
                this.arr[4] = 0;
                break;
                case 2:
                this.arr[2] = this.arr[5];
                this.arr[5] = 0;
                break;
                case 3:
                this.arr[3] = this.arr[6];
                this.arr[6] = 0;
                break;
                case 4:
                this.arr[4] = this.arr[7];
                this.arr[7] = 0;
                break;
                case 5:
                this.arr[5] = this.arr[8];
                this.arr[8] = 0;
                break;
            }
            break;
        }
        bTemp= new Board(this.game,this.arr,board_c);
        bTemp.h = this.hueristic(this.arr);
        bTemp.moves = board_c.moves++;
        bTemp.calcTotalCost;
        if(!this.checkClosed(bTemp))
            this.open.push(bTemp);
    };

    Solver.prototype.checkClosed = function(board){
        for (var i = close.length - 1; i >= 0; i--) {
            if (close[i].equals(board)) {
                true;
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
            count++;
            console.log('count: ' + count);

            for (i = arr.length - 1; i >= 0; i--) {
                console.log('test');
                if(arr[i] === 0)
                 position = i;
         }

         switch(position){
            case 0:
            this.swap(arr,1,position,board_c);
            this.swap(arr,4,position,board_c);
            break;
            case 1:
            this.swap(arr,1,position,board_c);
            this.swap(arr,3,position,board_c);
            this.swap(arr,4,position,board_c);
            break;
            case 2:
            this.swap(arr,3,position,board_c);
            this.swap(arr,4,position,board_c);
            break;
            case 3:
            this.swap(arr,2,position,board_c);
            this.swap(arr,3,position,board_c);
            this.swap(arr,4,position,board_c);
            break;
            case 4:
            this.swap(arr,1,position,board_c);
            this.swap(arr,2,position,board_c);
            this.swap(arr,3,position,board_c);
            this.swap(arr,4,position,board_c);
            break;
            case 5:
            this.swap(arr,1,position,board_c);
            this.swap(arr,2,position,board_c);
            this.swap(arr,4,position,board_c);
            break;
            case 6:
            this.swap(arr,2,position,board_c);
            this.swap(arr,3,position,board_c);
            break;
            case 7:
            this.swap(arr,1,position,board_c);
            this.swap(arr,2,position,board_c);
            this.swap(arr,3,position,board_c);
            break;
            case 8:
            this.swap(arr,1,position,board_c);
            this.swap(arr,2,position,board_c);
            break;
        }
        this.open.sort(this.compare);
        for (var i = open.length - 2; i >= 0; i--) {
            this.close.push(this.open.pop());
        };
        console.log('solving');
    };
    console.log('Solved: ' + this.open[this.open.length - 1]);
};