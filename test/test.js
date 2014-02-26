var should = require('chai').should,
    expect = require('chai').expect,
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