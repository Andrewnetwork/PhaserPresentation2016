/**
 * Created by andrewribeiro on 4/26/16.
 */

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('logo', 'mymug.jpg');
    }

    create() {
        this.game.stage.backgroundColor = "FFFFFF";
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.5,0.5)
    }

}

window.onload = () => {

    var game = new SimpleGame();

};