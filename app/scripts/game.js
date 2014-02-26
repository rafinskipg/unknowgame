var game = {};
var taps = 0;
game.tap = function tap(){
  taps++;
}

game.getTaps = function getTaps(){
  return taps;
}

game.restart = function restart(){
  taps = 0;
}
module.exports = game;