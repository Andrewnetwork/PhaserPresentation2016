/**
 * Created by andrewribeiro on 4/26/16.
 */

// TypeScript 
/// <reference path="../source/phaser.d.ts"/>
/// <reference path="EnemyTank.ts"/>

var GlobalGame = null;
var GameState = null;

module TankGame{
    
    export class TankGame{

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


        constructor() {
            // Key Hangup --
            // Make sure to include your functions in the last argument of the game constructor.
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight , Phaser.AUTO, 'content',
                { preload: this.preload, create: this.create,render:this.render,
                    update:this.update,removeLogo:this.removeLogo, fire:this.fire,
                        bulletHitEnemy:this.bulletHitEnemy, bulletHitPlayer:this.bulletHitPlayer});

            console.log("Constructor Finished");
        }

        preload () {
            this.game.load.atlas('tank', 'assets/games/tanks/tanks.png', 'assets/games/tanks/tanks.json');
            this.game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
            this.game.load.image('logo', 'assets/games/tanks/logo.png');
            this.game.load.image('bullet', 'assets/games/tanks/bullet.png');
            this.game.load.image('earth', 'assets/games/tanks/scorched_earth.png');
            this.game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);
            console.log("Preload Finished");
        }


        removeLogo() {
            this.game.input.onDown.remove(this.removeLogo, this);
            this.logo.kill();
        };

        create () {

            window.addEventListener('resize', function () {
                GlobalGame.game.scale.setGameSize(window.innerWidth,window.innerHeight);
                GameState.land.width = window.innerWidth;
                GameState.land.height = window.innerHeight;
                console.log("Resize");

            });

            this.enemiesTotal = 0;
            this.enemiesAlive = 0;
            this.currentSpeed = 0;
            this.fireRate = 100;
            this.nextFire = 0;

            GameState = this;

            console.log("Start Create");
            //  Resize our game world to be a 2000 x 2000 square
            this.game.world.setBounds(-1000, -1000, 2000, 2000);

            //  Our tiled scrolling background
            this.land = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'earth');
            this.land.fixedToCamera = true;


            //  The base of our tank
            this.tank = this.game.add.sprite(0, 0, 'tank', 'tank1');
            this.tank.anchor.setTo(0.5, 0.5);
            this.tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);


            //  This will force it to decelerate and limit its speed
            this.game.physics.enable(this.tank, Phaser.Physics.ARCADE);
            this.tank.body.drag.set(0.2);
            this.tank.body.maxVelocity.setTo(400, 400);
            this.tank.body.collideWorldBounds = true;

            //  Finally the turret that we place on-top of the tank body
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

            this.tank.bringToTop();
            this.turret.bringToTop();

            this.logo = this.game.add.sprite(0, 200, 'logo');
            this.logo.fixedToCamera = true;

            this.game.input.onDown.add(this.removeLogo, this);

            this.game.camera.follow(this.tank);
            this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
            this.game.camera.focusOnXY(0, 0);

            this.cursors = this.game.input.keyboard.createCursorKeys();

            console.log("Create Finished");
        }


        update () {

            this.game.physics.arcade.overlap(this.enemyBullets, this.tank, this.bulletHitPlayer, null, this);

            this.enemiesAlive = 0;

            for (var i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i].alive)
                {
                    this.enemiesAlive++;
                    this.game.physics.arcade.collide(this.tank, this.enemies[i].tank);
                    this.game.physics.arcade.overlap(this.bullets, this.enemies[i].tank, this.bulletHitEnemy, null, this);
                    this.enemies[i].update();
                }
            }

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

            if (this.currentSpeed > 0)
            {
                this.game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
            }

            this.land.tilePosition.x = -this.game.camera.x;
            this.land.tilePosition.y = -this.game.camera.y;

            //  Position all the parts and align rotations
            this.shadow.x = this.tank.x;
            this.shadow.y = this.tank.y;
            this.shadow.rotation = this.tank.rotation;

            this.turret.x = this.tank.x;
            this.turret.y = this.tank.y;

            this.turret.rotation = this.game.physics.arcade.angleToPointer(this.turret);

            if (this.game.input.activePointer.isDown)
            {
                //  Boom!
                this.fire();
            }


        }

        bulletHitPlayer(tank:Phaser.Sprite, bullet:Phaser.Sprite) {

            bullet.kill();

        }

        bulletHitEnemy (tank:Phaser.Sprite, bullet:Phaser.Sprite) {

            console.log("Bullet Hit Enemy");

            bullet.kill();

            var destroyed = this.enemies[tank.name].damage();

            if (destroyed)
            {
                var explosionAnimation = this.explosions.getFirstExists(false);
                explosionAnimation.reset(tank.x, tank.y);
                explosionAnimation.play('kaboom', 30, false, true);
            }

        }

        fire () {

            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
            {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstExists(false);

                bullet.reset(this.turret.x, this.turret.y);

                bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
            }

        }

        render () {

            // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
            this.game.debug.text('Enemies: ' + this.enemiesAlive + ' / ' + this.enemiesTotal, 32, 32);

        }


    }

}

window.onload = () => {
    GlobalGame = new TankGame.TankGame();
};
