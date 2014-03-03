dojo.declare("com.nuclearunicorn.game.villageManager", null, {
	
	kittens: 0,
	maxKittens: 0,
	
	kittensPerTick: 0,	//to be updated (also with per day?)
	
	kittensPerTickBase: 0.01,
	
	//jobs assigned to kittens
	jobs: [{
	}],
	
	//resource modifiers per tick
	resourceModifiers: {
		"catnip" : 0
	},

	game: null,
	
	constructor: function(game){
		this.game = game;
	},
	
	update: function(){
		/*if (kittens.value < maxKittens){
			kittens.value += 1;
		}*/
		var kittensPerTick = this.kittensPerTick + this.kittensPerTickBase;
		this.kittens += kittensPerTick;
		
		if (this.kittens > this.maxKittens){
			this.kittens = this.maxKittens;
		}
		
		var modifiers = this.getResourceModifers();
		
		var catnipVal = this.game.resPool.get("catnip").value;
		var resDiff = catnipVal + modifiers["catnip"];
		
		if (resDiff < 0){
			//console.log("kittens to die:", Math.abs(resDiff.toFixed()));
			
			var starvedKittens = Math.abs(resDiff.toFixed());
			this.kittens -= starvedKittens;
			this.game.msg(starvedKittens + " kittens starved to death");
		}
		
	},
	
	/**
	 * kittens can't be float value, it's an internal representation
	 * to handle cyclic process like birth ratio / death ration
	 */ 
	getKittens: function(){
		return Math.round(this.kittens);	
	},
	
	/**
	 * Get a list of resource modifiers per tick
	 */ 
	
	getResourceModifers: function(){
		
		return {
			"catnip" : -1 * this.getKittens()
		}
	},
	
	reset: function(){
		this.kittens = 0;
		this.maxKittens = 0;
	}
});
