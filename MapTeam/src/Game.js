/**
 * Created by andrewribeiro on 4/26/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../source/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preloader.ts"/>
/// <reference path="MainMenu.ts"/>
/// <reference path="Level1.ts"/>
var Castlevania;
(function (Castlevania) {
    Castlevania.width = window.innerWidth * window.devicePixelRatio;
    Castlevania.height = window.innerHeight * window.devicePixelRatio;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, Castlevania.width, Castlevania.height, Phaser.AUTO, 'content', null);
            // Adding four states to the game.
            this.state.add('Boot', Castlevania.Boot, false);
            this.state.add('Preloader', Castlevania.Preloader, false);
            this.state.add('MainMenu', Castlevania.MainMenu, false);
            this.state.add('Level1', Castlevania.Level1, false);
            // Starting the 'Boot' state.
            this.state.start('Boot');
        }
        return Game;
    }(Phaser.Game));
    Castlevania.Game = Game;
})(Castlevania || (Castlevania = {}));
window.onload = function () {
    var game = new Castlevania.Game();
};
//# sourceMappingURL=Game.js.map