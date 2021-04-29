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
let playerPull;
let playerTurnShow;
let coordRed;
let coordYel;
let coordBlu;
let compTurn;
let pull;
let playerSkip;
let compSkip;


//preload
function preload() {
        this.load.image('board', 'assets/board.PNG');
        this.load.image('die', 'assets/die.png');
        this.load.image('cover', 'assets/cover.PNG');
        this.load.audio('diesound', 'assets/dice-roll.mp3');
        this.load.image('done', 'assets/doneButton.png');
        this.load.image('blue', 'assets/blueSquare.PNG');
        this.load.image('yellow', 'assets/yellowSquare.PNG');
        this.load.image('red', 'assets/redSquare.PNG');
    }
    
function create() {

        turn = 'Blue';
        bluePlayerScore = 0;
        roll = false;
        yellowPlayerScore = 0;
        pick = false;
        blueSkip = false;
        yellowSkip = false;
        takePoint = false;
        playerTurn = true;
        compTurn = false;
        pull = false;
        playerSkip = false;
        compSkip = false;

        let startArr = [
            [0, 1, 1, 2, 0, 1, 0],
            [1, 2, 0, 1, 2, 0, 1],
            [0, 0, 1, 1, 0, 1, 0],
            [2, 1, 1, 0, 0, 2, 1],
            [0, 2, 0, 1, 2, 0, 1],
            [1, 0, 1, 0, 1, 2, 0],
            [0, 1, 0, 1, 2, 0, 1],
        ]

        let arr = shuffle(startArr);
     //  var board = this.add.grid(290, 240, 420, 420, 60, 60, 0x66C0CC)
    
       coordRed = []
       coordYel = []
       coordBlu = []
       let startX = 45;
       let startY = 75;

       for (let i = 0; i < 7; i++){
           for (let j = 0; j < 7; j++){
               if (arr[i][j] == 0){
                this.add.image(startX, startY, 'yellow').setScale(.65);
                coordYel.push([startX, startY]);
               }
               else if (arr[i][j] == 1){
                this.add.image(startX, startY, 'blue').setScale(.61);
                coordBlu.push([startX, startY]);
               }
               else{
                this.add.image(startX, startY, 'red').setScale(.62);
                coordRed.push([startX, startY]);
               }

               if(startY == 405){
                   startY = 75
               }
               else{
                   startY += 55;
               }
           }
           startX += 75;
       }

       console.log(coordBlu);
       console.log(coordRed);
       console.log(coordYel);


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

        playerPull = [];
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            playerPull.push([gameObject.x, gameObject.y]);
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.destroy();
            pull = true;
    
        });

        playerTurnShow = this.add.text(400, 10, 'Blue\'s Turn', {fill: 'white'});

        yellowScore = this.add.text(30, 10, 'Yellow\'s Score: 0', {fill: 'yellow'});

        blueScore = this.add.text(30, 460, 'Blue\'s Score: 0', {fill: '#87CEFA'});

        displayText = this.add.text(560, 300, 'Yellow', {fill: 'white'});

        var die = this.add.sprite(590, 250, 'die').setScale(.5).setInteractive();

        die.on('pointerdown', function(pointer) {
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
            roll = true;
        }, this);
    }

function shuffle(arr){
    for (var k = 0; k < arr.length; k++) {
        var i = arr[k].length;
        if (i == 0)
            return false;
        else {
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var tempi = arr[k][i];
                var tempj = arr[k][j];
                arr[k][i] = tempj;
                arr[k][j] = tempi;
            }
        }
    }
    return arr;
}
    
function update() {
    displayText.setText('' + rollValue).setX(580);
    if (compTurn){
        this.sound.play('diesound');
        rollValue = Phaser.Math.Between(1, 6);
        roll = true; 
    } 
    if (roll){
        if (rollValue == 1 || rollValue == 3 || rollValue == 5){
            let found = false;
            let count = 0;
            while (found === false && (pull === true)){
                if (playerSkip){
                    turn = 'Blue'
                    playerSkip = false
                }
                else if (compSkip){
                    turn = 'Yellow'
                    compSkip = false;
                }
                else if ((coordBlu[count][0] === playerPull[0][0]) && ((coordBlu[count][1] === playerPull[0][1]))){
                    if (playerTurn){
                        bluePlayerScore = bluePlayerScore + 1;
                        blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
                        playerTurn = false;
                        compTurn = true;
                        turn = 'Yellow';
                    }
                    else{
                        yellowPlayerScore = yellowPlayerScore - 1;
                        yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
                        playerTurn = true;
                        compTurn = false;
                        turn = 'Blue';
                    }
                    found = true;
                }
                else if (((coordYel[count][0] === playerPull[0][0]) && ((coordYel[count][1] === playerPull[0][1])))){
                    if (playerTurn){
                        bluePlayerScore = bluePlayerScore - 1;
                        blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
                        playerTurn = false;
                        compTurn = true;
                        turn = 'Yellow';
                    }
                    else{
                        yellowPlayerScore = yellowPlayerScore + 1;
                        yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
                        playerTurn = true;
                        compTurn = false;
                        turn = 'Blue';
                    }
                    found = true;
                }
                else if ((count < 9) && (coordRed[count][0] === playerPull[0][0]) && ((coordRed[count][1] === playerPull[0][1]))){
                    if (playerTurn){
                        playerSkip = true;
                    }
                    else{
                        compSkip = true;
                    }
                    found = true;
                }
                else if (count > 20){
                    found = true;
                    console.log('oops')
                }
                count += 1 ;
            }
        }
        playerTurnShow.setText(turn + '\'s Turn');
        roll = false;
        pick = false;
        pull = false;
    }
    
 



    // if (roll){
    //      if (rollValue == 1 || rollValue == 3 || rollValue == 5){
    //     //     if (playerTurn){
    //     //         playerTurn = false;
    //     //         let found = false;
    //     //         let i = 0
    //     //         let redCount = 0;
    //     //         while(!(found)){
    //     //             if ((coordBlu[i][0] === playerPull[0]) && (coordBlu[i][1])){
    //     //                 found = true;
    //     //                 bluePick = true;
    //     //                 yellowPick = false;
    //     //                 blueSkip = false;
    //     //             }
    //     //             else if ((coordYel[i][0] === playerPull[0]) && (coordYel[i][1])){
    //     //                 found = true;
    //     //                 bluePick = false;
    //     //                 yellowPick = true;
    //     //                 blueSkip = false;
    //     //             }
    //     //             else if ((redCount < 9) && (coordRed[i][0] === playerPull[0]) && (coordRed[i][1])){
    //     //                 found = true;
    //     //                 bluePick = false;
    //     //                 yellowPick = false;
    //     //                 blueSkip = true;
    //     //             }
    //     //         }
    //     //         playerTurn = false;
    //     //     }

    //     //     if (compTurn){

    //     //     }
    //         if (pick){
    //             if (turn == 'Yellow'){
    //                 if (redTurn){
    //                     turn = 'Blue';
    //                     yellowSkip = true;
    //                     redTurn = false;
    //                 }
    //                 else if (bluePick){
    //                     yellowPlayerScore = yellowPlayerScore - 1;
    //                     yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
    //                 }
    //                 else{
    //                     yellowPlayerScore = yellowPlayerScore + 1;
    //                     yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
    //                 }
    //                 if (!(blueSkip)){
    //                     turn = 'Blue';
    //                 }
    //                 else{
    //                     blueSkip = false;
    //                 }
    //             }
    //             else{
    //                 if (redTurn){
    //                     turn = 'Yellow';
    //                     blueSkip = true;
    //                     redTurn = false;
    //                 }
    //                 else if (bluePick){
    //                     bluePlayerScore = bluePlayerScore + 1;
    //                     blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
    //                 }
    //                 else{
    //                     bluePlayerScore = bluePlayerScore - 1;
    //                     blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
    //                 }
    //                 if (!(yellowSkip)){
    //                     turn = 'Yellow';
    //                 }
    //                 else{
    //                     yellowSkip = false;
    //                 }
    //             }
    //             playerTurn.setText(turn + '\'s Turn');
    //             roll = false;
    //             pick = false;
    //         }
    //     }
    //     else{
    //         if (turn == 'Yellow'){
    //             turn = 'Blue'
    //         }
    //         else{
    //             turn = 'Yellow'
    //         }
    //         playerTurn.setText(turn + '\'s Turn');
    //         roll = false;
    //         pick = false; 
    //     }
    // }    
}


