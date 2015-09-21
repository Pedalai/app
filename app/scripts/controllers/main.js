'use strict';

/**
 * @ngdoc function
 * @name pedalaiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pedalaiAppApp
 */
angular.module('pedalaiAppApp')
  .controller('MainCtrl', ['$scope', '$timeout', '$mdBottomSheet', 'mapService', function ($scope, $timeout, $mdBottomSheet, mapService) {

    var geocoder, myLatlng, mapOptions, infowindow, map,
        marcadorPersonalizado, styles, styledMap;

    $scope.pedalType = 'Sozinho';

    // Pega a localização do usuário e mostra no mapa
    $scope.geolocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition($scope.showMap, $scope.errorGeolocation);
      } else {
        alert('Seu navegador não suporta geolocation');
      }
    };

    $scope.showMap = function(position) {
      myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      mapOptions = {
        zoom: 13,
        center: myLatlng,
        panControl: false,
        scrollwheel: false,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'pedalai_map']
        }
      }

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      marcadorPersonalizado = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: '../images/icon-user-location.png',
        title: 'Você está aqui!'
      });

      infowindow = new google.maps.InfoWindow({
        content: 'Você está aqui!',
        maxWidth: 700
      });

      // Estilizando o mapa;
      styles = [
        {
          stylers: [
            { "invert_lightness": false },
            { "weight": 0.3 },
            { lightness: 0 },
            { gamma: 0 }
          ]
        },
        {
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -29 },
            { "visibility": "on" },
            { "saturation": 1 },
            { "invert_lightness": true },
            { "hue": "#eeff00" },
            { "color": "#fbbc05" }
          ]
        },
        {
          "elementType": "labels.text",
          "stylers": [
            { "visibility": "on" },
            { "color": "#4581F2" },
            { "weight": 0.3 }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            { "weight": 0.3 },
            { "visibility": "off" }
          ]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            { "visibility": "simplified" }
          ]
        }
      ];

      styledMap = new google.maps.StyledMapType(styles, {
        name: "Pedalaí"
      });

      // Aplicando as configurações do mapa
      map.mapTypes.set('pedalai_map', styledMap);
      map.setMapTypeId('pedalai_map');

      // cria uma nova instância do geocoder para caso seja utilizado
      geocoder = new google.maps.Geocoder();

      google.maps.event.addListener(marcadorPersonalizado, 'click', function($event) {
        // abre as informações sozinho
        // $scope.showMoreInfo($event);

        // abre as informações em grupo
        // if ($scope.pedalType !== 'Sozinho')
            $scope.showMoreInfoGroup($event);
      });
    };

    $scope.errorGeolocation = function(msg) {
      alert('Ocorreu um erro na geolocalização: ', msg);
    };

    // ====

    // Pedalar sozinho
    $scope.pedalAlone = function() {
      $scope.pedalType = 'Sozinho';

      mapService.getCiclovias(function(data) {
        $scope.ciclovias = data;
      });
    };

    $scope.showMoreInfo = function($event) {
      $mdBottomSheet.show({
        templateUrl: '../../views/templates/info-alone.html',
        controller: 'AloneCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        console.log(clickedItem + ' clicked!');
      });
    };
    // ====

    // Pedalar em Grupo
    $scope.pedalGroup = function() {
      $scope.pedalType = 'Em grupo';

      mapService.getGroups(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showMoreInfoGroup = function($event) {
      $mdBottomSheet.show({
        templateUrl: '../../views/templates/info-group.html',
        controller: 'GroupCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        console.log(clickedItem + ' clicked!');
      });
    };
    // ====

    // Execução das funções
    $scope.geolocation();

  }]);
