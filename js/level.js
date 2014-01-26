enchant();

var Level = Class.create(Scene, {
   initialize: function() {
      Scene.apply(this);

      var bg = new Sprite(640,640);
      bg.image = Game.instance.assets['assets/levels/thing.png'];
      this.addChild(bg);
	},

	makeLevel1: function(){
	   var x, y; 
      var ret = new Array(80);

      for (x = 0; x < 80; x++) {
         ret[x] = new Array(11);
      }

      for (x = 0; x < 80; x++) {
         for (y = 0; y < 11; y++) {
            ret[x][y] = 0;
            if (x == 0) {
               ret[x][y] = 1;
            }
            if (y == 0 || y == 11) {
               ret[x][y] = 1;
            }
         }
      }

      ret[5][1] = 1;
      ret[5][2] = 1;
      ret[5][3] = 1;
      ret[5][4] = 1;
      ret[5][5] = 1;
      ret[5][6] = 1;
      ret[5][8] = 1;

      return ret;
	},

	CountBlocks : function(arr) {
	   var blocks = 0, i, j;

      for (i = 0; i < this.Width(); i++) {
         for (j = 0; j < this.Height(); j++) {
            if(arr[i][j] > 0) {
               blocks++;
            }
         }
      }
	   
      return blocks;
	},

	Width: function() {
	   return 80;
	},

	Height: function() {
	   return 10;
	},

	putBlocks: function(arr, ct, lenX, lenY) {
      var x, y, i = 0;
      var ret = new Array(ct);

      for (x = 0; x < lenX; x++) {
         for (y = 0; y < lenY; y++) {
            if (arr[x][y] > 0) {
               ret[i] = new Block(arr[x][y], x*16, y*16);
               ++i;
            }
         }
      }

      return ret;
   },

});
