var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../source/phaser.d.ts"/>
/// <reference path="Player.ts"/>
var Castlevania;
(function (Castlevania) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(this.world.centerX / 2, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new Castlevania.Player(this.game, 130, 332);
        };
        return Level1;
    }(Phaser.State));
    Castlevania.Level1 = Level1;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Level1.js.map