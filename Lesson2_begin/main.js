// Phaser variable for 'main' game state that will contain the game
var main_state = {

	// Function called first to load all the assets
    preload: function() { 
        //set the background color
		this.game.stage.backgroundColor = '#0000FF';
		
		//load the bird sprite
		this.game.load.image('bird', 'assets/bird.png');
    },

	// Function called after 'preload' to setup the game
    create: function() { 
        //add bird to screen
		this.bird = this.game.add.sprite(200, 245, 'bird');
		
		//bind the space-bar to calling the jump function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
    },

	 // Function called 60 times per second
    update: function() {
		
    },
	
	//Our function we connected to the space-bar
	jump: function() {
		
	},
};