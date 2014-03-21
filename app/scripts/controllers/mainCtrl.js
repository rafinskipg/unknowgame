

var controllers = angular.module('controllers',  [])
.controller('mainCtrl', [
  '$scope', 'clickService', 'gameService',
  function($scope, clickService, gameService) {
    
    $scope.restart = function(){
      gameService.restart();
      $scope.money = 0;
      $scope.taps = 0;
    };

    $scope.tap = function(e){
      var result = gameService.tap(clickService.getCoords(e));
      $scope.money = result.money;
      $scope.taps = result.taps;
    };
    
    angular.element(document).ready(function () {
        gameService.init();
    });
}]);