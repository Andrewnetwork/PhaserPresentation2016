/**
 * Created by andrewribeiro on 4/26/16.
 */

// TypeScript includes.
// The typescript definition file for phaser.
/// <reference path="../source/phaser.d.ts"/>
/// <reference path="EnemyTank.ts"/>

// Global Variables.

// Reference to the game instance.
var GlobalGame = null;

// Reference to the game state, or the instance of TankGame.
var GameState = null;

// Our Namespace
module TankGame{
    
    export class TankGame{

        // Member Variables.
        game:Phaser.Game;
        land:Phaser.TileSprite;

        shadow:Phaser.Sprite;
        tank:Phaser.Sprite;
        turret:Phaser.Sprite;

        enemies:EnemyTank[];
        enemyBullets:Phaser.Group;
        enemiesTotal:number;
        enemiesAlive:number;
        explosions:Phaser.Group;

        logo:Phaser.Sprite;

        currentSpeed:number;
        cursors:Phaser.CursorKeys;

        bullets:Phaser.Group;
        fireRate:number;
        nextFire:number;

        // Constructor for our class.
        constructor() {
            // Key Hangup --
            // Make sure to include your functions in the last argument of the game constructor.
            //(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
            //http://phaser.io/docs/2.4.7/Phaser.Game.html
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight , Phaser.AUTO, 'content',
                { preload: this.preload, create: this.create,render:this.render,
                    update:this.update,removeLogo:this.removeLogo, fire:this.fire,
                        bulletHitEnemy:this.bulletHitEnemy, bulletHitPlayer:this.bulletHitPlayer});

            console.log("Constructor Finished");
        }

        // preload: loads our images, sprite sheets, and atlases.
        preload () {
            this.game.load.atlas('tank', 'assets/games/tanks/tanks.png', 'assets/games/tanks/tanks.json');
            this.game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
            this.game.load.image('logo', 'assets/games/tanks/logo.png');
            this.game.load.image('bullet', 'assets/games/tanks/bullet.png');
            this.game.load.image('earth', 'assets/games/tanks/scorched_earth.png');
            this.game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);
            console.log("Preload Finished");
        }

        // create: is called once to initialize the game state and objects.
        create () {

            console.log("Start Create.");

            // If the window resizes, we are going to change the canvas to scale to the entire screen,
            // and we will also stretch the land to tile the entire screen.
            window.addEventListener('resize', function () {
                GlobalGame.game.scale.setGameSize(window.innerWidth,window.innerHeight);
                GameState.land.width = window.innerWidth;
                GameState.land.height = window.innerHeight;

                console.log("Resize");
            });

            // Initializing the game state variables.
            this.enemiesTotal = 0;
            this.enemiesAlive = 0;
            this.currentSpeed = 0;
            this.fireRate = 100;
            this.nextFire = 0;

            // Making a global reference to this object which we are using as the game state.
            GameState = this;

            // Resize our game world to be a 6000 x 6000 square-----
            // Updates the size of this world and sets World.x/y to the given values
            // The Camera bounds and Physics bounds (if set) are also updated to match the new World bounds.
            // We start our view at -1000,-1000.
            this.game.world.setBounds(-1000, -1000, 6000, 6000);

            //  Our tiled scrolling background
            this.land = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'earth');
            this.land.fixedToCamera = true;

            //  The base of our tank
            this.tank = this.game.add.sprite(0, 0, 'tank', 'tank1');

            // Set the anchor to the middle of the object.
            this.tank.anchor.setTo(0.5, 0.5);

            // Add move animation by using the JSON atlas.
            // AnimationManager.add(name, frames, frameRate, loop, useNumericIndex)
            this.tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);


            //  This will force it to decelerate and limit its speed
            this.game.physics.enable(this.tank, Phaser.Physics.ARCADE);
            this.tank.body.drag.set(0.2);
            this.tank.body.maxVelocity.setTo(400, 400);
            this.tank.body.collideWorldBounds = true;

            // Finally the turret that we place on-top of the tank body
            // game.add is the GameObjectFactory.
            // sprite(x, y, key, frame, group)
            this.turret = this.game.add.sprite(0, 0, 'tank', 'turret');
            this.turret.anchor.setTo(0.3, 0.5);

            //  The enemies bullet group
            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemyBullets.createMultiple(100, 'bullet');

            this.enemyBullets.setAll('anchor.x', 0.5);
            this.enemyBullets.setAll('anchor.y', 0.5);
            this.enemyBullets.setAll('outOfBoundsKill', true);
            this.enemyBullets.setAll('checkWorldBounds', true);

            //  Create some baddies to waste :)
            this.enemies = [];

            this.enemiesTotal = 20;
            this.enemiesAlive = 20;

            for (var i = 0; i < this.enemiesTotal; i++)
            {
                this.enemies.push(new EnemyTank(i, this.game, this.tank, this.enemyBullets));
            }

            //  A shadow below our tank
            this.shadow = this.game.add.sprite(0, 0, 'tank', 'shadow');
            this.shadow.anchor.setTo(0.5, 0.5);

            //  Our bullet group
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, 'bullet', 0, false);
            this.bullets.setAll('anchor.x', 0.5);
            this.bullets.setAll('anchor.y', 0.5);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);

            //  Explosion pool
            this.explosions = this.game.add.group();

            for (var i = 0; i < 10; i++)
            {
                var explosionAnimation = this.explosions.create(0, 0, 'kaboom', 0, false);
                explosionAnimation.anchor.setTo(0.5, 0.5);
                explosionAnimation.animations.add('kaboom');
            }

            // Arrangement of layers.
            this.tank.bringToTop();
            this.turret.bringToTop();

            // Add logo and center it on the x axis.
            this.logo = this.game.add.sprite((window.innerWidth-this.game.cache.getImage('logo').width)/2, 200, 'logo');
            this.logo.fixedToCamera = true;

            // Remove the logo when we click the mouse.
            this.game.input.onDown.add(this.removeLogo, this);

            // Lock the camera on the tank.
            this.game.camera.follow(this.tank);

            // Defining the camera deadzone, or where the tank has to go in the camera view
            // for the view to scroll.
            this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
            this.game.camera.focusOnXY(0, 0);

            // Prepare movement functionality for the direction keys.
            this.cursors = this.game.input.keyboard.createCursorKeys();

            console.log("Create Finished.");
        }


        // The main update loop. Called around 60 times per second.
        update () {

            // If the group of bullets overlaps, call the bulletHitPlayer function.
            this.game.physics.arcade.overlap(this.enemyBullets, this.tank, this.bulletHitPlayer, null, this);

            this.enemiesAlive = 0;

            // Count how many enimies are still alive.
            for (var i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i].alive)
                {
                    this.enemiesAlive++;
                    // Automatically separated if the tanks collide.
                    this.game.physics.arcade.collide(this.tank, this.enemies[i].tank);
                    this.game.physics.arcade.overlap(this.bullets, this.enemies[i].tank, this.bulletHitEnemy, null, this);
                    this.enemies[i].update();
                }
            }

            // Modifying the position of the tank based on cursor presses.
            if (this.cursors.left.isDown)
            {
                this.tank.angle -= 4;
            }
            else if (this.cursors.right.isDown)
            {
                this.tank.angle += 4;
            }

            if (this.cursors.up.isDown)
            {
                //  The speed we'll travel at
                this.currentSpeed = 300;
            }
            else
            {
                if (this.currentSpeed > 0)
                {
                    this.currentSpeed -= 4;
                }
            }

            // Creates velocity.
            if (this.currentSpeed > 0)
            {
                this.game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
            }

            // Moves the tile to give a movement effect.
            this.land.tilePosition.x = -this.game.camera.x;
            this.land.tilePosition.y = -this.game.camera.y;

            // Position all the parts and align rotations
            this.shadow.x = this.tank.x;
            this.shadow.y = this.tank.y;
            this.shadow.rotation = this.tank.rotation;

            this.turret.x = this.tank.x;
            this.turret.y = this.tank.y;

            // Point the turret at the pointer.
            this.turret.rotation = this.game.physics.arcade.angleToPointer(this.turret);

            // While clicking, fire the cannon.
            if (this.game.input.activePointer.isDown)
            {
                //  Boom!
                this.fire();
            }


        }

        render () {
            this.game.debug.text('Enemies: ' + this.enemiesAlive + ' / ' + this.enemiesTotal, 32, 32);
            this.game.debug.text('Tank Position: (x:'+Math.floor(this.tank.position.x)+",y:"+Math.floor(this.tank.position.y)+")",32,50);
        }

        removeLogo() {
            this.game.input.onDown.remove(this.removeLogo, this);
            this.logo.kill();
        };

        bulletHitPlayer(tank:Phaser.Sprite, bullet:Phaser.Sprite) {
            // TODO: Add action when the user gets hit.
            bullet.kill();
        }

        bulletHitEnemy (tank:Phaser.Sprite, bullet:Phaser.Sprite) {

            console.log("Bullet Hit Enemy");

            // Remove the bullet. Kill the sprite.
            bullet.kill();

            // Damage the enemy tank, return true if it was destroyed.
            var destroyed = this.enemies[tank.name].damage();

            if (destroyed)
            {
                // Get an explosion from the explosion pool and place it over the tank's coordinates.
                var explosionAnimation = this.explosions.getFirstExists(false);
                explosionAnimation.reset(tank.x, tank.y);
                explosionAnimation.play('kaboom', 30, false, true);
            }

        }

        // Shoot a bullet from the tank.
        fire () {

            // If we have passed the this.fireRate from the last time we fired and if there are bullets in
            // the bullet bool that are available for allocation.
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
            {
                this.nextFire = this.game.time.now + this.fireRate;

                // Bullets are a group.
                // .getFirstExists: If true, find the first existing child; otherwise find the first non-existing child.
                // Find the first bullet that doesn't exist.
                var bullet = this.bullets.getFirstExists(false);

                // Position the bullet at the turret.
                bullet.reset(this.turret.x, this.turret.y);

                // Creates the movement for the bullet and returns the rotation.
                // Unintended Result?: The bullet moves faster if the pointer is further away. 
                bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
            }

        }

    }

}


// Start the game upon the window loading. 
window.onload = () => {
    GlobalGame = new TankGame.TankGame();
};
