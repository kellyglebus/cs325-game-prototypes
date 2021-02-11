import "./phaser.js";

// An object for shared (global) variables, so that them main menu can show
// the high score if you want.
let shared = {};

// For a simpler example with multiple scenes:
// https://phaser.io/examples/v3/view/scenes/changing-scene-es6

// For a way to pass data between scenes without global variables:
// https://phaser.io/examples/v3/view/scenes/passing-data-to-a-scene

// You can have two scenes active at once, which can help separate a UI layer
// from other things on the screen:
// https://phaser.io/examples/v3/view/scenes/ui-scene-es6

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade:{
        gravity: {y: 300},
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  function preload (){
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('top', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('rocks', 'assets/rocks.jpg');
    this.load.image('fire', 'assets/fire.png');
  //  this.load.image('coin', 'assets/coin.png');
    this.load.spritesheet('dude', 'assets/dude.png',
          { frameWidth: 32, frameHeight: 48}
    );
    this.load.spritesheet('coin', 'assets/coin.png',
          { frameWidth: 32, frameHeight: 48}
    );
  }

  var platforms;
  var rocks;
  var coin;
  var score = 0;
  var scoreText;
  var ground;
  var player;
  var cursors;
  var stars;
  var friends;
  var j = 1;
  var gameOver = false;
  var bombs;
  var level = 1;
  var levelText;
  var endGame;
  var winOrLose;
  var fire;

  function create(){
    //  A simple background for our game
    this.add.image(380, 270, 'sky').setScale(1.90);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    rocks = this.physics.add.staticGroup();
    fire = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    rocks.create(200, 515, 'rocks').setScale(1).refreshBody();
    fire.create(600, 500, 'fire').setScale(1).refreshBody();

    //  Now let's create some ledges
    platforms.create(400, 392, 'ground').setScale(.5).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(350, 80, 'ground').setScale(.5).refreshBody();
    platforms.create(850, 180, 'ground');

    rocks.create(470, 363, 'rocks');
    rocks.create(200, 213, 'rocks');


    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 5, stepX: 70 }
    });

    coin = this.physics.add.group({
      key: 'coin',
      repeat: 1,
      setXY: { x:120, y:0, stepX: 500}
    });

    stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    coin.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#000' });
    levelText = this.add.text(16,40, 'Level: 1', {fontsize: '32px', fill:'#000'});


    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, stars);
    this.physics.add.collider(stars, rocks);
    this.physics.add.collider(rocks, player);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(coin, platforms);
    this.physics.add.collider(coin, rocks);
    this.physics.add.collider(fire, rocks);
    this.physics.add.collider(fire, platforms);
    this.physics.add.collider(fire, stars);
    this.physics.add.collider(fire, bombs);
    this.physics.add.collider(fire, coin);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, coin, growUp, null, this);
    this.physics.add.collider(player, fire, burned, null, this);

}

function update ()
{
    if (gameOver)
    {
        endGame = this.add.text(300, 300, 'Game Over! You ' + winOrLose, {fontSize: '20px', fill: 'red'});
        return;
    }
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);

        });
        coin.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
        });
        level++;
        levelText.setText('Score: ' + level);
        if (level > 5){
          gameOver = true;
          winOrLose = 'Win!';
        }
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    winOrLose = 'Lose';
}

function burned (player, fire){
  player.setScale(j - .2);
  j = j - .2;
  if (j < 0){
    gameOver = true;
    winOrLose = 'Lose';
  }
}

function growUp(player, coin){
  coin.disableBody(true,true);
  player.setScale(j + .2);
  j = j+.2;
  }
