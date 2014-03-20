var should = require('chai').should,
    expect = require('chai').expect,
    assert = require('chai').assert,
    app = require('../app/scripts/game');

describe('The tap game', function(){
  before(function(){
    // ...
  });

  it('Should have the app', function(){
    expect(app).not.to.be.null;
  });

  it('Should have a tap entry point', function(){
    expect(app.tap).to.not.be.null;
    expect(app.tap).to.be.a('function');
  });

  it('Should have an output point', function(){
    expect(app.getTaps).to.not.be.null;
    expect(app.getTaps).to.be.a('function');
  });

  it('Should have 0 taps at first', function(){
    expect(app.getTaps()).to.equals(0);
  });

  it('Should have 1 tap after first tap', function(){
    app.tap();
    expect(app.getTaps()).to.equals(1);
  });

  it('Should have a reset function', function(){
    expect(app.restart).to.be.a('function');
  });

  it('Should have 2 taps now', function(){
    app.tap();
    expect(app.getTaps()).to.equals(2);
  });

  it('Should have 0 taps after restart', function(){
    app.restart();
    expect(app.getTaps()).to.equals(0);
  });
});

describe('The money', function(){
  beforeEach(function(){
    app.restart();
  });

  it('Should have a money per tap value', function(){
    expect(app.getMoneyPerTap).to.exist;
    expect(app.getMoneyPerTap()).to.exist;
  });

  it('Should have a setter for the money per tap value', function(){
    expect(app.setMoneyPerTap).to.exist;
    expect(app.setMoneyPerTap(1)).to.not.exist;
  });

  it('Should change the money per tap', function(){
    app.setMoneyPerTap(0.4444);
    assert.equal(app.getMoneyPerTap(), 0.44);
    app.restart();
    assert.equal(app.getMoneyPerTap(), 1.00);
  });

  it('Should return the current money', function(){
    expect(app.getMoney).to.exist;
    assert.equal(app.getMoney(), 0.00);
  });

  it('Should change the money when i tap', function(){
    app.tap();
    assert.equal(app.getMoney(), 1.00);
    app.tap();
    assert.equal(app.getMoney(), 2.00);
  });

  it('Should change the money increase when I change the money per tap', function(){
    app.tap();
    assert.equal(app.getMoney(), 1.00);
    app.setMoneyPerTap(0.10);
    app.tap();
    assert.equal(app.getMoney(), 1.10);
    app.setMoneyPerTap(1.10);
    app.tap();
    assert.equal(app.getMoney(), 2.20);
  });

  it('Should work with negative values too', function(){
    app.tap();
    assert.equal(app.getMoney(), 1.00);
    app.setMoneyPerTap(-1.10);
    app.tap();
    assert.equal(app.getMoney(), -0.10);
  });
});

describe('The Bonuses ', function(){
  beforeEach(function(){
    app.restart();
  });

  it('should have a new bonus call', function(){
    expect(app.newBonus).to.exist;
    expect(app.newBonus).to.be.a('function');
  });

  it('should add a bonus to the current bonus list', function(){
    app.newBonus();
    expect(app.getBonuses).to.exist;
    expect(app.getBonuses().length).to.be.equals(1);
    app.restart();
    expect(app.getBonuses().length).to.be.equals(0);
  });

  it('should be able to create a bonus for tap', function(){
    app.newMoneyTapBonus(1.5);
    expect(app.getBonuses().length).to.be.equals(1);
    app.tap();
    assert.equal(app.getMoney(), 1.50);
    app.tap();
    assert.equal(app.getMoney(), 3.00);
  });

  it('should remove the bonus after N taps', function(){
    app.newMoneyTapBonus(1.5, 5);
    for(var i = 1; i < 6; i++){
      app.tap();
      assert.equal(app.getMoney(), i * 1.50);
    }
    expect(app.getBonuses().length).to.be.equals(0);
    app.tap();
    assert.equal(app.getMoneyPerTap(), 1.00);
    assert.equal(app.getMoney(), 8.50);
  });
});