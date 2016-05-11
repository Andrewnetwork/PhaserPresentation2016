/**
 * Created by andrewribeiro on 4/27/16.
 */

/// <reference path="../source/phaser.d.ts"/>
module Castlevania{
    import Loader = Phaser.Loader;
    export class ShaderLoader
    {
        loader: Loader;

        public constructor( gameRef, file )
        {


            console.log("Game REF:");
            console.log(gameRef);

            gameRef.load.onLoadComplete.add( this.loadComplete , gameRef );
            gameRef.load.onFileComplete.add( this.onFileComplete, this);

            gameRef.load.text('shader', 'planeDeform.shade');

            //var txt = gameRef.cache.getText('shader');

            //console.log(txt);

            console.log(gameRef.load);



            return this;


        }

        loadComplete()
        {
            // var shader = gameRef.cache.getText('shader');

            //var out = shader.split('\n');
            console.log("DD");
        }

        onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles)
        {
            console.log("DD");
        }
    }
}

