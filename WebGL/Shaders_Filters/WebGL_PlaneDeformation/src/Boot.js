/**
 * Created by andrewribeiro on 4/27/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../source/phaser.d.ts"/>
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
            //  Shader by cce (https://www.shadertoy.com/view/XsXGWM)
            // "vec4 blips = texture2D(iChannel1, maa);",
            // "vec4 mixer = texture2D(iChannel1, maa2);",
            var fragmentSrc = [
                "precision mediump float;",
                "uniform float     time;",
                "uniform vec2      resolution;",
                "uniform sampler2D iChannel0;",
                "void main( void ) {",
                "float t = time;",
                "vec2 uv = gl_FragCoord.xy / resolution.xy;",
                "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",
                "texcoord.y -= t*0.2;",
                "float zz = 1.0/(1.0-uv.y*1.7);",
                "texcoord.y -= zz * sign(zz);",
                "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
                "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
                "vec4 stone = texture2D(iChannel0, maa);",
                "vec4 blips = texture2D(iChannel0, maa);",
                "vec4 mixer = texture2D(iChannel0, maa2);",
                "float shade = abs(1.0/zz);",
                "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
                "gl_FragColor = vec4(outp,1.0);",
                "}"
            ];
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