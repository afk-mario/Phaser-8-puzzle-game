/*
Class: NumberBlock
Author: Arlefreak
*/

NumberBlock = function (game, x, y, number) {
    this.number = number;
    this.position = 0;
    this.position0 = 1;
    Phaser.Sprite.call(this, game, x, y, 'block');
    //this.rect = new Phaser.Rectangle(25,50, 150,150);
    //this.input.enableDrag(true,false,true,0,this.rect,null,board);
    //this.input.enableSnap(50,50,true,false,0,0);

   //  Listen for input events on this sprite
   this.inputEnabled = true;

    //  Check the pixel data of the sprite
    this.input.pixelPerfect = true;

    //  Enable the hand cursor
    this.input.useHandCursor = true;

    this.events.onInputDown.add(this.onDown, this);
    //this.events.onInputOut.add(outSprite, this);

    this.body.immovable = true;
    this.txt = this.game.add.text(x + 20, y + 20, number, {
        font: "20px Arial",
        fill: "#F0F0F0",
        align: "center"
    });
};

NumberBlock.prototype = Object.create(Phaser.Sprite.prototype);
NumberBlock.prototype.constructor = NumberBlock;

NumberBlock.prototype.move = function(_to){
    var e = this.game.add.tween(this);
    var t = this.game.add.tween(this.txt);
    this.group.arrNumbs[this.position0] = this.number;
    this.group.arrNumbs[this.position] = 0;
    switch(_to){
        case 1: //left
        e.to({ x: this.x - 50 }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
        t.to({ x: this.txt.x - 50 }, 250,null);
        t.start();
        e.start();
        break;
        case 2: // up
        e.to({ y: this.y - 50 }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
        t.to({ y: this.txt.y - 50 }, 250,null);
        t.start();
        e.start();
        break;
        case 3: // right
        e.to({ x: this.x + 50 }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
        t.to({ x: this.txt.x + 50 }, 250,null);
        t.start();
        e.start();
        break;
        case 4: //down
        e.to({ y: this.y + 50 }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
        t.to({ y: this.txt.y + 50 }, 250,null);
        t.start();
        e.start();
        break;

    }
}

NumberBlock.prototype.onDown = function(){
    console.log(this.group.arrNumbs);
    //this.position = this.group.checkPosition(this.number);
    this.position0= this.group.checkPosition(0);

    if (this.position - this.position0 !== 0){
        switch(this.position){
            case 0:
            switch(this.position0){
                case 1:
                this.move(3);
                break;
                case 3:
                this.move(2);
                break;
                default:
                return;
            }
            break;
            case 1:
            switch(this.position0){
                case 0:
                this.move(1);
                break;
                case 2:
                this.move(3);
                break;
                case 4:
                this.move(4);
                break;
                default:
                return;
            }
            break;
            case 2:
               switch(this.position0){
                case 1:
                this.move(1);
                break;
                case 5:
                this.move(4);
                break;
                default:
                return;
            }
            break;
            case 3:
            switch(this.position0){
                case 0:
                this.move(2);
                break;
                case 4:
                this.move(3);
                break;
                case 6:
                this.move(4);
                break;
                default:
                return;
            }
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
    console.log('Numbs: ' + this.group.arrNumbs);
    console.log(this.group.arrNumbs);


}
