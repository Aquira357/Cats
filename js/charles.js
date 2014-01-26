/*enchant();

var RIGHT = 1;
var LEFT  = 0;
var dir = 1;

var Charles = Class.create(Sprite, {
   initialize: function(speed) {
      Sprite.apply(this, [16, 16]);
      this.image = Game.instance.assets['assets/characters/player_walk.png'];
		this.frame = 0;

		this.speed = 0;
		this.x = 400;
		this.y = 400;

		this.animWalk = [
         0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, //right
         7, 7, 7, 8, 8, 8, 9, 9, 9,10,10,10,11,11,11,12,12,12,13,13,13];//left

      

      this.addEventListener(Event.ENTER_FRAME, this.everyFrame);
   },
   
   everyFrame: function(event) {
      this.move();
	},
	
	move: function() {
      if(game.input.left && !game.input.right){
         this.dir = 0;
         this.frame = this.animWalk[this.dir * 21 + (this.age % 21)];
      }
      else if(game.input.right && !game.input.left){
         this.dir = 1;
         this.frame = this.animWalk[this.dir * 21 + (this.age % 21)];
      }
   },
});
*/
