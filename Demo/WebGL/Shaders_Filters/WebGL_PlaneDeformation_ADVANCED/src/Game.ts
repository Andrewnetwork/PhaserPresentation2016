/**
 * Created by andrewribeiro on 4/26/16.
 */

/// <reference path="../source/phaser.d.ts"/>
/// <reference path="Boot.ts"/>

module Castlevania{

    export var width  = window.innerWidth * window.devicePixelRatio;
    export var height = window.innerHeight * window.devicePixelRatio;
    
    export class Game extends Phaser.Game{
        constructor() {

            super(width, height, Phaser.AUTO, 'content', null);

            // Adding four states to the game.
            this.state.add('Boot', Boot, false);
       
            // Starting the 'Boot' state.
            this.state.start('Boot');

        }

    }

}

window.onload = () => {
    var game = new Castlevania.Game();
};
