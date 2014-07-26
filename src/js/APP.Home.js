var APP = APP || {};

APP.Home = {
  _map: null,
  _directionsService: null,
  _directionsDisplay: null,

  setUp: function(){
    var that = this;
    that.initialize();
    that.getData();
  },

  initialize: function() {
    var that = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      error('Não suportado!');
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(position) {
      // como coordenadas passo o retorno da API (position.coords.latitude, position.coords.longitude)
      var myLatlng = new google.maps.LatLng(-8.045769, -34.905022);

      // Parâmetros do mapa
      var mapOptions = {
        zoom: 13,
        center: myLatlng,
        panControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

       // Parâmetros do texto que será exibido no clique;
       var contentString = '<h2>Você está aqui</h2>' +
       '<p>Este foi um exemplo de como pegar a geolocalização do usuário</p>';
       var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 700
      });

      // Exibir o mapa na div #mapuser;
      that._map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Marcador personalizado;
      var image = 'https://cdn4.iconfinder.com/data/icons/miu/22/map_location_pin_map-marker_-32.png';
      var marcadorPersonalizado = new google.maps.Marker({
        position: myLatlng,
        map: that._map,
        icon: image,
        animation: google.maps.Animation.BOUNCE
      });

      // Exibir texto ao clicar no pin;
      google.maps.event.addListener(marcadorPersonalizado, 'click', function() {
        infowindow.open(that._map,marcadorPersonalizado);
      });

    }

    // Função de error caso o navegador não suporte a geolocalização
    function error(msg) {
      console.log("Erro é: " + navigator.geolocalização);
    }
  },

  getData: function() {
    var that = this;

    $.ajax({
    url: 'proxy.php',
    dataType: 'JSON',
      beforeSend: function() {
        console.log("Carregando..");
      },
      success: function(pontos) {
        var arrCiclo = pontos.features, 
            i, c, countFeatures, countCoordinates;

            // flightPath = new google.maps.Polyline({ //configurações do desenho
            //   geodesic: true,
            //   strokeColor: '#333333',
            //   strokeOpacity: 1.0,
            //   strokeWeight: 2
            // }),

            // pontos = [];

        that._directionsService = new google.maps.DirectionsService();

        for (i = 0, countFeatures = arrCiclo.length; i < countFeatures; i = i+1) {
          var objCiclo = arrCiclo[i],
              coordinates = objCiclo.geometry.coordinates;

              for (c = 0, countCoordinates = coordinates.length; c < countCoordinates; c = c+1) {
                var coordinate = coordinates[c],
                    latitude = coordinate[1],
                    longitude = coordinate[0];

                    // pontos.push(new google.maps.LatLng(latitude, longitude));
              }

        }

          // flightPath.setMap(that._map);
          // that.displayRender();
          // that.calcRoute();
      },
      error: function() {
        console.log("Error!");
      }
    });
  },

  displayRender: function() {
    that = this;
    that._directionsDisplay = new google.maps.DirectionsRenderer();
    that._directionsDisplay.setMap(that._map);
  },

  calcRoute: function() {
    var that = this;

    var start = that.convertToString({
      lat: -8.09554,
      lng: -34.91687
    });

    var end = that.convertToString({
      lat: -8.09429,
      lng: -34.91655
    });

    console.log("Console: " + start, end);

    var request = {
      origin:start,
      destination: end,
      travelMode: google.maps.TravelMode.BICYCLING
    };

    that._directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        that._directionsDisplay.setDirections(result);
      }
    });
  },

  convertToString: function(latlng){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      return results;
    });
  }
}