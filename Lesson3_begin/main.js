// Phaser variable for 'main' game state that will contain the game
var main_state = {

	// Function called first to load all the assets
    preload: function() { 
        //set the background color
		this.game.stage.backgroundColor = '#0000FF';
		
		//load the bird sprite
		this.game.load.image('bird', 'assets/bird.png');
		//load the pipe sprite
		this.game.load.image('pipe', 'assets/pipe.png');
    },

	// Function called after 'preload' to setup the game
    create: function() {
	//BIRD
		//The birds start position (x and y coords)
		var bird_xStartPosition = 50;
		var bird_yStartPosition = 245;
		
		//add bird to screen
		this.bird = this.game.add.sprite(bird_xStartPosition, bird_yStartPosition, 'bird');
		
		// Add gravity to the bird to make it fall
		this.bird.body.gravity.y = 20;
		
	//PIPES
		//The bottom pipe position
		this.pipe1_xPos = 150;
		var pipe1_yPos = this.randomNumberBetween(200,550);
		
		var pipeHeight = 483;
		var pipeVerticalGap = 150;
		
		var pipe1_yPosTop = pipe1_yPos - pipeHeight - pipeVerticalGap;
		
		//add bottom pipe to the screen
		this.pipe1_bottom = this.game.add.sprite(this.pipe1_xPos, pipe1_yPos, 'pipe');
		this.pipe1_top = this.game.add.sprite(this.pipe1_xPos, pipe1_yPosTop, 'pipe');

	//FUNCTIONS
		//bind the space-bar to calling the jump function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
    },

	 // Function called 60 times per second
    update: function() {
		//Run the overlap function to check if bird is colliding with each of our pipes and if so call the reset_game function
		this.game.physics.overlap(this.bird, this.pipe1_bottom, this.reset_game, null, this);
		this.game.physics.overlap(this.bird, this.pipe1_top, this.reset_game, null, this);
	
		//If the bird falls out of the world - reset the game
		if (this.bird.inWorld == false) {
			this.reset_game();
		}
    },
	
//OUR FUNCTIONS
	jump: function() {
		// Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
		// Add forward velocity to the bird
		this.bird.body.velocity.x = 50;
	},
	
	reset_game: function() {
		this.game.state.start('main');
	},
	
	randomNumberBetween: function(min, max) {
		return Math.floor( Math.random() * (max - min + 1) + min);
	}
};







