var should = require('chai').should,
    expect = require('chai').expect,
    assert = require('chai').assert,
    canvasio = require('../app/scripts/canvasio');

describe('Canvasio', function(){
  before(function(){
    //nv.restart();
  });

  it('should have create item function', function(){
    expect(canvasio.createItem).to.exist;
  });

  it('should have a restart function', function(){
    expect(canvasio.restart).to.exist;
  });
  it('should create a item an add it', function(){
    canvasio.createItem();
    expect(canvasio.getItems().length).to.be.equals(1);
    canvasio.restart();
    expect(canvasio.getItems().length).to.be.equals(0);
  });
  it('should have a map properties', function(){
    expect(canvasio.getMap).to.exist;
    expect(canvasio.setMapProperties).to.exist;
    canvasio.setMapProperties({width: 400, height:400});
    expect(canvasio.getMap().width).to.equals(400);
    expect(canvasio.getMap().height).to.equals(400);
  });
});

describe('Shape clicking', function(){
  var obj1, obj2;
  beforeEach(function(){
    obj1 = {
      pos: {
        x: 0,
        y: 0
      },
      size: {
        height: 10,
        width: 10
      }
    };
    obj2 = {
      pos: {
        x: 100,
        y: 10
      },
      size: {
        height: 10,
        width: 10
      }
    };
    canvasio.restart();
  });

  it('should have a click input method', function(){
    expect(canvasio.click).to.exist;
  });

  it('should store the correct items', function(){
    canvasio.createItem(obj1);
    canvasio.createItem(obj2);
    expect(canvasio.getItems()[0]).to.be.equals(obj1);
  });

  it('should return the array of items in that position', function(){
    canvasio.createItem(obj1);
    canvasio.createItem(obj2);
    expect(canvasio.click(0,0).length).to.be.equals(1);
    expect(canvasio.click(100,10).length).to.be.equals(1);
    expect(canvasio.click(1000,10).length).to.be.equals(0);
  });
  
});

describe('Movement', function(){
  var obj1, width, height;
  beforeEach(function(){
    obj1 = {
      pos: {
        x: 0,
        y: 0
      },
      size: {
        height: 10,
        width: 10
      },
      speed: 5,
      direction: 'down'
    };
    
    canvasio.restart();
    canvasio.setMapProperties({width:400, height:400});
  });

  it('should have a step function', function(){
    expect(canvasio.step).to.exist;
  });

  it('should have a move item function that moves DOWN the item', function() {
    var pos = canvasio._moveItem(100, obj1);
    expect(pos.x).to.be.equals(obj1.pos.x);
    expect(pos.y).to.not.be.equals(obj1.pos.y);
    expect(pos.y).to.be.equals(-500);
  });  
  
  it('should have a move item function that moves UP the item', function() {
    obj1.direction = 'up';
    var pos = canvasio._moveItem(100, obj1);
    expect(pos.x).to.be.equals(obj1.pos.x);
    expect(pos.y).to.not.be.equals(obj1.pos.y);
    expect(pos.y).to.be.equals(500);
  });

  it('should have a move item function that moves LEFT the item', function() {
    obj1.direction = 'left';
    var pos = canvasio._moveItem(100, obj1);
    expect(pos.x).to.not.be.equals(obj1.pos.x);
    expect(pos.y).to.be.equals(obj1.pos.y);
    expect(pos.x).to.be.equals(-500);
  });

  it('should have a move item function that moves RIGHT the item', function() {
    obj1.direction = 'right';
    var pos = canvasio._moveItem(100, obj1);
    expect(pos.x).to.not.be.equals(obj1.pos.x);
    expect(pos.y).to.be.equals(obj1.pos.y);
    expect(pos.x).to.be.equals(500);
  });

  it('should check if the item is out of screen', function(){
    obj1.pos.x = 500;
    expect(canvasio._isOutOfScreen(obj1,400, 400)).to.equals(true);
    obj1.pos.x = 200;
    obj1.pos.y = 200;
    expect(canvasio._isOutOfScreen(obj1,400,400)).to.equals(false);
    obj1.pos.x = 500;
    obj1.pos.y = 500;
    expect(canvasio._isOutOfScreen(obj1,400, 400)).to.equals(true);
    obj1.pos.x = 0;
    obj1.pos.y = 0;
    expect(canvasio._isOutOfScreen(obj1,400, 400)).to.equals(false);
  });

  it('should remove the item if it goes out of screen on a step', function(){
    canvasio.createItem(obj1);
    expect(canvasio.getItems().length).to.equals(1);
    canvasio.step(500);
    expect(canvasio.getItems().length).to.equals(0);
  });
});

describe('Rendering', function(){
  beforeEach(function(){
    canvasio.restart();
  });

  it('should have a render method', function(){
    expect(canvasio.render).to.exist;
  });



});