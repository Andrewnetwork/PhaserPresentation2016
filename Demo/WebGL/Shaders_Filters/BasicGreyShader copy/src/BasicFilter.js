/**
 * Created by andrewribeiro on 4/27/16.
 */
/// <reference path="../source/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Uniforms = (function () {
    function Uniforms() {
    }
    return Uniforms;
}());
var MyShader = (function (_super) {
    __extends(MyShader, _super);
    function MyShader(game, uniforms, fragmentSource) {
        _super.call(this, game, uniforms, fragmentSource);
        this.uniforms = new Uniforms();
        this.uniforms.gray = { type: '1f', value: 1.0 };
        this.fragmentSrc = [
            "precision mediump float;",
            "varying vec2       vTextureCoord;",
            "varying vec4       vColor;",
            "uniform sampler2D  uSampler;",
            "uniform float      gray;",
            "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 *gl_FragColor.b), gray);",
            "}"];
    }
    return MyShader;
}(Phaser.Filter));
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
            create: this.create, preload: this.preload,
            render: this.render
        });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("logo", "logo.png");
    };
    SimpleGame.prototype.render = function () {
    };
    SimpleGame.prototype.create = function () {
        this.image = this.game.add.sprite(0, 0, "logo");
        this.image.filters = [new MyShader(this.game, null, null)];
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=BasicFilter.js.map