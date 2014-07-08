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
		//Create our setup variables
		//The birds start position (x and y coords)
		var bird_xStartPosition = 50;
		var bird_yStartPosition = 245;
		
		//add bird to screen
		this.bird = this.game.add.sprite(bird_xStartPosition, bird_yStartPosition, 'bird');
		
		// Add gravity to the bird to make it fall
		this.bird.body.gravity.y = 20;
		
		//The bottom pipe position
		var pipeBottom_xPosition = 300;
		var pipeBottom_yPosition = 400;
		
		//The pipe sprite images height in pixels
		var pipeHeight = 483;
		//The desired gap in the pipe
		var pipeGap = 100;
		//Calculate the top pipe position using the bottom's position, the height of the sprite, and the desired gap
		var pipeTop_yPosition = pipeBottom_yPosition - pipeHeight - pipeGap;
		
		//add pipe1 to the screen
		this.pipe1 = this.game.add.sprite(pipeBottom_xPosition, pipeBottom_yPosition, 'pipe');
		this.pipe2 = this.game.add.sprite(pipeBottom_xPosition, pipeTop_yPosition, 'pipe');

		//bind the space-bar to calling the jump function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
    },

	 // Function called 60 times per second
    update: function() {
		//Run the overlap function to check if bird is colliding with each of our pipes and if so call the reset_game function
		this.game.physics.overlap(this.bird, this.pipe1, this.reset_game, null, this);
		this.game.physics.overlap(this.bird, this.pipe2, this.reset_game, null, this);
	
		//If the bird falls out of the world - reset the game
		if (this.bird.inWorld == false) {
			this.reset_game();
		}
    },
	
	//Our function we connected to the space-bar
	jump: function() {
		// Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
		// Add forward velocity to the bird
		this.bird.body.velocity.x = 30;
	},
	
	reset_game: function() {
		this.game.state.start('main');
	}
};