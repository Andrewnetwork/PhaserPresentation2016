/**
 * Created by andrewribeiro on 4/27/16.
 */
/// <reference path="../source/phaser.d.ts"/>
var Castlevania;
(function (Castlevania) {
    var ShaderLoader = (function () {
        function ShaderLoader(gameRef, file) {
            console.log("Game REF:");
            console.log(gameRef);
            gameRef.load.onLoadComplete.add(this.loadComplete, gameRef);
            gameRef.load.onFileComplete.add(this.onFileComplete, this);
            gameRef.load.text('shader', 'planeDeform.shade');
            //var txt = gameRef.cache.getText('shader');
            //console.log(txt);
            console.log(gameRef.load);
            return this;
        }
        ShaderLoader.prototype.loadComplete = function () {
            // var shader = gameRef.cache.getText('shader');
            //var out = shader.split('\n');
            console.log("DD");
        };
        ShaderLoader.prototype.onFileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            console.log("DD");
        };
        return ShaderLoader;
    }());
    Castlevania.ShaderLoader = ShaderLoader;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=ShaderLoader.js.map