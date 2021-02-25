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
let totalFossils = 0;
class MyScene extends Phaser.Scene {

    constructor() {
        super();

        this.bouncy = null;
    }

    preload() {
        // Load an image and call it 'logo'.
        this.load.image('background', 'assets/background.png');
        this.load.image('dino1', 'assets/dino1.png');
        this.load.image('dino2', 'assets/dino2.png');
        this.load.image('dino3', 'assets/dino3.png');
        this.load.image('dino4', 'assets/dino4.png');
        this.load.image('necklace', 'assets/necklace.png');
        this.load.image('pot', 'assets/pot.png');
        this.load.image('amber', 'assets/amber.png');
        this.load.image('dirt', 'assets/dirt.png');
        this.load.image('dirt2', 'assets/dirt2.png');
        this.load.image('gravel', 'assets/gravel.png');
        this.load.image('sand', 'assets/sand.png');
        this.load.audio('brushSound', 'assets/brushSound.mp3')
    }



    create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        //this.input.setDefaultCursor('url(assets/brush.png), pointer');
        this.input.setDefaultCursor('url(assets/brush.cur), pointer');
        this.add.image(380, 270, 'background').setScale(.2);
        this.add.image(100, 270, 'dino1').setScale(.25);
        this.add.image(700, 100, 'dino2').setScale(.5);
        this.add.image(400, 400, 'dino3').setScale(.5);
        this.add.image(350, 100, 'dino4').setScale(1);
        this.add.image(600, 500, 'necklace').setScale(.7);
        this.add.image(130, 600, 'pot').setScale(.8);
        this.add.image(750,270, 'amber').setScale(.5);

        this.dirt1 = this.add.image(650,270, 'dirt').setScale(.5).setInteractive();
        this.dirt2_5 = this.add.image(100, 260, 'dirt2').setScale(.3).setInteractive();
        this.dirt2_6 = this.add.image(300, 400, 'dirt2').setScale(.2).setInteractive();
        this.dirt2_7 = this.add.image(400, 550, 'dirt2').setScale(.3).setInteractive();
        this.sand4 = this.add.image(50, 580, 'sand').setScale(.3).setInteractive();
        this.sand5 = this.add.image(250, 500, 'sand').setScale(.3).setInteractive();

        this.gravel1 = this.add.image(320,30, 'gravel').setScale(.35).setInteractive();
        this.gravel2 = this.add.image(50,120, 'gravel').setScale(.4).setInteractive();
        this.sand6 = this.add.image(500, 400, 'sand').setScale(.3).setInteractive();
        this.sand7 = this.add.image(270, 300, 'sand').setScale(.3).setInteractive();
        this.dirt7 = this.add.image(130,300, 'dirt').setScale(.5).setInteractive();
        this.dirt9 = this.add.image(750,50, 'dirt').setScale(.5).setInteractive();

        this.dirt2_1 = this.add.image(700, 100, 'dirt2').setScale(.3).setInteractive();
        this.dirt2_2 = this.add.image(300, 100, 'dirt2').setScale(.4).setInteractive();
        this.dirt2_3 = this.add.image(700, 430, 'dirt2').setScale(.3).setInteractive();
        this.sand2 = this.add.image(620, 140, 'sand').setScale(.3).setInteractive();
        this.sand3 = this.add.image(380, 100, 'sand').setScale(.3).setInteractive();
        this.dirt2 = this.add.image(630,350, 'dirt').setScale(.6).setInteractive();
        this.dirt3 = this.add.image(400,400, 'dirt').setScale(.7).setInteractive();

        this.dirt6 = this.add.image(600,450, 'dirt').setScale(.4).setInteractive();
        this.dirt2_4 = this.add.image(110, 500, 'dirt2').setScale(.4).setInteractive();
        this.gravel4 = this.add.image(400,300, 'gravel').setScale(.25).setInteractive();
        this.gravel5 = this.add.image(200,400, 'gravel').setScale(.35).setInteractive();
        this.gravel6 = this.add.image(750,300, 'gravel').setScale(.35).setInteractive();
        this.dirt2_8 = this.add.image(460, 50, 'dirt2').setScale(.25).setInteractive();

        this.gravel3 = this.add.image(700,150, 'gravel').setScale(.2).setInteractive();
        this.dirt8 = this.add.image(130,450, 'dirt').setScale(.5).setInteractive();
        this.dirt9 = this.add.image(50,50, 'dirt').setScale(.4).setInteractive();
        this.gravel7 = this.add.image(200,200, 'gravel').setScale(.45).setInteractive();
        this.gravel8 = this.add.image(550,200, 'gravel').setScale(.3).setInteractive();

        this.gravel9 = this.add.image(500,550, 'gravel').setScale(.35).setInteractive();
        this.dirt4 = this.add.image(400,170, 'dirt').setScale(.5).setInteractive();
        this.dirt5 = this.add.image(700,500, 'dirt').setScale(.5).setInteractive();
        this.sand1 = this.add.image(350, 160, 'sand').setScale(.3).setInteractive();
        this.sand8 = this.add.image(100, 50, 'sand').setScale(.3).setInteractive();
        this.sand9 = this.add.image(550, 50, 'sand').setScale(.3).setInteractive();

        this.input.on('gameobjectdown', this.onClicked.bind(this));
      }

        onClicked(pointer, objectClicked){
          objectClicked.destroy();
          this.sound.play('brushSound');
          totalFossils++;
        }

        // this.add.image(400, 300, 'brush').setScale(.2).setInteractive({ cursor: 'asset/brush.png, pointer' });
//}
    update() {
      if (totalFossils == 36){
        this.add.text(50, 200, 'Congrats Scholar!', {fontSize: '70px', fill: 'yellow'});
        this.add.text(130, 300,  'You Found Them All!', {fontSize:'50px', fill: 'yellow'});

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
