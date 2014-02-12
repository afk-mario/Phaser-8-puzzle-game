/*
    Class: NumberBlock
    Author: Arlefreak
*/

NumberBlock = function (game, x, y, number) {
    this.number = number;
    Phaser.Sprite.call(this, game, x, y, 'block');
    this.rect = new Phaser.Rectangle(25,50, 150,150);
    console.log(this.rect);
    this.inputEnabled = true;
    this.input.enableDrag(true,false,true,0,this.rect);
    this.input.enableSnap(50,50,true,0,0);
    this.txt = this.game.add.text(x + 20, y + 20, number, {
            font: "20px Arial",
            fill: "#F0F0F0",
            align: "center"
        });
};

NumberBlock.prototype = Object.create(Phaser.Sprite.prototype);
NumberBlock.prototype.constructor = NumberBlock;
NumberBlock.prototype.update = function() {
    this.txt.x = this.x + 20;
    this.txt.y = this.y + 20;
};
