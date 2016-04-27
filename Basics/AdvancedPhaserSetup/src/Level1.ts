/// <reference path="../source/phaser.d.ts"/>
/// <reference path="Player.ts"/>
module Castlevania{
    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Player;

        create() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(this.world.centerX/2, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new Player(this.game, 130, 332);
        }
    }
}