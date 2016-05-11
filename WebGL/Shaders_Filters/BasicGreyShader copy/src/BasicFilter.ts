/**
 * Created by andrewribeiro on 4/27/16.
 */
/// <reference path="../source/phaser.d.ts"/>

class Uniforms {
    gray: any;
}
class MyShader extends Phaser.Filter {

    uniforms: Uniforms;

    constructor(game: Phaser.Game, uniforms: any, fragmentSource: string[])
    {
        super(game, uniforms, fragmentSource);

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
}

class SimpleGame 
{
    game: Phaser.Game;
    image: Phaser.Sprite;
    myShader: MyShader;

    constructor() {
        this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
            create: this.create, preload:
            this.preload,
            render: this.render
        });
    }
    preload() {
        this.game.load.image("logo","logo.png");
    }
    render() {
    }
    create() {
        this.image = this.game.add.sprite(0, 0, "logo");
        this.image.filters = [new MyShader(this.game, null, null)];
    }
}

window.onload = () => {
    var game = new SimpleGame();
};