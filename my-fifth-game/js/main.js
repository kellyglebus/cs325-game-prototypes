"use strict";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

var config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var snake;
var food;
var cursors;
var counter = 1;
var poison;
var peacock;
var birdTotal;

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);

var scoreText;
var score = 1;
var localStorageName="local";

function preload ()
{
    this.load.image('food', 'assets/coconut.png');
    this.load.image('body', 'assets/bird.png');
    this.load.image('background', 'assets/background.jpg');
    this.load.audio('theme','assets/dehydratedwater.mp3');
    this.load.image('poison', 'assets/apple.png');
    this.load.image('peacock', 'assets/peacock.png');
}

function create ()
{


  this.add.image(380, 270, 'background').setScale(.25);
  let music = this.sound.play('theme');
  scoreText = this.add.text(5, 5, 'score: 1', { fontSize: '20px', fill: '#87CEEB' });


    var Food = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Food (scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('food');
            this.setPosition(x * 16, y * 16);
            this.setOrigin(0);

            this.total = 0;

            scene.children.add(this);
        },

        eat: function ()
        {
            this.total++;
        }

    });

    var Poison = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Poison (scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('poison');
            this.setPosition(x * 16, y * 16);
            this.setOrigin(0);
            this.setScale(1.15);

            this.total = 0;

            scene.children.add(this);
        },

        eat: function ()
        {
            this.total--;
        }

    });

    var Peacock = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Peacock (scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('peacock');
            this.setPosition(x * 16, y * 16);
            this.setOrigin(0);
            this.setScale(1.15);

            this.total = 0;

            scene.children.add(this);
        },

        eat: function ()
        {
            this.total--;
        }

    });

    var Snake = new Phaser.Class({

        initialize:

        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.birdTotal = 1;

            this.head = this.body.create(x * 16, y * 16, 'body').setScale(.15);
            this.head.setOrigin(0);

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = RIGHT;
            this.direction = RIGHT;
        },

        update: function (time)
        {
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
        },

        faceLeft: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = LEFT;
            }
        },

        faceRight: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = RIGHT;
            }
        },

        faceUp: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = UP;
            }
        },

        faceDown: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = DOWN;
            }
        },

        move: function (time)
        {
            /**
            * Based on the heading property (which is the direction the pgroup pressed)
            * we update the headPosition value accordingly.
            *
            * The Math.wrap call allow the snake to wrap around the screen, so when
            * it goes off any of the sides it re-appears on the other.
            */
            switch (this.heading)
            {
                case LEFT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                    break;

                case RIGHT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                    break;

                case UP:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                    break;

                case DOWN:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                    break;
            }

            this.direction = this.heading;

            //  Update the body segments and place the last coordinate into this.tail
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

            //  Check to see if any of the body pieces have the same x/y as the head
            //  If they do, the head ran into the body

            var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

            if (hitBody)
            {
                console.log('dead');

                this.alive = false;

                return false;
            }
            else
            {
                //  Update the timer ready for the next movement
                this.moveTime = time + this.speed;

                return true;
            }
        },

        grow: function ()
        {
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body').setScale(.15);

            newPart.setOrigin(0);

            score++;
            scoreText.setText('Score: ' + score);

            this.birdTotal++;
            console.log(this.body[0]);
        },

        shrink: function (snake){
          this.birdTotal--;
          var child = this.body.getChildren();
          child[child.length - 1].destroy();
          console.log(this.body.getLength());
        },

        collideWithPoison: function(poison){
          if (this.head.x === poison.x && this.head.y === poison.y){
            this.shrink(this.snake);
            this.speed += 5;
            return true;
          }
          else{
            return false;
          }

        },

        collideWithPeacock: function(peacock){
          if (this.head.x === peacock.x && this.head.y === peacock.y){
            this.shrink(this.snake);
            this.speed += 5;
            return true;
          }
          else{
            return false;
          }

        },

        collideWithFood: function (food)
        {
            if (this.head.x === food.x && this.head.y === food.y)
            {
                this.grow();

                food.eat();

                //  For every 5 items of food eaten we'll increase the snake speed a little
                if (this.speed > 20 && food.total % 5 === 0)
                {
                    this.speed -= 5;
                }

                return true;
            }
            else
            {
                return false;
            }
        },

        updateGrid: function (grid)
        {
            //  Remove all body pieces from valid positions list
            this.body.children.each(function (segment) {

                var bx = segment.x / 16;
                var by = segment.y / 16;

                grid[by][bx] = false;

            });

            return grid;
        }

    });

    food = new Food(this, 3, 4);

    poison = new Poison(this, 20, 20);

    peacock = new Peacock(this, 30, 5).setScale(.1);

    snake = new Snake(this, 8, 8);

    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    if (!snake.alive)
    {
      this.add.text(130, 200, 'Game Over', {fontSize: '70px', fill: 'yellow'})
      return;
    }

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */
    if (cursors.left.isDown)
    {
        snake.faceLeft();
    }
    else if (cursors.right.isDown)
    {
        snake.faceRight();
    }
    else if (cursors.up.isDown)
    {
        snake.faceUp();
    }
    else if (cursors.down.isDown)
    {
        snake.faceDown();
    }

    if (snake.update(time))
    {
        //  If the snake updated, we need to check for collision against food

        if (snake.collideWithFood(food))
        {
            repositionFood();
        }

        if(snake.collideWithPoison(poison)){
          repositionPoison();
        }

        if(snake.collideWithPeacock(peacock)){
          repositionPeacock();
        }
    }
}

/**
* We can place the food anywhere in our 40x30 grid
* *except* on-top of the snake, so we need
* to filter those out of the possible food locations.
* If there aren't any locations left, they've won!
*
* @method repositionFood
* @return {boolean} true if the food was placed, otherwise false
*/
function repositionFood ()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}

function repositionPoison ()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }

    if(snake.birdTotal === 0){
      snake.alive = false;
      return
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        poison.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}

function repositionPeacock ()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }

    if(snake.birdTotal === 0){
      snake.alive = false;
      return
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        peacock.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}
