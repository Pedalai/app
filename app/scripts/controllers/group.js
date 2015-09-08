'use strict';

/**
 * @ngdoc function
 * @name pedalaiAppApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * Controller of the pedalaiAppApp
 */
angular.module('pedalaiAppApp')
  .controller('GroupCtrl', ['$scope', 'mapService', function ($scope, mapService) {

    $scope.items = [];

    // carrega os dados dos Grupos e mostra no mapa os pontos
    mapService.getGroups(function(data) {
      $scope.items = data;
      console.log('Items: ', $scope.items);
    });

  }]);
