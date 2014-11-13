var APP = APP || {};
var Geolocation = APP || {};

APP.Geolocation.Home = {
  _objResponse: null,

  setUp: function(){
    var that = this;
  },

  Map: {
    _map: null,

    setUp: function(){

    },

    // método que cria o mapa e marca a posição do usuário
    createMap: function(){
      var that       = this,
          latitude   = APP.Geolocation._latitude,
          longitude  = APP.Geolocation._longitude,
          myLatlng   = new google.maps.LatLng(latitude, longitude),

          mapOptions = {
            zoom: 12,
            center: myLatlng,
            panControl: false,
            mapTypeControl: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.LARGE,
              position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            // scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                stylers: [
                  { saturation: -70 },
                ]
              }
            ]
          },

          image = 'http://google-maps-icons.googlecode.com/files/cycling.png'.

          marker;

      // exibir o mapa no elemento html;
      that._map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // marcador personalizado;
      image = 'src/images/user.png';

      marker = new google.maps.Marker({
        position: myLatlng,
        map: that._map,
        icon: image,
        // animation: google.maps.Animation.BOUNCE
      });

      // info da posição do usuário
      var myOptions = {
        content: '<h1>Você está aqui!</h1>',
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-85, 0),
        zIndex: null,
        boxStyle: {
          marginTop: '10px',
          width: '170px'
        },
        closeBoxMargin: "0 2px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false
      };

      // var infobox = new InfoBox(myOptions);
      // infobox.open(that.pai().Map._map, marker);

      // ativa o método que cria as ciclofaixas depois que o mapa é criado
      if (that._map !== null) {
        if (that.pai()._objResponse === null) {
          that.pai().Cycle.makeCycleway();
        }
      };
    }
  },

  Cycle: {
    // método que cria as ciclofaixas, ciclovias e rotas de bicicletas
    makeCycleway: function(){
      var that = this,
          path = 'json.php',
          params = {
            latitude: APP.Geolocation._latitude,
            longitude: APP.Geolocation._longitude
          },
          request = $.when(APP.Request.makeRequest(path, params));

      request.done(function(response){
        // console.log(response);
        var c, countCoordinates,
            colors = [
              "#FF0000", // Ciclovia - red
              "#015d01", // Ciclofaixa Móvel - green
              "#0000FF", // Ciclofaixa - blue
              "#e85d00"  // Rota - orange
          ];

        // guarda o objeto retornado da requisição
        that.pai()._objResponse = response;

        // percorre todos os objetos de ciclovias encontradas
        $.each(that.pai()._objResponse.cicloways, function(idx, value){
          var DrivePath = [],
            coordinates = value.geometry;

          for (c = 0, countCoordinates = coordinates.length; c < countCoordinates; c = c+1) {
            var coordinate = coordinates[c],
            latitude = coordinate[1],
            longitude = coordinate[0];

            // monta o array com as posições das ciclovias
            DrivePath.push(new google.maps.LatLng(latitude, longitude));
          }

          // pinta as ciclovias de acordo com o tipo de via
          var PathStyle = new google.maps.Polyline({
            path: DrivePath,
            strokeColor: '',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            map: that.pai().Map._map,
            id: value.id
          });

          switch (value.type) {
            case 'Ciclovia':
              PathStyle['strokeColor'] = colors[0];
              break;
            case 'Ciclofaixa Móvel':
              PathStyle['strokeColor'] = colors[1];
              break;
            case 'Ciclofaixa':
              PathStyle['strokeColor'] = colors[2];
              break;
            case 'Rota':
              PathStyle['strokeColor'] = colors[3];
              break;
          }

          // insere as ciclovias no mapa
          PathStyle.setMap(that.pai().Map._map);

          // marcador de cada ciclovia
          if (DrivePath.length % 2 == 0) {
            console.log('O value.id é: ' + value.name);
            var customMarker = new google.maps.Marker({
              position: new google.maps.LatLng(DrivePath[DrivePath.length / 2].k, DrivePath[DrivePath.length / 2].B),
              map: that.pai().Map._map,
              id: value.id,
              icon: 'src/images/icones/icon-pracas.png'
            });
          } else {
            var customMarker = new google.maps.Marker({
              position: new google.maps.LatLng(DrivePath[(DrivePath.length + 1) / 2].k, DrivePath[(DrivePath.length + 1) / 2].B),
              map: that.pai().Map._map,
              id: value.id,
              icon: 'src/images/icones/icon-ciclovias.png'
            });
          }

          var boxText = '<h1 class="title-info">' + value.name + '</h1>' +
                        '<h2 class="distance-info">' + value.distance + ' km de distância</h2>' +
                        '<a class="link-info">Pedalar até aqui</a>';

          var myOptions = {
            content: boxText,
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-140, 0),
            zIndex: null,
            boxStyle: {
              marginTop: '13px',
              width: '280px'
            },
            closeBoxMargin: "0 2px 2px 2px",
            closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
          };

          var infobox = new InfoBox(myOptions),
              markerSelected;

          google.maps.event.addListener(customMarker, 'click', (function(customMarker) {

            return function() {
              infobox.open(that.pai().Map._map, customMarker);
              markerSelected = customMarker;
            }

          })(customMarker));

          google.maps.event.addListener(infobox, 'domready', function () {
            $('.infoBox').on('click', '.link-info', function(event){
              var element = event.currentTarget,

                  rendererOptions = {
                    draggable: true
                  },
                  directionsService = new google.maps.DirectionsService(),
                  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

                  directionsDisplay.setMap(that.pai().Map._map);

                  var start = new google.maps.LatLng(APP.Geolocation._latitude, APP.Geolocation._longitude),
                      end = new google.maps.LatLng(markerSelected.position.k, markerSelected.position.B),
                      request = {
                        origin: start,
                        destination: end,
                        travelMode: google.maps.TravelMode.DRIVING
                      };

                  directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {console.log(response);
                      directionsDisplay.setDirections(response);
                    }
                  });

              event.preventDefault();
            });
          });
        });
      });
    }
  }
}
