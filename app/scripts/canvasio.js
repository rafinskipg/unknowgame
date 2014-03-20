var hu = require('hu');
var canvas, ctx, items;

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var player = {
  pos: [0, 0],
  life: 10000,
  totalLife: 10000,
  height: 35,
  width: 88,
  damage: 80,
  sprite: new Sprite('images/newsprites.png', [7, 304], [88,35], 4, [0, 1,2,3,4])
};
    
function render(){
  items.map(function(item){
    drawItem(item);
  });
}


function draw(options){
  
}

function initCanvas(){
  // Create the canvas
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}