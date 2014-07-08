/*
-- Flappy Bird Game --

*/

// Initialize Phaser game variable, using auto sizing and latch it to an HTML DIV named 'screen'
var game = new Phaser.Game(0, 0, Phaser.AUTO, 'screen');

// Add and start the 'main' state to the game variable
game.state.add('main', main_state);
game.state.start('main');