Block = Class.create(Sprite, {
   initialize: function(type, x, y) {
      Sprite.apply(this, [16, 16]);
      if (type == 1)
         this.image = Game.instance.assets['assets/blocks/tile.png'];
      else if (type == 2)
         this.image = Game.instance.assets['assets/blocks/tile.png'];
      else if (type == 3)
         this.image = Game.instance.assets['assets/blocks/tile.png'];
      else 
         this.image = Game.instance.assets['assets/blocks/tile.png'];

      this.frame = 0;
      this.x = x;
      this.y = y;

      game.rootScene.addChild(this);
   },

   move: function(dx, dy) {
      this.x += dx;
      this.y += dy;
   },
});
