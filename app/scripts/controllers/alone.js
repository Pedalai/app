'use strict';

/**
 * @ngdoc function
 * @name pedalaiAppApp.controller:AloneCtrl
 * @description
 * # AloneCtrl
 * Controller of the pedalaiAppApp
 */
angular.module('pedalaiAppApp')
  .controller('AloneCtrl', ['$scope', 'mapService', function ($scope, mapService) {

    mapService.getCiclovias(function(data) {
      $scope.ciclovias = data;
    });

    $scope.tracarRota = function(lat, lng) {
      console.log('Traçar rotas: ', lat, lng);
    };

  }]);
