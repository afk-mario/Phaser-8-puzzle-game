/*
    Class: NumberBlock
    Author: Arlefreak
*/

NumberBlock = function (game, x, y, number) {
    this.number = number;
    Phaser.Sprite.call(this, game, x, y, 'block');
    this.rect = new Phaser.Rectangle(this.game.world.centerX - 138, 250, 150,150);
    this.inputEnabled = true;
    this.input.enableDrag(false,false,false,0,this.rect);
    this.input.enableSnap(50,50,true);
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
