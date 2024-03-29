<!DOCTYPE html> 
<!--__****************<<Karthik, Friday Jan, 15th, 4:45 p.m ,>>*************************__-->
<!--__***************<<Taymur, Friday Jan, 15th, 4:45 p.m, >>****************************__-->
<!--__****************<<Nehan, Friday Jan, 15th, 4:45p.m,   >>**********************__-->
<html>
    <head>
        <link rel="icon" href="images/icon.jpg">
        <script src="https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js"></script>
        <title>Bloons Tower Defence</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body id="homepage">
        <h1 id="homeTitle">ICS3U Summative Programming Project</h1>
        <h2 id="byline">Created by Karthik, Nehan, Taymur</h2>
        <script>
            /******************************Karthik, Friday Jan, 15th, 4:40 p.m**********************************/

            let btdName;
            //needs to be grlobal because it needs to be accessed from the names function, the create loop to display it, and also needed for the end screen

            let finish;
            //This variable represents the red box at the end of the game, it is required in the create and required in the update to constantly check if the bloon collides with the finish to then display the end screen

            //Array Of All Types Of Bloons
            let arrBloons=[];
            let arrBlueBloons=[];
            let arrGreenBloons=[];
            let arrCamoBlue=[];
            let arrCamoRed=[];
            let arrCamoGreen=[];
            //These are perhaps the most used arrays in our game, it needs to be accessible from the create, update, startbloons, and custom functions which means these must be arrays must be global

            //
            let releaseCounter=0;
            let releaseCounter2=0;
            let releaseCounter3=0;
            let releaseCounter4=0;
            let releaseCounter5=0;
            let releaseCounter6=0;
            //These are global counters that are required in 6 of our custom functions they are only used once but absolutely must be global so that all 6 of our custom functions to release the balloon can access it. Also we couldn't make these local because you need to be able to update the index position of each type of balloon and you can not update it during our callback loop in the create fuction since our custom functions can not access that. 

            let _this;//used almost everywhere in our code and ust be accessible and declared globally to avoid errors
            //This must be scoped globally because it is used in our custom
            
            //stages of balloons
            var stage1;
            var stage2;
            var stage3;
            var stage4;
            var stage5;
            var stage6;
            //Again these variables must be global because they push the index value which is constantly being updated in the update section for each type of balloon, the number after the stage represents what type of balloon it is in order from slowest to fastest. These variables are also used in our bubble sorting custom function and during the collision checker.
            
            /**************************************Nehan, Friday Jan, 15th, 4:40 p.m*******************************************/
            let selectedMonkey;

            //projectiles
            let dart;
            let darts=[];
            //These variables must be stored globally because all the mouse involved custom functions require accessibility to dart and array darts and is also used in the create and update section to check when a dart collides with a balloon


            var score = 0;//This is updated in the update section so that the value of score increases a different amount based on the balloon they popped, it also needs to be accessible to the create function since we chose to have is being constantly shown on the man screen of the game
            var scoreText;
            //These 2 variables are global because it is required in the create loop and also is always being used in the update loop to update the score when a balloon is popped
            
            var redPop=0;
            var camoRedPop=0;
            var bluePop=0;
            var camoBluePop=0;
            var greenPop=0;
            var camoGreenPop=0;
            //All the bloon popping counters must be global because they are being updated in the update section when a balloon of each type is popped it adds to this counter and is then also used by the bubblesorting function and endscreen functions to display how many of each type of balloon they popped at the end. These variables will not work if placed anywhere else.
            var pop; //Sound effect must be declared because it is required from the create function and the collision checks in the update to play the sound effect when a balloon is popped

            /**********************************Taymur, Friday Jan, 15th, 4:40 p.m******************************************/

            alert('Please Wait While The Game Loads...');
            
            name=prompt('What is your name?');

            let redInput=+prompt('Enter the number of Red Balloons you would like to face\n minimum of 1 and maximum of 75');
            if(redInput>=1 && redInput<=75)
                {
                    redRange+=redInput-1;
                }
            else
                {
                    alert('The number you have entered for this section does not meet the requirements, it will default to 1');
                }
            let camoRedInput=+prompt('Enter the number of Camo Red Balloons you would like to face\n minimum of 1 and maximum of 75');
            if(camoRedInput>=1 && camoRedInput<=75)
                {
                    camoRedRange+=camoRedInput-1;
                }
            else
                {
                    alert('The number you have entered for this section does not meet the requirements, it will default to 1');
                }
            let blueInput=+prompt('Enter the number of Blue Balloons you would like to face\n minimum of 1 and maximum of 75');
            if(blueInput>=1 && blueInput<=75)
                {
                    blueRange+=blueInput-1;
                }
            else
                {
                    alert('The number you have entered for this section does not meet the requirements, it will default to 1');
                }
            let camoBlueInput=+prompt('Enter the number of Camo Blue Balloons you would like to face\n minimum of 1 and maximum of 75');
            if(camoBlueInput>=1 && camoBlueInput<=75)
                {
                    camoBlueRange+=camoBlueInput-1;
                }
            else
                {
                    alert('The number you have entered for this section does not meet the requirements, it will default to 1');
                }

            let greenInput=+prompt('Enter the number of Green Balloons you would like to face\n minimum of 1 and maximum of 75');
            if(greenInput>=1 && greenInput<=75)
                {
                    greenRange+=greenInput-1;
                }
            else
                {
                    alert('The number you have entered for this section does not meet the requirements, it will default to 1');
                }
            let camoGreenInput=+prompt('Enter the number of Camo Green Balloons you would like to face\n minimum of 1 and maximum of 75');
            if(camoGreenInput>=1 && camoGreenInput<=75)
                {
                    camoGreenRange+=camoGreenInput-1;
                }
            else
                {
                    alert('The number you have entered for this section does not meet the requirements, it will default to 1');
                }
            
            //CUSTOM FUNCTIONS
            /********************************************************************
            USE OF BUBBLE SORT
            *********************************************************************/
             /*<!--__************************************<<Nehan, Wednesday Jan, 20th, 7:00 p.m, >>*************************************__-->*/
            function bubbleSortBloonPopped()
                {
                    //array for baloon popping
                    let bubbleSortBloon=[];
                    let tempStorage=0;
                    //all scoped within the function
                    bubbleSortBloon.push(redPop);
                    bubbleSortBloon.push(camoBluePop);
                    bubbleSortBloon.push(camoRedPop);
                    bubbleSortBloon.push(camoGreenPop);
                    bubbleSortBloon.push(greenPop);
                    bubbleSortBloon.push(bluePop);
                    for(let x=bubbleSortBloon.length-1;x>0;x--)
                        {
                            for(let i=0; i<x;i++)
                                {
                                    if(bubbleSortBloon[i]>bubbleSortBloon[i+1])
                                        {
                                            tempStorage=bubbleSortBloon[i];
                                            bubbleSortBloon[i]=bubbleSortBloon[i+1];
                                            bubbleSortBloon[i+1]=tempStorage;
                                        }
                                }
                        }
                    //To help us bubble sort I used https://www.youtube.com/watch?v=RqfWvIsYmsc&ab_channel=AndyWicksw
                    alert(bubbleSortBloon);
                }
            //bloon x direction function
            function bloonX(num);
                for(var i = 0; i < num; i++){
                    bloon.x=-100000000;
                }
            /********************************************************************
            USE OF STRING FUNCTION
            *********************************************************************/
             /*<!--__************************************<<Taymur, Wednesday Jan, 20th, 7:15 p.m, >>***************************************__-->*/
            function names()//string function 
                {
                    //all scoped within the function
                    let name = prompt("what is your name?");//prompts for name from user
                    let list = ["Lt.","Capt.","Srgt."]
                    let name_1 = name.charAt(0).toUpperCase() + name.slice(1);
                    let name_2 = name_1.replace(/ /g,'');
                    let item = list[Math.floor(Math.random() * list.length)];
                    btdName = item + name_2
                    return btdName;
                }


            class mainGame extends Phaser.Scene {
                    /******************************************Nehan, Friday Jan, 15th, 4:40 p.m*****************************************/
                constructor (config)
                {
                    super(config);
                    _this=this;
                }
                
                preload ()
                {
                    //map stuff
                    this.load.image('map', 'extras/map.png');
                    this.load.image('cursor2', 'extras/cursor.png');
                    this.load.image('start', 'extras/green.png');
                    this.load.image('finish', 'extras/red.png');
                    //bloons
                    this.load.image('redbloon', 'loonsSprites/BTD6Red.png');
                    this.load.image('camored', 'loonsSprites/Camo_Red.png');
                    this.load.image('bluebloon', 'loonsSprites/BTD6Blue.png');
                    this.load.image('camoblue', 'loonsSprites/BTD6CamoBlue.png');
                    this.load.image('greenbloon', 'loonsSprites/BTD6Green.png');
                    this.load.image('camogreen', 'loonsSprites/BTD6CamoGreen.png');


                    //shop background
                    this.load.image('menubarbottom', 'extras/menuBottom.png');
                    this.load.image('menubarright', 'extras/menuSide.png');
                    //3dMonkeys
                    this.load.image('shopDart', 'extras/dartReal.png');
                    this.load.image('shopNinja', 'extras/ninjaReal.png');
                    this.load.image('shopWizard', 'extras/wizardReal.png');
                    this.load.image('shopSniper', 'extras/sniperReal.png');
                    this.load.image('shopCannon', 'extras/cannonReal.png');
                    this.load.image('shopBanana', 'extras/bananafarmReal.png');
                    this.load.image('shopSuperMonkey', 'extras/supermonkeyReal.png');
        
                    //2d Monkey Sprites
                    this.load.image('dartMonkey','towerSprites/Dart_Monkey.png');
                    this.load.image('ninjaMonkey','towerSprites/Ninja_Monkey.png');
                    this.load.image('wizardMonkey','towerSprites/Monkey_Apprentice.png');
                    this.load.image('sniperMonkey','towerSprites/Sniper_Monkey.png');
                    this.load.image('cannon','towerSprites/Bomb_Tower.png');
                    this.load.image('farm','towerSprites/Banana_Farm.png');
                    this.load.image('superMonkey','towerSprites/Super_Monkey.png');

                    /*<!--__*****************************<<Taymur, Wednesday Jan, 21st, 6:50 p.m ,>>****************************************__-->*/
                    //projectiles
                    this.load.image('dart', 'projectilesSprites/GoldDart.png');

                    //CrossHairs
                    this.load.image('crossHair', 'extras/crosshair.png');
                    this.load.image('crossHairRed', 'extras/crosshairRed.png');
                    this.load.image('crossHairGrey', 'extras/crosshairGrey.png');
                    this.load.image('crossHairMagenta', 'extras/crosshairMagenta.png');
                    this.load.image('crossHairBlack', 'extras/crosshairBlack.png');
                    this.load.image('crossHairGold', 'extras/crosshairGold.png');
                    this.load.image('crossHairBlue', 'extras/crosshairBlue.png');
                    //music
                    this.load.audio('btdAudio', 'music/btdAudio.mp3');
                    this.load.audio('pop', 'music/pop.mp3');
                }//in the preload function we will load our game resources

                create (data)
                { 
                    //2d Monkey Sprites
                    let dartMonkey;
                    let dartMonkeys=[];
                    //these are variables are not global because they are only required in the create void
                    let ninjaMonkey;
                    let ninjaMonkeys=[];
                    //these are variables are not global because they are only required in the create void
                    let wizardMonkey;
                    let wizardMonkeys=[];
                    //these are variables are not global because they are only required in the create void
                    let sniperMonkey;
                    let sniperMonkeys=[];
                    //these are variables are not global because they are only required in the create void
                    let cannon;
                    let cannons=[];
                    //these are variables are not global because they are only required in the create void
                    let farm;
                    let farms=[];
                    //these are variables are not global because they are only required in the create void
                    let superMonkey;
                    let superMonkeys=[];
                    //these are variables are not global because they are only required in the create void
                    let pathPoints;//*****************************A variable to hold the coordinates of the path the monkey sprite will follow **************************

                    /******************************Karthik, Friday Jan, 15th, 5:20 p.m**************************************/
                    let actualPath;//********************************A variable that will hold the path made out of the coordinate points ********************************\\
                    let map = this.add.sprite(415, 267, 'map');
                    let menubarbottom = this.add.sprite(415, 634, 'menubarbottom');
                    let menubarright  = this.add.sprite(930, 367, 'menubarright');

                    let redRange=10;
                    let camoRedRange=20;
                    let blueRange=20;
                    let camoBlueRange=25;
                    let greenRange=25;
                    let camoGreenRange=25;
                    //audio
                    var music;
                    //These are the amount of balloons of each type which is used by iterating trough their lengths, these are only required and used in the create void
                    //code to make array of monkeys draggable

                    //music
                    music = this.sound.add('btdAudio');
                    music.play();

                    pop = this.sound.add('pop');

                    this.input.setDefaultCursor('pointer');

                    for(let x=0;x<10;x++)
                        {
                            dartMonkey = this.add.sprite(120, 630, 'dartMonkey');
                            
                            dartMonkey.setInteractive();

                            this.input.setDraggable(dartMonkey);

                           
                            dartMonkeys.unshift(dartMonkey);
                        }
                    let shopDart = this.add.sprite(100, 630, 'shopDart');
                    let crossHair = this.add.sprite(114, 640, 'crossHair');


                    for(let x=0;x<10;x++)
                        {
                            ninjaMonkey = this.add.sprite(318, 630, 'ninjaMonkey');
                            
                            ninjaMonkey.setInteractive();

                            this.input.setDraggable(ninjaMonkey);

                           
                            ninjaMonkeys.unshift(ninjaMonkey);
                        }
                    let shopNinja = this.add.sprite(318, 630, 'shopNinja');
                    let crossHairRed = this.add.sprite(318, 640, 'crossHairRed');

                    for(let x=0;x<10;x++)
                        {
                            wizardMonkey = this.add.sprite(510, 630, 'wizardMonkey');
                            
                            wizardMonkey.setInteractive();

                            this.input.setDraggable(wizardMonkey);

                           
                            wizardMonkeys.unshift(wizardMonkey);
                        }
                    let shopWizard = this.add.sprite(510, 620, 'shopWizard');
                    let crossHairGrey = this.add.sprite(510, 640, 'crossHairGrey');
                    /*<!--__************************<<TaymurThursday Jan, 22nd, 4:00 p.m, >>****************************__-->*/

                    for(let x=0;x<10;x++)
                        {
                            sniperMonkey = this.add.sprite(664, 630, 'sniperMonkey');
                            
                            sniperMonkey.setInteractive();

                            this.input.setDraggable(sniperMonkey);

                           
                            sniperMonkeys.unshift(sniperMonkey);
                        }
                    let shopSniper = this.add.sprite(664, 622, 'shopSniper');
                    let crossHairMagenta = this.add.sprite(664, 640, 'crossHairMagenta');

                    for(let x=0;x<10;x++)
                        {
                            cannon = this.add.sprite(890, 626, 'cannon');
                            
                            cannon.setInteractive();

                            this.input.setDraggable(cannon);

                           
                            cannons.unshift(cannon);
                        }
                    let shopCannon = this.add.sprite(884, 634, 'shopCannon');
                    let crossHairBlack = this.add.sprite(890, 626, 'crossHairBlack');

                    for(let x=0;x<10;x++)
                        {
                            farm = this.add.sprite(930, 412, 'farm');
                            
                            farm.setInteractive();

                            this.input.setDraggable(farm);

                            farms.unshift(farm);
                        }
                    let shopBanana = this.add.sprite(930, 412, 'shopBanana');
                    let crossHairGold = this.add.sprite(930, 412, 'crossHairGold');

                    for(let x=0;x<10;x++)
                        {
                            superMonkey = this.add.sprite(925, 170, 'superMonkey');
                            
                            superMonkey.setInteractive();

                            this.input.setDraggable(superMonkey);

                           
                            superMonkeys.unshift(superMonkey);
                        }
                    let shopSuperMonkey = this.add.sprite(930, 174, 'shopSuperMonkey');
                    let crossHairBlue = this.add.sprite(925, 170, 'crossHairBlue');

                    //create bloons
                    for(let x=0;x<=20;x++)
                    {
                        stage1=this.physics.add.image(10, 525, 'redbloon');
                        arrBloons.push(stage1);
                    }

                    for(let x=0;x<=20;x++)
                    {
                        let tDart=this.physics.add.image(-10, -525, 'dart');
                        darts.push(tDart);
                    }
                    for(let x=0;x<=10;x++)
                    {
                        stage2=this.add.sprite(10, 525, 'bluebloon');
                        arrBlueBloons.push(stage2);
                    }
                    for(let x=0;x<=10;x++)
                    {
                        stage3=this.add.sprite(10, 525, 'camoblue');
                        arrCamoBlue.push(stage3);
                    }
                    for(let x=0;x<=10;x++)
                    {
                        stage4=this.add.sprite(10, 525, 'camored');
                        arrCamoRed.push(stage4);
                    }
                    for(let x=0;x<=10;x++)
                    {
                        stage5=this.add.sprite(10, 525, 'greenbloon');
                        arrGreenBloons.push(stage5);
                    }

                    for(let x=0;x<=10;x++)
                    {
                        stage6=this.add.sprite(10, 525, 'camogreen');
                        arrCamoGreen.push(stage6);
                    }


                    pathPoints=[10,525, 100,460, 47,405, 202,304, 258,390, 306,458, 232,498, 192,434, 302,370, 375,306, 350,220, 312,120, 434,170, 260,265, 362,315, 514,372, 580,272, 732,190, 718,276, 510,225, 512,284, 632,246, 612,120, 824,102];
                    //*****************************A list of x,y coordinates that represent different key points in the path****************************\\
                    actualPath=new Phaser.Curves.Spline(pathPoints);
                    let graphics=this.add.graphics();   
                    graphics.lineStyle(1,0xffffff,1); 
                    graphics.fillStyle(0xffffff,1);
                   
                    /*<!--__**************************<<Nehan, Friday Jan, 20th, 6:00 p.m,   >>******************************__-->*/
                   for (let i=0;i<=redRange;i++)
                    {
                        arrBloons[i]=this.add.follower(actualPath,10,525,'redbloon');
                        this.time.addEvent({ delay: i*8000, callback:_this.startBloon , callbackScope: this, loop: false});
                    }   
                    for (let i=0;i<=camoRedRange;i++)
                    {
                        arrCamoRed[i]=this.add.follower(actualPath,10,525,'camored');
                        this.time.addEvent({ delay: i*6000, callback:_this.startCamoRedBloon , callbackScope: this, loop: false});
                    }
                    for (let i=0;i<=blueRange;i++)
                    {
                        arrBlueBloons[i]=this.add.follower(actualPath,10,525,'bluebloon');
                        this.time.addEvent({ delay: i*7000, callback:_this.startBlueBloon , callbackScope: this, loop: false});
                    }
                    for (let i=0;i<=camoBlueRange;i++)
                    {
                        arrCamoBlue[i]=this.add.follower(actualPath,10,525,'camoblue');
                        this.time.addEvent({ delay: i*6000, callback:_this.startCamoBlueBloon , callbackScope: this, loop: false});
                    }
                    for (let i=0;i<=greenRange;i++)
                    {
                        arrGreenBloons[i]=this.add.follower(actualPath,10,525,'greenbloon');
                        this.time.addEvent({ delay: i*5000, callback:_this.startGreenBloon , callbackScope: this, loop: false});
                    }
                    for (let i=0;i<=camoGreenRange;i++)
                    {
                        arrCamoGreen[i]=this.add.follower(actualPath,10,525,'camogreen');
                        this.time.addEvent({ delay: i*4000, callback:_this.startCamoGreenBloon , callbackScope: this, loop: false});
                    }

                     this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                        selectedMonkey=gameObject;
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                        gameObject.tint = Math.random() * 0xffffff;
                        gameObject.on('pointerout', function () {

                          return gameObject.clearTint();

                        });

                    });

                    
                     //******************************create the group of darts-change 10 to get more or less*******************************

                  /* this.darts = this.physics.add.group({
                             defaultKey: 'dart',
                                maxSize: 1000,
                    });
                    */


                    //************This block of code sets up the shooting from the currently dragged and dropped monkey*************


                    /*<!--__******************************<<Nehan, Friday Jan, 20th, 6:15 p.m>>************************************__-->*/
                    this.input.on('pointerdown', 
                        function (pointer) {
                            if(pointer.x>1200 || selectedMonkey==null)return;
                            //var theDart = this.darts.get(pointer.x, pointer.y);
                            var theDart = darts[0];
                            theDart.x=pointer.x;
                            theDart.y=pointer.y;
                            console.log(darts.length);
                            if (theDart) {
                                theDart.setActive(false);
                                theDart.setVisible(true);
                                theDart.x=selectedMonkey.x;
                                theDart.y=selectedMonkey.y;
                                let dx=pointer.x-selectedMonkey.x;
                                let dy=pointer.y-selectedMonkey.y;
                                let dr=Math.sqrt(dx**2+dy**2);
                                theDart.body.velocity.y = ((pointer.y-selectedMonkey.y)/dr)*600;//speed of dart
                                theDart.body.velocity.x = ((pointer.x-selectedMonkey.x)/dr)*600;//speed of dart
                            }
                        }
                        , this);

                        /*<!--__*****************************<<Nehan, Wednesday Jan, 21st, 7:430 p.m,   >>***********************************__-->*/
                        
                        this.input.on('pointermove', 
                        function (pointer) {
                            
                            if(pointer.x>1200 || selectedMonkey==null)return;
                            let dx=pointer.x-selectedMonkey.x;
                            let dy=pointer.y-selectedMonkey.y;
                            let dr=Math.sqrt(dx**2+dy**2);
                            let angle=-Math.abs((Math.atan(dy/dx)*180/Math.PI)-90);
                            if(pointer.x>selectedMonkey.x)
                                angle+=180;
                            
                            selectedMonkey.angle=angle;
                            
                            }
                        
                        , this);

                        /*************************************Karthik, Monday Jan, 18th, 9:40 a.m, ******************************************/

                        finish = this.add.sprite(821, 106, 'finish');
                        let start = this.add.sprite(15, 526, 'start');

                        //display text
                        names();
                        let displayName = this.add.text(6, 6, btdName, { fontSize: '26px', backgroundColor: 'red', fontFamily: 'Georgia', fontSize: 56, color: 'white' });
                        scoreText = this.add.text(6, 76, 'Score: 0', { fontSize: '26px', backgroundColor: 'green', fontFamily: 'Georgia', fontSize: 56, color: 'white' });

                }//create the game resources and assign them to variables
                update()
                {
                    /*********************************Taymur, Monday Jan, 18th, 9:45 a.m***************************************/
                    let bloon;
                    //this variable is declared here becuase it is only required from the update loop but needs to be accessible anywhere from it
                    
                    /*<!--__*************<<Taymur, Thursday Jan, 22nd, 6:00 p.m , >>******************__-->*/
                    for(let x=0;x<arrBloons.length;x++)
                        {
                            bloon=arrBloons[x];
                            if(_this.collides(finish, bloon)==true)
                                {
                                    bubbleSortBloonPopped();
                                }
                        }

                    for(let x=0;x<arrBlueBloons.length;x++)
                        {
                            bloon=arrBlueBloons[x];
                            if(_this.collides(finish, bloon)==true)
                                {
                                    bubbleSortBloonPopped();
                                }
                        }
                    for(let x=0;x<arrCamoRed.length;x++)
                        {
                            bloon=arrCamoRed[x];
                            if(_this.collides(finish, bloon)==true)
                                {
                                    bubbleSortBloonPopped();
                                }
                        }
                    for(let x=0;x<arrCamoBlue.length;x++)
                        {
                            bloon=arrCamoBlue[x];
                            if(_this.collides(finish, bloon)==true)
                                {
                                    bubbleSortBloonPopped();
                                }
                        }
                    for(let x=0;x<arrGreenBloons.length;x++)
                        {
                            bloon=arrGreenBloons[x];
                            if(_this.collides(finish, bloon)==true)
                                {
                                    bubbleSortBloonPopped();
                                }
                        }
                    for(let x=0;x<arrCamoGreen.length;x++)
                        {
                            bloon=arrCamoGreen[x];
                            if(_this.collides(finish, bloon)==true)
                                {
                                    bubbleSortBloonPopped();
                                }
                        }
                    /*<!--__*********************************<<Nehan, Thursday Jan, 22nd, 6:00 p.m>>*************************************__-->*/
                    let rDart;
                    for(let y=0;y<darts.length;y++)
                        {
                            rDart=darts[0];
                            // console.log(tDart.x + " " + tDart.y);
                            for(let x=0;x<arrBloons.length;x++)
                            {
                                bloon=arrBloons[x];
                               // console.log(this.physics.world.overlap(bloon,tDart));
                                if(_this.collides(rDart, bloon)==true)
                                    {
                                            bloonX(50);
                                            score += 1;
                                            scoreText.setText('Score: ' + score);
                                            redPop++;
                                            bloon.destroy();
                                            bloon.clear(true);
                                            pop.play();
                                            //https://www.html5gamedevs.com/topic/36264-how-do-i-remove-game-objects-in-phaser-3/ I got the code to destroy and clear the balloon from this site
                                    }
                            }
                        }

                    let bDart;
                    for(let y=0;y<darts.length;y++)
                        {
                            bDart=darts[0];
                            for(let x=0;x<arrBlueBloons.length;x++)
                            //check for collisions
                            /*<!--__**************************<<Karthik, Wednesday Jan, 21st, 7:10 p.m, >>***********************************__-->*/
                            {
                                bloon=arrBlueBloons[x];
                                if(_this.collides(bDart, bloon)==true)
                                    {
                                            bloonX(50);
                                            score += 2;
                                            scoreText.setText('Score: ' + score);
                                            bluePop++;
                                            bloon.destroy();
                                            bloon.clear(true);
                                            pop.play();
                                            //https://www.html5gamedevs.com/topic/36264-how-do-i-remove-game-objects-in-phaser-3/ I got the code to destroy and clear the balloon from this site
                                    }
                            }
                        }

                    let crDart;
                    for(let y=0;y<darts.length;y++)
                        {
                            crDart=darts[0];
                            // console.log(tDart.x + " " + tDart.y);
                            for(let x=0;x<arrCamoRed.length;x++)
                            {
                                bloon=arrCamoRed[x];
                               // console.log(this.physics.world.overlap(bloon,tDart));
                                if(_this.collides(crDart, bloon)==true)
                                    {
                                            bloonX(50);
                                            score += 3;
                                            scoreText.setText('Score: ' + score);
                                            camoRedPop++;
                                            bloon.destroy();
                                            bloon.clear(true);
                                            pop.play();
                                            //https://www.html5gamedevs.com/topic/36264-how-do-i-remove-game-objects-in-phaser-3/ I got the code to destroy and clear the balloon from this site
                                    }
                            }
                        }
                    let cbDart;
                    for(let y=0;y<darts.length;y++)
                        {
                            cbDart=darts[0];
                            // console.log(tDart.x + " " + tDart.y);
                            for(let x=0;x<arrCamoBlue.length;x++)
                            {
                                bloon=arrCamoBlue[x];
                               // console.log(this.physics.world.overlap(bloon,tDart));
                                if(_this.collides(cbDart, bloon)==true)
                                    {
                                            bloonX(50);
                                            score += 5;
                                            scoreText.setText('Score: ' + score);
                                            camoBluePop++;
                                            bloon.destroy();
                                            bloon.clear(true); 
                                            pop.play();                                           
                                            //https://www.html5gamedevs.com/topic/36264-how-do-i-remove-game-objects-in-phaser-3/ I got the code to destroy and clear the balloon from this site
                                    }
                            }
                        }
                    let gDart;
                    for(let y=0;y<darts.length;y++)
                        {
                            gDart=darts[0];
                            // console.log(tDart.x + " " + tDart.y);
                            for(let x=0;x<arrGreenBloons.length;x++)
                            {
                                bloon=arrGreenBloons[x];
                               // console.log(this.physics.world.overlap(bloon,tDart));
                                if(_this.collides(gDart, bloon)==true)
                                    {
                                            bloonX(50);
                                            score += 5;
                                            scoreText.setText('Score: ' + score);
                                            greenPop++;
                                            bloon.destroy();
                                            bloon.clear(true);
                                            pop.play();
                                            //https://www.html5gamedevs.com/topic/36264-how-do-i-remove-game-objects-in-phaser-3/ I got the code to destroy and clear the balloon from this site
                                    }
                            }
                        }
                    let cgDart;
                    for(let y=0;y<darts.length;y++)
                        {
                            cgDart=darts[0];
                            // console.log(tDart.x + " " + tDart.y);
                            for(let x=0;x<arrCamoGreen.length;x++)
                            {
                                bloon=arrCamoGreen[x];
                               // console.log(this.physics.world.overlap(bloon,tDart));
                                if(_this.collides(cgDart, bloon)==true)
                                    {
                                            bloonX(50);
                                            score += 7;
                                            scoreText.setText('Score: ' + score);
                                            camoGreenPop++;
                                            bloon.destroy();
                                            bloon.clear(true);
                                            pop.play();
                                            //https://www.html5gamedevs.com/topic/36264-how-do-i-remove-game-objects-in-phaser-3/ I got the code to destroy and clear the balloon from this site
                                    }
                            }
                        }
                }//this represents the game loop and is where all the major code that controls the game is written
                /*<!--__******************************<<Karthik, Wednesday Jan, 20th, 7:30 p.m, >>****************************__-->*/
                collides(sprite1, sprite2)
                {
                    return Phaser.Geom.Intersects.RectangleToRectangle(sprite1.getBounds(),sprite2.getBounds());
                }
                startBloon()
                {
                    arrBloons[releaseCounter].startFollow(10000);
                    releaseCounter++;
                }
                startBlueBloon()
                {
                    arrBlueBloons[releaseCounter2].startFollow(9000);
                    releaseCounter2++;
                }
                startCamoBlueBloon()
                {
                    arrCamoBlue[releaseCounter3].startFollow(7000);
                    releaseCounter3++;
                }
                startCamoRedBloon()
                {
                    arrCamoRed[releaseCounter4].startFollow(8500);
                    releaseCounter4++;
                }
                startGreenBloon()
                {
                    arrGreenBloons[releaseCounter5].startFollow(8000);
                    releaseCounter5++;
                }
                startCamoGreenBloon()
                {
                    arrCamoGreen[releaseCounter6].startFollow(6000);
                    releaseCounter6++;
                }
            }//end of the game scene/screen
var config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: 1030,
        height: 734,

        physics: {
            default: 'arcade',
            arcade: {
                debug: true
             
                }
        }
    };

    //additional functions

    var game = new Phaser.Game(config);

    game.scene.add("game",mainGame);
    game.scene.start("game");
        //finally finished!
        </script>
    </body>
</html>
