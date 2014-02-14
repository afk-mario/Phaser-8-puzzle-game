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

     Solver.prototype.hueristic = function (arr){
        var h = 0;
        var i = 0;
        for (i = arr.length - 1; i >= 0; i--) {
            if (i === arr.length - 1){
                if(arr[i] !== 0) h++;
            }else if (arr[i] !== i++ ) h++;
        };
        return h;
    };

    Solver.prototype.swap = function(arr,direction,position, board_c){
        this.arr = arr;
        this.position = position;
        var bTemp = {};

        switch(direction){
            case 1: // x <- 0
                this.arr[position] = this.arr[position--];
                this.arr[position--] = 0;
            break;
            case 2: // up
                switch (position){
                    case 3:
                        this.arr[3] = this.arr[0];
                        this.arr[0] = 0:
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
                this.arr[position] = this.arr[position++]
                this.arr[position++] = 0;
            break;
            case 4: // down
            switch (position){
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
                    this.arr[6] = 0:
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
        bTemo.h = this.hueristic(this.arr);
        this.open.push(bTemp);
    };

    Solver.prototype.solve = function(){
        while(!this.open[this.open.length - 1].equals(this.board_f)){
            var board_c = this.open[this.open.length - 1];
            var arr = board_c.arrNumbs;
            var i = 0;
            this.close.push(this.open.pop());
            

            for (i = arr.length - 1; i >= 0; i--) {
                if(arr[i] === 0){
                    switch(i){
                        case 0:
                            this.swap(arr,1,i,board_c);
                            this.swap(arr,4,i,board_c);
                        break;
                        case 1:
                            this.swap(arr,1,i,board_c);
                            this.swap(arr,3,i,board_c);
                            this.swap(arr,4,i,board_c);
                         
                        break;
                        case 2:
                            this.swap(arr,3,i,board_c);
                            this.swap(arr,4,i,board_c);
                        break;
                        case 3:
                        break;
                        case 4:
                        break;
                        case 5:
                        break;
                        case 6:
                        break;
                        case 7:
                        break;
                        case 8:
                        break;
                    }
                }
            };
            console.log('solving');
        }
    };  