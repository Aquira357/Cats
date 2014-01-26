//A
enchant();

var RIGHT = 1;
var LEFT  = 0;
var dir = 1;

var FALLING = 2;
var RISING = 1;
var WAITING = 0;

var GAME_SIZE = 160;
var stage = new Group();
var gravity = 0.5;
var walls;
var blocks;
var blockCount;
var game;

window.onload = function() {
   game = new Game(GAME_SIZE, GAME_SIZE);

   game.preload(
      'assets/characters/player_crawl.png',
      'assets/characters/player_crouch.png',
      'assets/characters/player_idle.png',
      'assets/characters/player_sprint.png',
      'assets/characters/player_walk.png',
      'assets/levels/thing.png',
      'assets/blocks/tile.png');

   var Charles = Class.create(Sprite, {
      initialize: function(speedz) {
         Sprite.apply(this, [16, 16]);
         this.image = Game.instance.assets['assets/characters/player_walk.png'];
	      this.frame = 0;

	      this.speed = speedz;
	      this.xVelocity = 0;
	      this.yVelocity = 0;
	      this.x = 80;
	      this.y = 144;
	      this.jumpFrames = speedz;
	      this.status = FALLING;

	      this.animWalk = [
            0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, //right
            7, 7, 7, 8, 8, 8, 9, 9, 9,10,10,10,11,11,11,12,12,12,13,13,13];//left

          this.animCrawlAndRun = [
            0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, //right
            4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7];//left

         this.addEventListener(Event.ENTER_FRAME, this.everyFrame);

         game.rootScene.addChild(this);
      },
      
      everyFrame: function(event) {
         this.move();
         if(this.TestLoc(this.x, this.y + 16 + this.yVelocity)){
            if (this.status == RISING){
               this.y -= this.yVelocity;
            }
            if (this.status == FALLING){
               this.yVelocity += gravity;
               this.y += this.yVelocity;
            }
         }
         else{
            this.status = WAITING;
            console.log("HIT");
         }
         this.x += this.xVelocity;   
         this.UpdateBlocks(this.xVelocity, 0);   
         this.xVelocity = 0;

         console.log(this.status);
      },

      TestLoc: function(x, y) {
         return (walls[Math.floor(x/16)][Math.floor(y/16)] < 1);
      },

      UpdateBlocks: function(dx, dy) {
         var i;

         for(i = 0; i < blockCount; i++) {
            blocks[i].move(-dx, -dy);
         }
      },

      move: function() {
      //MOVE LEFT
         if(game.input.left && !game.input.right){
            if(game.input.a){
               this.image = Game.instance.assets['assets/characters/player_crawl.png'];
               this.dir = 1;
               this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];

               if (this.TestLoc(this.x - 0.5, this.y)){
                  this.xVelocity = -0.5;
                  stage.x += 0.5;
               }
            }else if(game.input.b){
               this.image = Game.instance.assets['assets/characters/player_sprint.png'];
               this.dir = 1;
               this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];
               if (this.TestLoc(this.x - 2, this.y)){
                  this.xVelocity = -2;
                  stage.x += 2;
               }
            }
            else{
               this.image = Game.instance.assets['assets/characters/player_walk.png'];
               this.dir = 1;
               this.frame = this.animWalk[this.dir * 21 + (this.age % 21)];
               if (this.TestLoc(this.x - 1, this.y)){
                  this.xVelocity = -1;
                  stage.x++;
               }
            }
         }

        //MOVE RIGHT
         else if(game.input.right && !game.input.left){
            if(game.input.a){
               this.image = Game.instance.assets['assets/characters/player_crawl.png'];
               this.dir = 0;
               this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];
               if (this.TestLoc(this.x + 0.5 + 16, this.y)){
                  this.xVelocity = 0.5;
                  stage.x -= 0.5; 
               }  
            }else if(game.input.b){
               this.image = Game.instance.assets['assets/characters/player_sprint.png'];
               this.dir = 0;
               this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];
               if (this.TestLoc(this.x + 2 + 16, this.y)){
                  this.xVelocity = 2;
                  stage.x -= 2;  
               }
            }
            else{
               this.image = Game.instance.assets['assets/characters/player_walk.png'];
               this.dir = 0;
               this.frame = this.animWalk[this.dir * 21 + (this.age % 21)];
               if (this.TestLoc(this.x + 1 + 16, this.y)){
                  this.xVelocity = 1;
                  stage.x--;
               }
            }
         }


      //START JUMP
         if(game.input.up && !game.input.a){
            if(this.status == WAITING){
               this.status = RISING;
               this.age = 0;
            }
         }

       //JUMP START
         if(this.status == RISING && this.age < this.jumpFrames*2){
            this.speed -= gravity;
            this.yVelocity = this.speed;

            //JUMP RIGHT
            if(game.input.right && !game.input.left){
               this.dir = 0;
               if(game.input.a){
                  this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];
                  if (this.TestLoc(this.x + 0.5 + 16, this.y)){
                     this.xVelocity = 0.5;
                     stage.x -= 0.5; 
                  }
               }else if(game.input.b){
                  this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];
                  if (this.TestLoc(this.x + 1.3 + 16, this.y)){
                    this.xVelocity = 1.3;
                    stage.x -= 1.3; 
                  }
               }else{
                  this.frame = this.animWalk[this.dir * 21 + (this.age % 21)];
                  if (this.TestLoc(this.x + 1 + 16, this.y)){
                     this.xVelocity = 1;
                     stage.x -= 1; 
                  }
               }               
            }

            //JUMP LEFT
            else if(game.input.left && !game.input.right){
               this.dir = 1;
               if(game.input.a || game.input.b){
                  this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)]; 
                  if (this.TestLoc(this.x - 0.5, this.y)){
                     this.xVelocity = -0.5;
                     stage.x += 0.5;
                  }
               }else if(game.input.b){
                  this.frame = this.animCrawlAndRun[this.dir * 20 + (this.age % 20)];
                  if (this.TestLoc(this.x - 1.3, this.y)){
                     this.xVelocity= -1.3;
                     stage.x += 1.3;
                  }
               }else{
                  this.frame = this.animWalk[this.dir * 21 + (this.age % 21)];
                  if (this.TestLoc(this.x - 1, this.y)){
                     this.xVelocity= -1;
                     stage.x += 1;
                  }
               }
            }
            if(this.age == this.jumpFrames*2 -1){
               this.status = FALLING;
            }  
         }
      },
   });
   

   game.fps = 30;
   game.onload = function() {

      var fLevel = new Level();
      var mainChar = new Charles(6);
      
      stage.addChild(fLevel);
      stage.addChild(mainChar);
      game.rootScene.addChild(stage);
      walls = fLevel.makeLevel1();
      console.log(walls[0][0]);
      blockCount = fLevel.CountBlocks(walls);
      blocks = fLevel.putBlocks(walls, blockCount, fLevel.Width(), fLevel.Height());
      
   };
    
   game.start();
};
