/**
 * Created by andrewribeiro on 4/26/16.
 */

/// <reference path="../source/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preloader.ts"/>
/// <reference path="MainMenu.ts"/>
/// <reference path="Level1.ts"/>

module Castlevania{

    export var width  = window.innerWidth * window.devicePixelRatio;
    export var height = window.innerHeight * window.devicePixelRatio;
    
    export class Game extends Phaser.Game{
        constructor() {

            super(width, height, Phaser.AUTO, 'content', null);

            // Adding four states to the game.
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level1', Level1, false);

            // Starting the 'Boot' state.
            this.state.start('Boot');

        }

    }

}

window.onload = () => {
    var game = new Castlevania.Game();
};
