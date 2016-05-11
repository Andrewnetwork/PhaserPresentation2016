/**
 * Created by andrewribeiro on 4/26/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../source/phaser.d.ts"/>
/// <reference path="MainMenu.ts"/>
var EXP;
(function (EXP) {
    EXP.width = window.innerWidth * window.devicePixelRatio;
    EXP.height = window.innerHeight * window.devicePixelRatio;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, EXP.width, EXP.height, Phaser.AUTO, 'content', null);
            this.state.add('MainMenu', EXP.MainMenu, false);
            // Starting the 'Boot' state.
            this.state.start('MainMenu');
        }
        return Game;
    }(Phaser.Game));
    EXP.Game = Game;
})(EXP || (EXP = {}));
window.onload = function () {
    var game = new EXP.Game();
};
//# sourceMappingURL=Game.js.map