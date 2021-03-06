/**
 * Created by andrewribeiro on 5/10/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../source/phaser.d.ts"/>
var EXP;
(function (EXP) {
    var Firestarter = (function (_super) {
        __extends(Firestarter, _super);
        function Firestarter() {
            _super.apply(this, arguments);
        }
        Firestarter.prototype.preload = function () {
            this.load.image('space', 'assets/misc/starfield.jpg');
            this.load.image('fire1', 'assets/particles/fire1.png');
            this.load.image('fire2', 'assets/particles/fire2.png');
            this.load.image('fire3', 'assets/particles/fire3.png');
            this.load.image('smoke', 'assets/particles/smoke-puff.png');
            this.load.spritesheet('ball', 'assets/particles/plasmaball.png', 128, 128);
        };
        Firestarter.prototype.create = function () {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
            this.emitter = this.add.emitter(this.world.centerX, this.world.centerY, 400);
            this.emitter.makeParticles(['fire1', 'fire2', 'fire3', 'smoke']);
            this.emitter.gravity = 200;
            this.emitter.setAlpha(1, 0, 3000);
            this.emitter.setScale(0.8, 0, 0.8, 0, 3000);
            this.emitter.start(false, 3000, 5);
            this.sprite = this.add.sprite(0, 300, 'ball', 0);
            this.physics.arcade.enable(this.sprite);
            this.physics.arcade.gravity.y = 150;
            this.physics.arcade.checkCollision.left = false;
            this.physics.arcade.checkCollision.right = false;
            this.sprite.body.setSize(80, 80, 0, 0);
            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.bounce.set(1);
            this.sprite.body.velocity.set(300, 200);
            this.sprite.inputEnabled = true;
            this.sprite.input.enableDrag();
            this.sprite.events.onDragStart.add(this.onDragStart, this);
            this.sprite.events.onDragStop.add(this.onDragStop, this);
            this.sprite.animations.add('pulse');
            this.sprite.play('pulse', 30, true);
            this.sprite.anchor.set(0.5);
            this.createText(16, 16, 'If you can catch the fireball, drag it around');
        };
        Firestarter.prototype.update = function () {
            var px = this.sprite.body.velocity.x;
            var py = this.sprite.body.velocity.y;
            px *= -1;
            py *= -1;
            this.emitter.minParticleSpeed.set(px, py);
            this.emitter.maxParticleSpeed.set(px, py);
            this.emitter.emitX = this.sprite.x;
            this.emitter.emitY = this.sprite.y;
            // emitter.forEachExists(game.world.wrap, game.world);
            this.game.world.wrap(this.sprite, 64);
        };
        Firestarter.prototype.onDragStart = function () {
            this.sprite.body.moves = false;
        };
        Firestarter.prototype.onDragStop = function () {
            this.sprite.body.moves = true;
        };
        Firestarter.prototype.createText = function (x, y, str) {
            var text = this.add.text(x, y, str, null);
            // text.anchor.set(0.5);
            // text.align = 'center';
            //  Font style
            text.font = 'Arial Black';
            text.fontSize = 20;
            // text.fontWeight = 'bold';
            text.fill = '#ffffff';
            text.setShadow(2, 2, 'rgba(0, 0, 0, 0.7)', 2);
            return text;
        };
        Firestarter.prototype.render = function () {
            // game.debug.bodyInfo(sprite, 32, 32);
        };
        return Firestarter;
    }(Phaser.State));
    EXP.Firestarter = Firestarter;
})(EXP || (EXP = {}));
//# sourceMappingURL=Firestarter.js.map