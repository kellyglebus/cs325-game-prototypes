import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

let count;
let playerCount;
let found;
let displayText;
let tries;
let turn;
let blue;
let extraTry;

class MyScene extends Phaser.Scene {
    
    constructor() {
        super();
        
        this.bouncy = null;
    }

    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'blue', 'assets/blue.PNG' );
        this.load.image('pink', 'assets/pink.png');
        this.load.image('yellow', 'assets/yellow.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('cover', 'assets/cover.png');
        this.load.image('end', 'assets/end.png');
    }
    
    create() {

        count = 0;
        found = false;
        tries = 5;
        turn = false;
        extraTry = false;

        displayText = this.add.text(700, 300, 'Tries \nleft: ' + tries, {fill: 'white'});

        let startB = [
            [1, 1, 2, 0],
            [1, 2, 0, 1],
            [2, 2, 1, 2],
            [1, 1, 2, 3]
        ]

        let board = this.shuffle(startB);
        let star = [];
        let startX = 150;
        let startY = 70;
        blue = [];

        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                if (board[i][j] == 0){
                    this.add.image( startX, startY, 'blue');
                    blue.push([startX, startY]);
                }
                else if (board[i][j] == 1){
                    this.add.image(startX, startY, 'pink');
                }
                else if (board[i][j] == 2){
                    this.add.image(startX, startY, 'yellow');
                }
                else{
                    this.add.image(startX, startY, 'star');
                    star.push(startX);
                    star.push(startY);

                }
                if (startX == 600){
                    startX = 150;
                }
                else{
                    startX += 150;
                }
            }
            startY += 150;
        }
        console.log(blue);

        let cover11 = this.add.image(150, 70, 'cover').setInteractive({ draggable: true });
        let cover12 = this.add.image(300, 70, 'cover').setInteractive({ draggable: true });
        let cover13 = this.add.image(450, 70, 'cover').setInteractive({ draggable: true });
        let cover14 = this.add.image(600, 70, 'cover').setInteractive({ draggable: true });

        let cover21 = this.add.image(150, 220, 'cover').setInteractive({ draggable: true });
        let cover22 = this.add.image(300, 220, 'cover').setInteractive({ draggable: true });
        let cover23 = this.add.image(450, 220, 'cover').setInteractive({ draggable: true });
        let cover24 = this.add.image(600, 220, 'cover').setInteractive({ draggable: true });

        let cover31 = this.add.image(150, 370, 'cover').setInteractive({ draggable: true });
        let cover32 = this.add.image(300, 370, 'cover').setInteractive({ draggable: true });
        let cover33 = this.add.image(450, 370, 'cover').setInteractive({ draggable: true });
        let cover34 = this.add.image(600, 370, 'cover').setInteractive({ draggable: true });

        let cover41 = this.add.image(150, 520, 'cover').setInteractive({ draggable: true });
        let cover42 = this.add.image(300, 520, 'cover').setInteractive({ draggable: true });
        let cover43 = this.add.image(450, 520, 'cover').setInteractive({ draggable: true });
        let cover44 = this.add.image(600, 520, 'cover').setInteractive({ draggable: true });


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (gameObject.X == star[0] && gameObject.y == star[1]){
                found = true;
            }
            for (let i = 0; i < 2; i++){
                if (gameObject.x == blue[i][0] && gameObject.y == blue[i][1]){
                    extraTry = true;
                }
            }
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.destroy();
            count++;
            turn = true;
        });


    }

    shuffle(arr){
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
    
    update() {

    if (turn){
        tries--;
            if (tries == 0 && found == false && extraTry != true){
                this.add.image(400, 300, 'end').setScale(4)
                this.add.text(300, 300, 'Game Over: You Lose. \n Refresh to Try Again', {fill: 'black'});
            }
            else if (found){
                this.add.image(400, 300, 'end').setScale(4)
                this.add.text(300, 300, 'Game Over: You Win! \n Refresh to Try Again', {fill: 'black'});
            }
            else if (extraTry){
                tries = tries + 2;
                count--;
                extraTry = false;
            }
        turn = false;
        displayText.setText('Tries \nleft: ' + tries);
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
