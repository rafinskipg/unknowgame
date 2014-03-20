var game = require('../game');
var canvasio = require('../canvasio');
var controllers = angular.module('controllers',  [])
.controller('mainCtrl', [
  '$scope',
  function($scope) {
    $scope.money = game.getMoney();
    $scope.taps = game.getTaps();
    $scope.restart = function(){
      game.restart();
    };

    $scope.tap = function(e){
      console.log('w',e);
      game.tap();
      $scope.money = game.getMoney();
      $scope.taps = game.getTaps();
      canvasio.createItem({
      pos: {
        x: 0,
        y: 0
      },
      size: {
        height: 10,
        width: 10
      },
      speed: 5,
      direction: 'up'
    })
    };
    
    angular.element(document).ready(function () {
        canvasio.init();
    });
}]);