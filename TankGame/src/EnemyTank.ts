/**
 * Created by andrewribeiro on 5/8/16.
 */

/// <reference path="../source/phaser.d.ts"/>

module TankGame{

    // Class for the autonomous EnemyTank
    // Export the class for use outside the module. 
    export class  EnemyTank{

        // Class Variables 
        game:Phaser.Game;
        health:number;
        player:Phaser.Sprite;
        bullets:Phaser.Group;
        fireRate:number;
        nextFire:number;
        alive:Boolean;
        shadow:Phaser.Sprite;
        tank:Phaser.Sprite;
        turret:Phaser.Sprite;
        
        // Class constructor with typed arguments. 
        constructor(index:Number, game:Phaser.Game, player:Phaser.Sprite, bullets:Phaser.Group) {

            // Random coordinates for the placement of this enemy tank.
            var x = game.world.randomX;
            var y = game.world.randomY;

            // Class Variable Initialization
            this.game = game;
            this.health = 3;
            this.player = player;
            this.bullets = bullets;
            this.fireRate = 1000;
            this.nextFire = 0;
            this.alive = true;

            // Using the enemy sprite atlas to load the sprites for this object.
            this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
            this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
            this.turret = game.add.sprite(x, y, 'enemy', 'turret');

            // The anchor of the sprites to the parent object.
            this.shadow.anchor.set(0.5);
            this.tank.anchor.set(0.5);
            this.turret.anchor.set(0.3, 0.5);

            this.tank.name = index.toString();
            game.physics.enable(this.tank, Phaser.Physics.ARCADE);
            this.tank.body.immovable = false;
            this.tank.body.collideWorldBounds = true;
            this.tank.body.bounce.setTo(1, 1);

            this.tank.angle = game.rnd.angle();

            game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
        }

        damage(){

            this.health -= 1;

            if (this.health <= 0)
            {
                this.alive = false;

                this.shadow.kill();
                this.tank.kill();
                this.turret.kill();

                return true;
            }

            return false;
        }

        update(){

            this.shadow.x = this.tank.x;
            this.shadow.y = this.tank.y;
            this.shadow.rotation = this.tank.rotation;

            this.turret.x = this.tank.x;
            this.turret.y = this.tank.y;
            this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);

            if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300)
            {
                if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
                {
                    this.nextFire = this.game.time.now + this.fireRate;

                    var bullet = this.bullets.getFirstDead();

                    bullet.reset(this.turret.x, this.turret.y);

                    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
                }
            }
        }
    }
}