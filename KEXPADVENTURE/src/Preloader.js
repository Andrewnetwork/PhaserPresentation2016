var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by andrewribeiro on 4/27/16.
 */
/// <reference path="../source/phaser.d.ts"/>
var Castlevania;
(function (Castlevania) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.world.centerX - 200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            // Load Intro Assets
            this.load.image('kexpLogo', 'assets/loader/kes.jpg');
            this.load.audio('kexpSoundFX', 'assets/loader/arc1.mp3', true);
            this.load.audio('kexpChime', 'assets/loader/cool.wav', true);
            // Define states of the preeloader.
            this.preloadStates = new Array();
            this.preloadStates.push(false); // [0] Chime Played
            //  Load our actual games assets
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');
        };
        Preloader.prototype.create = function () {
            this.sound = this.add.audio('kexpSoundFX', 1, false);
            this.bmd = this.game.make.bitmapData();
            this.bmd.load('kexpLogo').cls();
            this.bmd.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
            this.stage.smoothed = false;
            this.area = new Phaser.Rectangle(0, this.bmd.height, this.bmd.width, 1);
            this.dropTime = this.game.time.now + 10;
            //tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.update = function () {
            if (this.area.y > 0 && this.game.time.now > this.dropTime) {
                for (var y = 0; y < this.area.y; y++) {
                    this.bmd.copyRect('kexpLogo', this.area, 0, y);
                }
                this.area.y--;
                this.dropTime = this.game.time.now + 10;
                if (this.dropTime > 2000) {
                    if (!this.sound.isPlaying) {
                        this.sound.play();
                    }
                }
            }
            else {
                if (!this.preloadStates[0]) {
                    this.sound.stop();
                    this.sound = this.add.audio('kexpChime', 1, false);
                    this.sound.play();
                    console.log("HERE");
                    this.preloadStates[0] = true;
                }
            }
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Preloader.js.map