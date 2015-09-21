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

    mapService.getGroups(function(data) {
      $scope.groups = data;
    });

  }]);
