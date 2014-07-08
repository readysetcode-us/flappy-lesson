//Phaser variable to contain 'menu' State
var menu_state = {

	preload: function() {
		//set bkgnd color, and load image assets
		this.game.stage.backgroundColor = '#3BA3D0';
		this.game.load.image('bird', 'assets/bird.png');
		this.game.load.image('pipe', 'assets/pipe.png');
	},
	
	create: function() {
		this.menu_bird = this.game.add.sprite(200, 300, 'bird');
		this.menu_bird.scale.x = 3;
		this.menu_bird.scale.y = 3;
		
		//add start text
		var textStyle = { font: "30px Arial", fill: "#ffffff" };
		this.game.add.text(50, 100, "Press SPACE to start!", textStyle);
		
		//bind the space-bar to calling the start function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start, this);
	},
	
	update: function() {
		this.menu_bird.body.rotation += 4;
	},
		
	start: function() {
		this.game.state.start('main');
	}
};

var gameover_state = {

	preload: function() {
		//set bkgnd color, and load image assets
		this.game.stage.backgroundColor = '#184153';
	},
	
	create: function() {
		this.dead_bird = this.game.add.sprite(280, 550, 'bird');
		this.dead_bird.scale.x = 4;
		this.dead_bird.scale.y = 4;
		this.dead_bird.body.rotation = 170;
		
		//add start text
		var textStyle = { font: "30px Arial", fill: "#ffffff" };
		this.game.add.text(50, 100, "GAME OVER\n\nScore: "+score.toString()+"\n\nPress SPACE to start!", textStyle);
		
		//bind the space-bar to calling the start function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start, this);
	},
	
	update: function() {
		this.dead_bird.body.rotation = main_state.randomNumBetween(168,172);
	},
		
	start: function() {
		score = 0;
		this.game.state.start('main');
	}
};

// Phaser variable for 'main' game state that will contain the runtime of the game
var main_state = {

	// Function called first to load all the assets
    preload: function() { 
        //set the background color
		this.game.stage.backgroundColor = '#0000FF';
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
		//PIPE1
		this.pipe1_xPos = 150;
		var pipe1_yPos = this.randomNumBetween(200, 550);
		
		//The pipe sprite images height in pixels
		var pipeHeight = 483;
		//The desired gap in the pipe
		var pipeVerticalGap = 150;
		//Calculate the top pipe position using the bottom's position, the height of the sprite, and the desired gap
		var pipe1_yPosTop = pipe1_yPos - pipeHeight - pipeVerticalGap;
		
		//add first pipe set to the screen
		this.pipe1_bottom = this.game.add.sprite(this.pipe1_xPos, pipe1_yPos, 'pipe');
		this.pipe1_top = this.game.add.sprite(this.pipe1_xPos, pipe1_yPosTop, 'pipe');
		
		//PIPE2
		//The desired space between the pipe sets
		var pipeHorizontalGap = 150;
		this.pipe2_xPos = this.pipe1_xPos + pipeHorizontalGap;
		
		//create a random gap location
		var pipe2_yPos = this.randomNumBetween(200, 550);
		var pipe2_yPosTop = pipe2_yPos - pipeHeight - pipeVerticalGap;
		
		//add second pipe set to the screen
		this.pipe2_bottom = this.game.add.sprite(this.pipe2_xPos, pipe2_yPos, 'pipe');
		this.pipe2_top = this.game.add.sprite(this.pipe2_xPos, pipe2_yPosTop, 'pipe');

	//SCORE
		this.pipe1complete = false;
		this.pipe2complete = false;
		var scoreStyle = { font: "30px Arial", fill: "#ffffff" };
		this.label_score = this.game.add.text(20, 20, "0", scoreStyle);
		
	//FUNCTIONS
		//bind the space-bar to calling the jump function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
    },

	 // Function called 60 times per second
    update: function() {
		//set score label
		this.label_score.content = score;
	
		//Run the overlap function to check if bird is colliding with each of our pipes and if so call the reset_game function
		this.game.physics.overlap(this.bird, this.pipe1_bottom, this.reset_game, null, this);
		this.game.physics.overlap(this.bird, this.pipe1_top, this.reset_game, null, this);
		this.game.physics.overlap(this.bird, this.pipe2_bottom, this.reset_game, null, this);
		this.game.physics.overlap(this.bird, this.pipe2_top, this.reset_game, null, this);
		
		//If the bird passes the first set of pipes for the first time increment the score
		var offset = 20;
		if (this.bird.x > this.pipe1_xPos + offset && this.pipe1complete == false) {
			this.pipe1complete = true;
			score += 1;
		}
		
		//second set of pipes
		if (this.bird.x > this.pipe2_xPos + offset && this.pipe2complete == false) {
			this.pipe2complete = true;
			score += 1;
		}

		//Finished the level
		if (this.bird.x > 390) {
			this.game.state.start('main');
		}
		
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
		this.bird.body.velocity.x = 50;
	},
	
	reset_game: function() {
		this.game.state.start('gameover');
	},
	
	randomNumBetween: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};