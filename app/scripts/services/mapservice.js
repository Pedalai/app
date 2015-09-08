'use strict';

/**
 * @ngdoc service
 * @name pedalaiAppApp.mapService
 * @description
 * # mapService
 * Service in the pedalaiAppApp.
 */
angular.module('pedalaiAppApp')
  .service('mapService', ['$http', function ($http) {
    var obj = {};

    var recifeDados = [];

    obj.getRecifeData = function(callback) {
      $http.get('http://localhost/campus-party/pedalai/_app/json.php')
        .success(function(data) {
          recifeDados = data;
          // console.log('Success getRecifeData: ', recifeDados);
          callback(data);
        }).error(function(error) {
          console.log('Error getRecifeData: ', error);
        })
    };

    var groups = [];

    obj.getGroups = function(callback) {
      $http.get('../../assets/groups.json')
        .success(function(data) {
          groups = data;
          // console.log('Success getGroups: ', groups);
          callback(data);
        }).error(function(error) {
          console.log('Error getGroups: ', error);
        })
    };

    return obj;
  }]);
