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
    },
    physics: { default: 'arcade' }
};

var game = new Phaser.Game(config);
let rollValue = 0;
let displayText;
let done;
let yellowPlayerScore;
let bluePlayerScore;
let yellowScore;
let redTurn;
let blueScore;
let playerTurn;
let turn;
let bluePick;
let yellowPick;
let pick;
let roll;
let blueSkip;
let yellowSkip;
let takePoint;
let takePointText;

function preload() {
        this.load.image('board', 'assets/board.png');
        this.load.image('die', 'assets/die.png');
        this.load.image('cover', 'assets/cover.png');
        this.load.audio('diesound', 'assets/dice-roll.mp3');
        this.load.image('done', 'assets/doneButton.png');
        this.load.image('blue', 'assets/blueSquare.png');
        this.load.image('yellow', 'assets/yellowSquare.png');
        this.load.image('red', 'assets/redSquare.png');
    }
    
function create() {

        turn = 'Yellow';
        bluePlayerScore = 0;
        roll = false;
        yellowPlayerScore = 0;
        pick = false;
        blueSkip = false;
        yellowSkip = false;
        takePoint = false;

        var background = this.add.image(270, 240, 'board').setScale(.55);

        var cover11 = this.add.image(45,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover12 = this.add.image(45,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover13 = this.add.image(45,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover14 = this.add.image(45,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover15 = this.add.image(45,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover16 = this.add.image(45,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover17 = this.add.image(45,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var cover25 = this.add.image(120,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover21 = this.add.image(120,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover22 = this.add.image(120,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover23 = this.add.image(120,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover24 = this.add.image(120,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover26 = this.add.image(120,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover27 = this.add.image(120,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var cover31 = this.add.image(195,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover32 = this.add.image(195,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover33 = this.add.image(195,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover34 = this.add.image(195,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover35 = this.add.image(195,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover36 = this.add.image(195,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover37 = this.add.image(195,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var cover41 = this.add.image(270,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover42 = this.add.image(270,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover43 = this.add.image(270,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover44 = this.add.image(270,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover45 = this.add.image(270,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover46 = this.add.image(270,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover47 = this.add.image(270,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var cover51 = this.add.image(345,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover52 = this.add.image(345,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover53 = this.add.image(345,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover54 = this.add.image(345,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover55 = this.add.image(345,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover56 = this.add.image(345,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover57 = this.add.image(345,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var cover61 = this.add.image(420,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover62 = this.add.image(420,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover63 = this.add.image(420,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover64 = this.add.image(420,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover65 = this.add.image(420,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover66 = this.add.image(420,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover67 = this.add.image(420,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var cover71 = this.add.image(495,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover72 = this.add.image(495,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover73 = this.add.image(495,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover74 = this.add.image(495,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover75 = this.add.image(495,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover76 = this.add.image(495,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        var cover77 = this.add.image(495,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        var blue = this.add.image(590, 180, 'blue').setScale(.6).setInteractive();
        var yellow = this.add.image(590, 350, 'yellow').setScale(.6).setInteractive();
        var red = this.add.image(590, 420, 'red').setScale(.6).setInteractive();

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.destroy();
    
        });

        playerTurn = this.add.text(400, 10, 'Yellow\'s Turn', {fill: 'white'});

        yellowScore = this.add.text(30, 10, 'Yellow\'s Score: 0', {fill: 'yellow'});

        blueScore = this.add.text(30, 450, 'Blue\'s Score: 0', {fill: '#87CEFA'});

        displayText = this.add.text(560, 300, 'Yellow', {fill: 'white'});

        var die = this.add.sprite(590, 250, 'die').setScale(.5).setInteractive();

        die.on('pointerdown', function(pointer) {
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
            roll = true;
        }, this);

        blue.on('pointerdown', function(pointer) {
            bluePick = true;
            yellowPick = false;
            pick = true;
        }, this);

        yellow.on('pointerdown', function(pointer) {
            yellowPick = true;
            bluePick = false;
            pick = true;
        }, this);

        red.on('pointerdown', function(pointer) {
            redTurn = true;
            yellowPick = false;
            bluePick = false;
            pick = true;
        }, this);
    }
    
function update() {
    displayText.setText('' + rollValue).setX(580);

    if (roll){
        if (rollValue == 1 || rollValue == 3 || rollValue == 5){
            if (pick){
                if (turn == 'Yellow'){
                    if (redTurn){
                        turn = 'Blue';
                        yellowSkip = true;
                        redTurn = false;
                    }
                    else if (bluePick){
                        yellowPlayerScore = yellowPlayerScore - 1;
                        yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
                    }
                    else{
                        yellowPlayerScore = yellowPlayerScore + 1;
                        yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
                    }
                    if (!(blueSkip)){
                        turn = 'Blue';
                    }
                    else{
                        blueSkip = false;
                    }
                }
                else{
                    if (redTurn){
                        turn = 'Yellow';
                        blueSkip = true;
                        redTurn = false;
                    }
                    else if (bluePick){
                        bluePlayerScore = bluePlayerScore + 1;
                        blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
                    }
                    else{
                        bluePlayerScore = bluePlayerScore - 1;
                        blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
                    }
                    if (!(yellowSkip)){
                        turn = 'Yellow';
                    }
                    else{
                        yellowSkip = false;
                    }
                }
                playerTurn.setText(turn + '\'s Turn');
                roll = false;
                pick = false;
            }
        }
        else{
            if (turn == 'Yellow'){
                turn = 'Blue'
            }
            else{
                turn = 'Yellow'
            }
            playerTurn.setText(turn + '\'s Turn');
            roll = false;
            pick = false; 
        }
    }    
}


