/**
 * Created by andrewribeiro on 4/26/16.
 */

/// <reference path="../source/phaser.d.ts"/>
/// <reference path="MainMenu.ts"/>


module EXP{

    export var width  = window.innerWidth * window.devicePixelRatio;
    export var height = window.innerHeight * window.devicePixelRatio;
    
    export class Game extends Phaser.Game{
        constructor() {

            super(width, height, Phaser.AUTO, 'content', null);

            this.state.add('MainMenu', MainMenu, false);


            // Starting the 'Boot' state.
            this.state.start('MainMenu');

        }

    }

}

window.onload = () => {
    var game = new EXP.Game();
};
