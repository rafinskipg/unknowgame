var game = require('../game');
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
    };
    
    
}]);