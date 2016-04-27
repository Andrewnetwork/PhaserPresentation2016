/**
 * Created by andrewribeiro on 4/27/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../source/phaser.d.ts"/>
/// <reference path="ShaderLoader.ts"/>
var Castlevania;
(function (Castlevania) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('cyberglow', 'assets/textures/cyberglow.png');
            this.load.image('tron', 'assets/textures/tron.png');
            this.load.image('metal', 'assets/textures/metal.png');
            this.load.image('factory', 'assets/textures/factory.png');
            this.load.image('ooze', 'assets/textures/ooze.png');
            this.load.text('shader', 'src/planeDeform.shade');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
                // mobile settings
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.refresh();
            }
            this.shadeLoader = new Castlevania.ShaderLoader(this, "planeDeform.shade");
            var fragmentSrc = this.cache.getText('shader').split("\n");
            //  Texture must be power-of-two sized or the filter will break
            this.sprite = this.game.add.sprite(0, 0, 'cyberglow');
            this.sprite.width = 800;
            this.sprite.height = 600;
            var customUniforms = {
                iChannel0: { type: 'sampler2D', value: this.sprite.texture, textureData: { repeat: true } }
            };
            this.filter = new Phaser.Filter(this.game, customUniforms, fragmentSrc);
            this.filter.setResolution(800, 600);
            this.sprite.filters = [this.filter];
        };
        Boot.prototype.update = function () {
            this.filter.update();
        };
        return Boot;
    }(Phaser.State));
    Castlevania.Boot = Boot;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Boot.js.map