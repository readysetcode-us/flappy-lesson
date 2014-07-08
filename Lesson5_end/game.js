/*
-- Flappy Bird Game --

*/

// Initialize Phaser game variable, using auto sizing and latch it to an HTML DIV named 'screen'
var game = new Phaser.Game(0, 0, Phaser.AUTO, 'screen');

//initialize score here
var score = 0;

//Add  game states  to the game variable and start the 'menu' state
game.state.add('menu', menu_state);
game.state.add('main', main_state);
game.state.start('menu');