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
let compPlay = false
let bluepiece1;
let bluepiece2;
let bluepiece3;
let yellowpiece1;
let yellowpiece2;
let yellowpiece3;
let whoTurn;

function preload() {
        this.load.image('board', 'assets/board.jpg');
        this.load.image('bluepiece', 'assets/bluepiece.png');
        this.load.image('yellowpiece', 'assets/yellowpiece.png');
        this.load.image('redsquare', 'assets/redsquare.png');
        this.load.image('die', 'assets/die.png');
        this.load.audio('diesound', 'assets/dice-roll.mp3');
        this.load.image('done', 'assets/doneButton.png');
        this.load.image('yTile', 'assets/yellowTile.jpg');

    }
    
function create() {
        var background = this.add.image(205, 240, 'board').setScale(.67).setInteractive();
        background.on('pointerdown', function(pointer){
            this.add.sprite(pointer.x, pointer.y, 'redsquare');
        }, this);

        displayText = this.add.text(570, 300, 'Your Turn', {fill: 'white'});

        var die = this.add.sprite(575, 250, 'die').setScale(.5).setInteractive();

        die.on('pointerdown', function(pointer) {
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
        }, this);

        done = this.add.sprite(580, 430, 'done').setScale(.8).setInteractive();

        done.on('pointerdown', function(pointer){
            this.sound.play('diesound');
            rollValue = Phaser.Math.Between(1, 6);
            compPlay = true
        }, this);

        bluepiece1 = this.add.sprite(50,40, 'bluepiece').setInteractive({ draggable: true });
        bluepiece2 = this.add.sprite(250,40, 'bluepiece').setInteractive({ draggable: true });
        bluepiece3 = this.add.sprite(460,40, 'bluepiece').setInteractive({ draggable: true });


        yellowpiece1 = this.add.sprite(50,440, 'yellowpiece').setInteractive({ draggable: true });
        yellowpiece2 = this.add.sprite(250,440, 'yellowpiece').setInteractive({ draggable: true });
        yellowpiece3 = this.add.sprite(460,440, 'yellowpiece').setInteractive({ draggable: true });
        

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

    }
    
function update() {
    displayText.setText('' + rollValue);

    if (compPlay){
        
        compPlay = false; 
        
       if (((rollValue == 1) || (rollValue == 4)) && (bluepiece1 != null)){
           if (rollValue == 1){
               if ((bluepiece1.y + 80 < 250) && (!(bluepiece2.getBounds().contains(bluepiece1.x, (bluepiece1.y + 80)))) && (!(bluepiece3.getBounds().contains(bluepiece1.x, (bluepiece1.y + 80))))){
                   bluepiece1.setPosition(bluepiece1.x, (bluepiece1.y+80))
                   //move piece forward
               }
               else if ((bluepiece1.x + 100 < 430) && (!(bluepiece2.getBounds().contains(bluepiece1.x, (bluepiece1.y + 100)))) && (!(bluepiece3.getBounds().contains(bluepiece1.x, (bluepiece1.y + 100))))){
                   bluepiece1.setPosition((bluepiece1.x + 100), bluepiece1.y);
               }
               else if ((bluepiece1.x - 100 >= 50) && (!(bluepiece2.getBounds().contains(bluepiece1.x, (bluepiece1.y - 100)))) && (!(bluepiece3.getBounds().contains(bluepiece1.x, (bluepiece1.y - 100))))){
                   bluepiece1.setPosition((bluepiece1.x - 100), bluepiece1.y);
               }
               else{
                   if (!(bluepiece1.y - 80 >= 40) && (!(bluepiece2.getBounds().contains(bluepiece1.x, (bluepiece1.y - 80)))) && (!(bluepiece3.getBounds().contains(bluepiece1.x, (bluepiece1.y - 80))))){
                    bluepiece1.setPosition(bluepiece1.x, (bluepiece1.y - 80));
                   }
                   else{}
               }
           }
           else{
               if ((bluepiece1.x > 430)){
                this.add.sprite((bluepiece1.x - 100), (bluepiece1.y + 240), 'redsquare');
               }
               else{
                this.add.sprite((bluepiece1.x + 100), (bluepiece1.y + 240), 'redsquare');
               }
           }
       }
       else if (((rollValue == 2) || (rollValue == 6)) && (bluepiece2 != null)){
           if (rollValue == 2){
            if ((bluepiece2.y + 160 < 250) && (!(bluepiece1.getBounds().contains(bluepiece2.x, (bluepiece2.y + 160)))) && (!(bluepiece3.getBounds().contains(bluepiece2.x, (bluepiece2.y + 160))))){
                bluepiece2.setPosition(bluepiece2.x, (bluepiece2.y+160))
                //move piece forward
            }
            else if ((bluepiece2.x + 200 < 430) && (!(bluepiece1.getBounds().contains(bluepiece2.x, (bluepiece2.y + 200)))) && (!(bluepiece3.getBounds().contains(bluepiece2.x, (bluepiece2.y + 200))))){
                bluepiece2.setPosition((bluepiece2.x + 200), bluepiece2.y);
            }
            else if ((bluepiece2.x - 200 >= 50) && (!(bluepiece1.getBounds().contains(bluepiece2.x, (bluepiece2.y - 200)))) && (!(bluepiece3.getBounds().contains(bluepiece2.x, (bluepiece2.y - 200))))){
                bluepiece2.setPosition((bluepiece2.x - 200), bluepiece2.y);
            }
            else{
                if ((bluepiece2.y - 160 >= 40) && (!(bluepiece1.getBounds().contains(bluepiece2.x, (bluepiece2.y - 160)))) && (!(bluepiece3.getBounds().contains(bluepiece2.x, (bluepiece2.y - 160))))){
                    bluepiece2.setPosition(bluepiece2.x, (bluepiece2.y - 160));
                   }
                   else{}
            }
           }
           else{
            if ((bluepiece2.x >= 250) && (bluepiece2.y < 60)){
                this.add.sprite((bluepiece2.x - 100), (bluepiece2.y + 400), 'redsquare');
               }
            else if ((bluepiece2.x >= 250) && (bluepiece2.y < 100)){
                this.add.sprite((bluepiece2.x - 200), (bluepiece2.y + 320), 'redsquare');
               }
            else if ((bluepiece2.x >= 250) && (bluepiece2.y < 260)){
                this.add.sprite((bluepiece2.x - 300), (bluepiece2.y + 240), 'redsquare');
            }
            else if ((bluepiece2.x <= 250) && (bluepiece2.y < 60)){
                this.add.sprite((bluepiece2.x + 100), (bluepiece2.y + 400), 'redsquare');
               }
            else if ((bluepiece2.x <= 250) && (bluepiece2.y < 100)){
                this.add.sprite((bluepiece2.x + 200), (bluepiece2.y + 320), 'redsquare');
               }
            else if ((bluepiece2.x <=250) && (bluepiece2.y < 260)){
                this.add.sprite((bluepiece2.x + 300), (bluepiece2.y + 240), 'redsquare');
            }
           }
        }
        else{
            if (rollValue == 3){
                if ((bluepiece3.y + 240 < 250) && (!(bluepiece1.getBounds().contains(bluepiece3.x, (bluepiece3.y + 160)))) && (!(bluepiece2.getBounds().contains(bluepiece3.x, (bluepiece3.y + 160))))){
                    bluepiece3.setPosition(bluepiece3.x, (bluepiece3.y+240))
                    //move piece forward
                }
                else if ((bluepiece3.x + 300 < 430) && (!(bluepiece1.getBounds().contains(bluepiece3.x, (bluepiece3.y + 200)))) && (!(bluepiece2.getBounds().contains(bluepiece3.x, (bluepiece3.y + 200))))){
                    bluepiece3.setPosition((bluepiece3.x + 300), bluepiece3.y);
                }
                else if ((bluepiece3.x - 300 >= 50) && (!(bluepiece1.getBounds().contains(bluepiece3.x, (bluepiece3.y - 200)))) && (!(bluepiece2.getBounds().contains(bluepiece3.x, (bluepiece3.y - 200))))){
                    bluepiece3.setPosition((bluepiece3.x - 300), bluepiece3.y);
                }
                else{
                    if ((bluepiece3.y - 240 >= 40) && (!(bluepiece1.getBounds().contains(bluepiece3.x, (bluepiece3.y - 160)))) && (!(bluepiece2.getBounds().contains(bluepiece3.x, (bluepiece3.y - 160))))){
                        bluepiece3.setPosition(bluepiece3.x, (bluepiece3.y - 240));
                        }
                        else{}
                }
                }
                else{
                    if ((bluepiece3.x >= 250) && (bluepiece3.y < 60)){
                        this.add.sprite((bluepiece3.x - 100), (bluepiece3.y + 320), 'redsquare');
                       }
                    else if ((bluepiece3.x >= 250) && (bluepiece3.y < 100)){
                        this.add.sprite((bluepiece3.x - 200), (bluepiece3.y + 240), 'redsquare');
                       }
                    else if ((bluepiece3.x >= 250) && (bluepiece3.y < 260)){
                        this.add.sprite((bluepiece3.x - 300), (bluepiece3.y + 160), 'redsquare');
                    }
                    else if ((bluepiece3.x <= 250) && (bluepiece3.y < 60)){
                        this.add.sprite((bluepiece3.x + 100), (bluepiece3.y + 320), 'redsquare');
                       }
                    else if ((bluepiece3.x <= 250) && (bluepiece3.y < 100)){
                        this.add.sprite((bluepiece3.x + 200), (bluepiece3.y + 240), 'redsquare');
                       }
                    else if ((bluepiece3.x <=250) && (bluepiece3.y < 260)){
                        this.add.sprite((bluepiece3.x + 300), (bluepiece3.y + 160), 'redsquare');
                    }
                }
                //place red square
                
            }
        }
         
    }


