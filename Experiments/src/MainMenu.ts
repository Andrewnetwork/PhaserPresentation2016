/**
 * Created by andrewribeiro on 4/27/16.
 */

/// <reference path="../source/phaser.d.ts"/>
/// <reference path="Level1.ts"/>
/// <reference path="Firestarter.ts"/>

var globalStateRef = null;
module EXP {

    export class MainMenu extends Phaser.State {

        buttons:Object[];
        currX:number;
        currY:number;
        ioLogo: Phaser.Sprite;
        
        preload(){
            this.load.image('ioLogo','./assets/iologo.jpeg');
            this.load.audio('alert', ['assets/alert.mp4']);

        }
    
        create() {
            var css = "font-size: 24px; color:blue;";
            var css2 = "font-size: 24px; color:green;";
            var css3 = "font-size: 15px; color:black;";
            console.log("%cPhaser"+"%c Explorer "+"%c\nAndrew Ribeiro", css,css2, css3);

            console.log("Play Variables:");
            console.log("%cglobalStateRef: MainMenu - Phaser.State",css3);

            globalStateRef = this;

            this.currX = 50;
            this.currY = 0;

            var alert = this.add.audio('alert');

            alert.play();


            this.makeStateSwitchButton("Hello",Test);
            this.makeStateSwitchButton("Firestarter",Firestarter);
           


            // this.background = this.add.sprite(this.world.centerX/2, 0, 'titlepage');
            // this.background.alpha = 0;
            //
            // this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            // this.logo.anchor.setTo(0.5, 0.5);
            //
            // this.add.tween(this.background).to({alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);
            // this.add.tween(this.logo).to({y: 220}, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            //
            // this.input.onDown.addOnce(this.fadeOut, this);


            this.ioLogo = this.add.sprite(0,0,'ioLogo');

            this.ioLogo.inputEnabled = true;

            this.ioLogo.input.enableDrag();

            this.physics.arcade.enable(this.ioLogo);

            this.physics.arcade.gravity.y = 150;
            this.physics.arcade.checkCollision.left = false;
            this.physics.arcade.checkCollision.right = false;

            this.ioLogo.body.setSize(80, 80, 0, 0);
            this.ioLogo.body.collideWorldBounds = true;
            this.ioLogo.body.bounce.set(1);
            this.ioLogo.body.velocity.set(300, 200);
            this.ioLogo.anchor.setTo(1);

            this.ioLogo.events.onDragStart.add(function () {
                //this.ioLogo.body.velocity.set(0,0);
                globalStateRef.ioLogo.body.velocity.set(0,0);
            });

            this.ioLogo.events.onInputDown.add(function () {
                if(globalStateRef.ioLogo.width > 100 ){
                    globalStateRef.ioLogo.width -= 100;
                    globalStateRef.ioLogo.height -= 100;
                }

                globalStateRef.world.sendToBack(globalStateRef.ioLogo);
                globalStateRef.world.sendToBack(globalStateRef.ioLogo);
            });

        }

        update() {
            this.game.world.wrap(this.ioLogo, 0);
        }

        makeStateSwitchButton(caption, state)
        {
            var pxSize = 32;
            var style = { font: "bold "+pxSize+"px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            var spacing = 20;
            var xLen = caption.length * (pxSize - 12 );
            var leftPadding = 8;
            var topPadding = 4;
            var bttnGroup = this.add.group();

            var box = this.add.graphics(0,0);
            box.beginFill(0xFFFFFF, 0.2);
            box.drawRect(this.currX, this.currY, xLen , 50);

            var txt = this.add.text(this.currX+leftPadding,this.currY+topPadding,caption, style);


            this.currX += xLen+spacing;
            this.currY += 0;

            box.inputEnabled = true;

            box.events.onInputDown.add(function (event) {
                console.log(event);
                this.state.add('tst', state, false);
                this.state.start('tst');
                console.log("Launching state: "+state);
            },this);

            bttnGroup.add(box);
            bttnGroup.add(txt);

            box.input.useHandCursor = true;
        }


    }

}