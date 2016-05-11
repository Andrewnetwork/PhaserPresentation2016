/**
 * Created by andrewribeiro on 4/27/16.
 */

/// <reference path="../source/phaser.d.ts"/>

module Castlevania{
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('preloadBar' , './assets/loader.png');
        }

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

            // start(key, clearWorld, clearCache, parameter)
            this.game.state.start('Preloader', true, false);
        }
    }
}
