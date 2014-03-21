var canvas, ctx, lastime,map = {}, items = [];
var canvasio = {};
var hu = require('hu');

function initAnimFrame(){
  window.requestAnimFrame = (function(){
      return window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback){
              window.setTimeout(callback, 1000 / 60);
          };
  })();
}

/*var player = {
  pos: [0, 0],
  life: 10000,
  totalLife: 10000,
  height: 35,
  width: 88,
  damage: 80,
  sprite: new Sprite('images/newsprites.png', [7, 304], [88,35], 4, [0, 1,2,3,4])
};*/

canvasio.init = function init(){
  initAnimFrame();
  canvas = document.getElementById("canvas");
  canvas.height = 500;
  canvas.width = 500;

  canvasio.setMapProperties({width: canvas.offsetWidth, height: canvas.offsetHeight})
  ctx = canvas.getContext("2d");
  lastTime = Date.now();
  main();
}

var main = function main(){
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  canvasio.step(dt);
  clearCanvas();
  canvasio.render();
  lastTime = now;

  requestAnimFrame(main);
};

function clearCanvas(){
  // Store the current transformation matrix
  ctx.save();
  ctx.fillStyle = '#CC5422'; 
  ctx.fillRect(0,0, canvas.width, canvas.height);
  // Restore the transform
  ctx.restore();
}

canvasio.render = function render(){
  items.map(function(item){
    canvasio.drawItem(item);
  });
};

canvasio.drawItem = function drawItem(item, shapeOptions){
  ctx.beginPath();
  ctx.rect(item.pos.x,item.pos.y,item.size.width,item.size.height);
  ctx.stroke();
};


canvasio.createItem = function createItem(item){
  items.push(item);
};

canvasio.getMap = function getMap(){
  return map;
};

canvasio.setMapProperties = function(properties){
  map = properties;
};

canvasio.restart = function restart(){
  items = [];
};

canvasio.getItems = function getItems(){
  return items;
};

//Shape clicking
canvasio.click = function click(x,y){
  var clickedElements =  hu.compact(items.map(function(item){
    if(checkIfPointInsideItem(x,y, item.pos,item.size)){
      return item;
    }
  }));
  return clickedElements;
};

function checkIfPointInsideItem(x,y, objectOrig, objectSize){
  var xF = objectOrig.x + objectSize.width;
  var xI = objectOrig.x ;
  var yF = objectOrig.y + objectSize.height;
  var yI = objectOrig.y ;
  return x <= xF && x >= xI && y <= yF && y >= yI;
}

//Movement
canvasio.step = function step(dt){
  items = hu.compact(items.map(function(item){
    if(item.speed && item.direction){
      item.pos = canvasio._moveItem(dt, item);
      if(!canvasio._isOutOfScreen(item, map.width, map.height)){
        return item;
      }else{
        console.log('esta fuera', item, map)
      }
    }
  }));
};

canvasio._moveItem = function moveItem(dt, item){
  var xnew, ynew;

  switch(item.direction){
    case 'down':
      xnew = item.pos.x;
      ynew = item.pos.y - dt*item.speed;
    break;
    case 'up':
      xnew = item.pos.x;
      ynew = item.pos.y + dt*item.speed;
    break;
    case 'left':
      xnew = item.pos.x - dt*item.speed;
      ynew = item.pos.y;
    break;
    case 'right':
      xnew = item.pos.x + dt*item.speed;
      ynew = item.pos.y;
    break;
  }

  return {x: xnew, y: ynew};
};

canvasio._isOutOfScreen = function isOutOfScreen(item, screenWidth, screenHeight){
 var topRightCornerVisible = checkIfPointInsideItem(item.pos.x + item.size.width / 2, item.pos.y + item.size.height / 2 , {x:0,y:0}, {width: screenWidth, height:screenHeight} );
 var topLeftCornerVisible = checkIfPointInsideItem(item.pos.x - item.size.width / 2, item.pos.y + item.size.height / 2 , {x:0,y:0}, {width: screenWidth, height:screenHeight} );
 var botLeftCornerVisible = checkIfPointInsideItem(item.pos.x - item.size.width / 2, item.pos.y - item.size.height / 2 , {x:0,y:0}, {width: screenWidth, height:screenHeight} );
 var botRightCornerVisible = checkIfPointInsideItem(item.pos.x + item.size.width / 2, item.pos.y - item.size.height / 2 , {x:0,y:0}, {width: screenWidth, height:screenHeight} );
 return !(topLeftCornerVisible ||  topRightCornerVisible || botRightCornerVisible || botLeftCornerVisible);
};

module.exports = canvasio;