import "./phaser.js";


var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let rollValue = 0;
let displayText;

function preload() {
        this.load.image('board', 'assets/board.png');
        this.load.image('bluepiece', 'assets/bluepiece.png');
        this.load.image('yellowpiece', 'assets/yellowpiece.png');
        this.load.image('redsquare', 'assets/redsquare.png');
        this.load.image('die', 'assets/die.png');
        this.load.audio('diesound', 'assets/dice-roll.mp3');

    }
    
function create() {
        var background = this.add.image(205, 240, 'board').setScale(.67).setInteractive();
        background.on('pointerdown', function(pointer){
            this.add.image(pointer.x, pointer.y, 'redsquare');
        }, this);

        displayText = this.add.text(570, 300, 'Click here!', {fill: 'white'});

        var die = this.add.sprite(575, 250, 'die').setScale(.5).setInteractive();

        die.on('pointerdown', function(pointer) {
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
        }, this);


        var bluepiece1 = this.add.image(50,40, 'bluepiece').setInteractive({ draggable: true });
        var bluepiece2 = this.add.image(250,40, 'bluepiece').setInteractive({ draggable: true });
        var bluepiece3 = this.add.image(460,40, 'bluepiece').setInteractive({ draggable: true });

        var yellowpiece1 = this.add.sprite(50,440, 'yellowpiece').setInteractive({ draggable: true });
        var yellowpiece2 = this.add.sprite(250,440, 'yellowpiece').setInteractive({ draggable: true });
        var yellowpiece3 = this.add.sprite(460,440, 'yellowpiece').setInteractive({ draggable: true });
        

         yellowpiece1.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

         });

       
         yellowpiece2.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

         });

        
         yellowpiece3.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

         });

         bluepiece1.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

         });

         bluepiece2.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

         });

         bluepiece3.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

         });

    }
    
function update() {

    displayText.setText('' + rollValue);

    }


