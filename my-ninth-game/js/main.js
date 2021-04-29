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
let pullColor;
let extraText;

let cover11;
let cover12;
let cover13;
let cover14;
let cover15;
let cover16;
let cover17;

let cover21;
let cover22;
let cover23;
let cover24;
let cover25;
let cover26;
let cover27;

let cover31;
let cover32;
let cover33;
let cover34;
let cover35;
let cover36;
let cover37;

let cover41;
let cover42;
let cover43;
let cover44;
let cover45;
let cover46;
let cover47;

let cover51;
let cover52;
let cover53;
let cover54;
let cover55;
let cover56;
let cover57;

let cover61;
let cover62;
let cover63;
let cover64;
let cover65;
let cover66;
let cover67;

let cover71;
let cover72;
let cover73;
let cover74;
let cover75;
let cover76;
let cover77;

let coverCollect;

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
       blueSkip = false;

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


        cover15 = this.add.image(45,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover11 = this.add.image(45,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover12 = this.add.image(45,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover13 = this.add.image(45,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover14 = this.add.image(45,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover16 = this.add.image(45,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover17 = this.add.image(45,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        cover25 = this.add.image(120,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover21 = this.add.image(120,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover22 = this.add.image(120,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover23 = this.add.image(120,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover24 = this.add.image(120,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover26 = this.add.image(120,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover27 = this.add.image(120,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        cover31 = this.add.image(195,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover32 = this.add.image(195,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover33 = this.add.image(195,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover34 = this.add.image(195,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover35 = this.add.image(195,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover36 = this.add.image(195,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover37 = this.add.image(195,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        cover41 = this.add.image(270,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover42 = this.add.image(270,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover43 = this.add.image(270,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover44 = this.add.image(270,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover45 = this.add.image(270,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover46 = this.add.image(270,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover47 = this.add.image(270,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        cover51 = this.add.image(345,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover52 = this.add.image(345,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover53 = this.add.image(345,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover54 = this.add.image(345,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover55 = this.add.image(345,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover56 = this.add.image(345,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover57 = this.add.image(345,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        cover61 = this.add.image(420,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover62 = this.add.image(420,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover63 = this.add.image(420,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover64 = this.add.image(420,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover65 = this.add.image(420,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover66 = this.add.image(420,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover67 = this.add.image(420,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        cover71 = this.add.image(495,75, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover72 = this.add.image(495,130, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover73 = this.add.image(495,185, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover74 = this.add.image(495,240, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover75 = this.add.image(495,295, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover76 = this.add.image(495,350, 'cover').setScale(.61).setInteractive({ draggable: true });
        cover77 = this.add.image(495,405, 'cover').setScale(.61).setInteractive({ draggable: true });

        coverCollect = [
            [cover11, cover21, cover31, cover41, cover51, cover61, cover71],
            [cover12, cover22, cover32, cover42, cover52, cover62, cover72],
            [cover13, cover23, cover33, cover43, cover53, cover63, cover73],
            [cover14, cover24, cover34, cover44, cover54, cover64, cover74],
            [cover15, cover25, cover35, cover45, cover55, cover65, cover75],
            [cover16, cover26, cover36, cover46, cover56, cover66, cover76],
            [cover17, cover27, cover37, cover47, cover57, cover67, cover77],
        ]

        playerPull = [];
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            playerPull.push([gameObject.x, gameObject.y]);
            gameObject.x = dragX;
            gameObject.y = dragY;
            for (let i = 0; i < 20; i++){
                if (coordBlu[i][0] == gameObject.x && coordBlu[i][1] == gameObject.y){
                    pullColor = 'blue';
                    let x = Math.ceil((coordBlu[i][0]/75)) - 1;
                    let y = Math.floor((coordBlu[i][1]/55)) - 1;
                    if (y < 0){
                        y = 0;
                    }
                    coverCollect[x].splice(y, 0, 'x');
                    coordBlu.splice(i, 1);
                }
                else if (coordYel[i][0] == gameObject.x && coordYel[i][1] == gameObject.y){
                    pullColor = 'yellow';
                    let x = Math.ceil((coordYel[i][0]/75)) - 1;
                    let y = Math.floor((coordYel[i][1]/55)) - 1;
                    if (y < 0){
                        y = 0;
                    }
                    coverCollect[x].splice(y, 0, 'x');
                    coordYel.splice(i, 1);
                }
                else{
                    if (!(i >= coordRed.length)){
                        pullColor = 'red';
                        console.log(coordRed);
                        let x = Math.ceil((coordRed[i][0]/75)) - 1;
                        let y = Math.floor((coordRed[i][1]/55)) - 1;
                        if (y < 0){
                            y = 0;
                        }
                        coverCollect[x].splice(y, 0, 'x');
                        coordRed.splice(i, 1);
                    }
                }
            }
            pull = true;
            gameObject.destroy();
    
        });

        extraText = this.add.text(560, 120, 'Roll \nTo \nStart!', {fill: 'white'});

        playerTurnShow = this.add.text(400, 10, 'Blue\'s Turn', {fill: 'white'});

        yellowScore = this.add.text(30, 10, 'Yellow\'s Score: 0', {fill: 'yellow'});

        blueScore = this.add.text(30, 460, 'Blue\'s Score: 0', {fill: '#87CEFA'});

        displayText = this.add.text(560, 300, 'Yellow', {fill: 'white'});

        var die = this.add.sprite(590, 250, 'die').setScale(.5).setInteractive();

        die.on('pointerdown', function(pointer) {
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
            roll = true;
            displayText.setText('' + rollValue).setX(580);
            playerTurn = true;
            compTurn = false; 
            if (rollValue == 1 || rollValue == 3 || rollValue == 5){
                extraText.setText('Pull A \n Card!');
                compTurn = false;
            }
            else{
                setTimeout('', 3000);
            }
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
    if (roll){
       if (compTurn){
           playerTurnShow.setText('Yellow\'s Turn');
           setTimeout('', 3000);
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
            roll = true; 
            displayText.setText('' + rollValue).setX(580);
            if (rollValue == 1 || rollValue == 3 || rollValue == 5){
                extraText.setText('Pull A \n Card!')
                let cardColor = Phaser.Math.Between(0, 2);
                if (cardColor == 0){
                    pick = Phaser.Math.Between(0, coordBlu.length -1);
                    let x = Math.ceil((coordBlu[pick][0]/75)) - 1;
                    let y = Math.floor((coordBlu[pick][1]/55)) - 1;
                    if (y < 0){
                        y = 0;
                    }
                    let temp = coverCollect[x][y];
                    temp.destroy();
                    coverCollect[x].splice(y, 1);
                    coverCollect[x].splice(y, 0, 'x');
                    yellowPlayerScore--;
                    yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
                    coordBlu.splice(pick, 1)

                }
                else if (cardColor == 1){
                    pick = Phaser.Math.Between(0, coordYel.length - 1);
                    let x = Math.ceil((coordYel[pick][0]/75)) - 1;
                    let y = Math.floor((coordYel[pick][1]/55)) - 1;
                    if (y < 0){
                        y = 0;
                    }
                    let temp = coverCollect[x][y];
                    temp.destroy();
                    coverCollect[x].splice(y, 1);
                    coverCollect[x].splice(y, 0, 'x');
                    yellowPlayerScore++;
                    yellowScore.setText('Yellow\'s Score: ' + yellowPlayerScore);
                    coordYel.splice(pick, 1)
                    compTurn = false;
                 }
                else{
                    pick = Phaser.Math.Between(0, coordRed.length - 1);
                    let x = Math.ceil((coordRed[pick][0]/75)) - 1;
                    let y = Math.floor((coordRed[pick][1]/55)) - 1;
                    if (y < 0){
                        y = 0;
                     }
                    let temp = coverCollect[x][y];
                    temp.destroy();
                    coverCollect[x].splice(y, 1);
                    coverCollect[x].splice(y, 0, 'x');
                    coordRed.splice(pick, 1)
                    compTurn = false;
                }
            }
            playerTurnShow.setText('Blue\'s Turn');
            roll = false;  
         }
       else{
           if (pull){
            if (pullColor == 'blue'){
                bluePlayerScore++;
                compTurn = true;
                roll = true;
                pull = false;
            }
            else if (pullColor == 'yellow'){
                bluePlayerScore--;
                compTurn = true;
                roll = true;
                pull = false;
            }
            else if (pullColor == 'red'){
                extraText.setText('Lose a \nturn!');
                compTurn = true;
                roll = true;
                pull = false;
            }
           }
           else if (rollValue == 2 || rollValue == 4 || rollValue == 6){
            blueScore.setText('Blue\'s Score: ' + bluePlayerScore);
            playerTurnShow.setText('Yellow\'s Turn');
            compTurn = true;
            roll = true;
            pull = false;
           }
       } 
    }
}


