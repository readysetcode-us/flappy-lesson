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
		this.game.add.text(50, 100, "GAME OVER\n\nScore: "+score.toString()+"\n\nPress UP to start!", textStyle);
		
		//bind the space-bar to calling the start function
		var up_key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		up_key.onDown.add(this.start, this);
	},
	
	update: function() {
		this.dead_bird.body.rotation = main_state.randomNumBetween(168,172);
	},
		
	start: function() {
		score = -1;
		this.game.state.start('main');
	}
};

// Phaser variable for 'main' game state that will contain the runtime of the game
var main_state = {

	// Function called first to load all the assets
    preload: function() { 
        //set the background color
		this.game.stage.backgroundColor = '#0000FF';
		//load audio
		
    },

	// Function called after 'preload' to setup the game
	create: function() {
	//BIRD
		//The birds start position (x and y coords)
		var bird_xStartPosition = 90;
		var bird_yStartPosition = 245;
		
		//add bird to screen
		this.bird = this.game.add.sprite(bird_xStartPosition, bird_yStartPosition, 'bird');
		
		// Add gravity to the bird to make it fall
		this.bird.body.gravity.y = 1000;
		
	//PIPES
		this.pipes = game.add.group();
		this.pipes.createMultiple(20, 'pipe'); 
		
	//TIMER
		this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
		
	//SCORE
		var scoreStyle = { font: "30px Arial", fill: "#ffffff" };
		this.label_score = this.game.add.text(20, 20, "0", scoreStyle);
	
	//SOUND
		
		
	//FUNCTIONS
		//bind the space-bar to calling the jump function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
    },

	 // Function called 60 times per second
    update: function() {
		//Run the overlap function to check if bird is colliding with each of our pipes and if so call the reset_game function
		this.game.physics.overlap(this.bird, this.pipes, this.reset_game, null, this);
		
		//If the bird falls out of the world - reset the game
		if (this.bird.inWorld == false) {
			this.reset_game();
		}
		
		//play flap animation

		
		//rotate bird

    },
	
	//Our function we connected to the space-bar
	jump: function() {
		// Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
		//Play sound

		//animate a rotation of the bird

	},
	
	add_one_pipe: function(x, y) {  
		// Get the first dead pipe of our group
		var pipe = this.pipes.getFirstDead();

		// Set the new position of the pipe
		pipe.reset(x, y);

		// Add velocity to the pipe to make it move left
		pipe.body.velocity.x = -200; 

		// Kill the pipe when it's no longer visible 
		pipe.outOfBoundsKill = true;
	},
	
	add_row_of_pipes: function() {
		//handle score
		score += 1;
		this.label_score.content = score;
	
		//x, y
		var pipe1_xPos = 400;
		var pipe1_yPos = this.randomNumBetween(200, 550);
		
		//The pipe sprite images height in pixels
		var pipeHeight = 483;
		//The desired gap in the pipe
		var pipeVerticalGap = 150;
		//Calculate the top pipe position using the bottom's position, the height of the sprite, and the desired gap
		var pipe1_yPosTop = pipe1_yPos - pipeHeight - pipeVerticalGap;
		
		//add top pipe to the screen
		this.add_one_pipe(pipe1_xPos, pipe1_yPos);
		//add bottom pipe to the screen
		this.add_one_pipe(pipe1_xPos, pipe1_yPosTop);
	},
	
	reset_game: function() {
		//play sound

		//remove timer and keyboard binding
		this.game.time.events.remove(this.timer);
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		//show game over
		this.game.state.start('gameover');
	},
	
	randomNumBetween: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};