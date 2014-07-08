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
		this.game.add.text(50, 100, "Flappy Bird\n\nPress SPACE to start!", textStyle);
		
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

		
	//TIMER

		
	//SCORE
		var scoreStyle = { font: "30px Arial", fill: "#ffffff" };
		this.label_score = this.game.add.text(20, 20, "0", scoreStyle);
		
	//FUNCTIONS
		//bind the space-bar to calling the jump function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
    },

	 // Function called 60 times per second
    update: function() {
		//Collision check
		
		//If the bird falls out of the world - reset the game
		if (this.bird.inWorld == false) {
			this.reset_game();
		}
    },
	
	//Our function we connected to the space-bar
	jump: function() {
		// Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
	},
	
	//Add a single pipe to screen
	add_one_pipe: function(x, y) {  
	
	},
	
	//Add a pair of pipes to screen
	add_row_of_pipes: function() {

	},
	
	reset_game: function() {
		//remove timer
		
		//gameover
		this.game.state.start('gameover');
	},
	
	randomNumBetween: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};