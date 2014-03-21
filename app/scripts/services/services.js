var game = require('../game');
var canvasio = require('../canvasio');

var services = angular.module('services', [])
  .factory('ddbb', ['$http', '$q', function($http, $q) {

    var saveLocals = function(locals){
      localStorage.setItem("tapgame", JSON.stringify(locals));
    }
    var getLocals = function(){
      var commands =  JSON.parse(localStorage.getItem("tapgame"));
      if(!commands || !commands.length > 0){
        commands = [];
      }
      return commands;
    }

    return {
        getCommands: getCommands,
        save: save
      };
  }])
.factory('clickService', ['$http', '$q', function($http, $q) {

  function getCoords(e){
    var x, y;
   if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    }
    else { 
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 
    x -= e.target.offsetParent.offsetLeft;
    y -= e.target.offsetParent.offsetTop;
    return {x:x, y:y};
  }

  return {
    getCoords: getCoords
  }
}])
.factory('gameService', ['$http', '$q', function($http, $q) {
  function isNeededEvent(tap){
    if(tap<15){
      return false;
    }
    return true;
  }

  function getEvent(coords){
    return {
        pos: coords,
        size: {
          height: 10,
          width: 10
        },
        speed: 5,
        direction: 'up'
      };
  }

  function tap(coords){
    game.tap();

    var taps = game.getTaps();

    if(isNeededEvent(taps)){
      canvasio.createItem(getEvent(coords));
    }

    return {
      money: game.getMoney(),
      taps: taps
    }
  }

  function restart(){
    game.restart();
    canvasio.restart();
  }
  function init(){
    canvasio.init();
  }
  return {
    tap: tap,
    restart: restart,
    init: init
  }
}]);
