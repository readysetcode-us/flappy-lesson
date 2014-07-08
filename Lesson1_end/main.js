// Phaser variable for 'main' game state that will contain the game
var main_state = {

	// Function called first to load all the assets
    preload: function() { 
		//set the background color
        this.game.stage.backgroundColor = '#00A0FF';
		
		//load the bird sprite
		this.game.load.image('bird', 'assets/bird.png');
    },

	// Function called after 'preload' to setup the game
    create: function() {
		//add bird to screen
        this.bird = this.game.add.sprite(100,200, 'bird');
		
		//bind the space bar to calling the scaleUP function
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.scaleUP, this);
    },

	 // Function called 60 times per second
    update: function() {
		//when LEFT key is pressed increment the angle by 10
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.bird.angle += 10;
		}
		
		//when RIGHT key is pressed decrement the angle by 10
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.bird.angle -= 10;
		}
		
		//when UP key is down increase the size of the bird by 1
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.bird.scale.x += 1;
			this.bird.scale.y += 1;
		}
    },
	
	//called when spacebar is hit
	scaleUP: function() {
		//if the birds current size is bigger than 1
		if (this.bird.scale.x > 1) {
			//reduce the size by 1
			this.bird.scale.x -= 1;
			this.bird.scale.y -= 1;
		}
	}

};