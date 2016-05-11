/**
 * Created by andrewribeiro on 4/27/16.
 */

/// <reference path="../source/phaser.d.ts"/>
/// <reference path="ShaderLoader.ts"/>

module Castlevania{
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('cyberglow', 'assets/textures/cyberglow.png');
            this.load.image('tron', 'assets/textures/tron.png');
            this.load.image('metal', 'assets/textures/metal.png');
            this.load.image('factory', 'assets/textures/factory.png');
            this.load.image('ooze', 'assets/textures/ooze.png');
            this.load.text('shader', 'src/supernova.shade');

        }

        filter: Phaser.Filter;
        sprite: Phaser.Sprite;
        shadeLoader: ShaderLoader;

        create() {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            } else {
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


            var fragmentSrc = this.cache.getText('shader').split("\n");

            //  Texture must be power-of-two sized or the filter will break
            this.sprite = this.game.add.sprite(0, 0, 'cyberglow');
            this.sprite.width = 800;
            this.sprite.height = 600;

            //uniform vec3      iResolution;           // viewport resolution (in pixels)
            //uniform float     iGlobalTime;           // shader playback time (in seconds)
            //uniform float     iTimeDelta;            // render time (in seconds)
            //uniform int       iFrame;                // shader playback frame
            //uniform float     iChannelTime[4];       // channel playback time (in seconds)
            //uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
            //uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
            //uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
            //uniform vec4      iDate;                 // (year, month, day, time in seconds)
            //uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

            var customUniforms = {
                iResolution:
                {
                    type: 'vec3',
                    width:500.0,
                    height:500.0,
                    depth:1.0
                },
                iGloblalTime:
                {
                    type:'3f',
                    value:0.4
                },
                iTimeDelta:
                {
                    type:'3f',
                    value:0.5
                },
                iFrame:
                {
                    type:'int',
                    value:10
                },
                iChannelTime:
                {
                    type:'3f',
                    value:0.5
                },
                iChannelResolution:
                {
                    type: 'vec3',
                    width:500,
                    height:500,
                    depth:1
                },
                iMouse:
                {
                    x:4,
                    y:4
                }



                
                
            };

            this.filter = new Phaser.Filter(this.game, customUniforms, fragmentSrc);
            this.filter.setResolution(800, 600);

            this.sprite.filters = [ this.filter ];

        }

        update() {

          this.filter.update();

        }
}}
