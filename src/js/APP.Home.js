var APP = APP || {};
var Geolocation = APP || {};

APP.Geolocation.Home = {
  setUp: function(){
    var that = this;
  },

  Map: {
    _map: null,

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
          
          customMarker;

      // exibir o mapa no elemento html;
      that._map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // marcador personalizado;
      image = 'http://google-maps-icons.googlecode.com/files/cycling.png';

      marker = new google.maps.Marker({
        position: myLatlng,
        map: that._map,
        icon: image,
        // animation: google.maps.Animation.BOUNCE
      });

      var myOptions = {
        content: '<h1>Você está aqui!</h1>',
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-85, 0),
        zIndex: null,
        boxStyle: { 
          background: "#fff",
          borderRadius: '3px',
          boxShadow: '0 0 10px rgba(0, 0, 0, .4)',
          marginTop: '10px',
          padding: '15px',
          width: '170px'
        },
        closeBoxMargin: "0 2px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false
      };

      var infobox = new InfoBox(myOptions);
      infobox.open(that.pai().Map._map, marker);

      // ativa o método que cria as ciclofaixas depois que o mapa é criado
      if (that._map !== null) {
        if (that.pai().Cycle._objCycle === null) {
          that.pai().Cycle.makeCycleway();
        }
      };
    }
  },

  Cycle: {
    _objCycle: null,

    // método que cria as ciclofaixas, ciclovias e rotas de bicicletas
    makeCycleway: function(){
      var that = this,
          path = 'proxy.php',
          request = $.when(APP.Request.makeRequest(path));

      request.done(function(response){
        var i = 0, c, countFeatures, countCoordinates,
            colors = [
              "#FF0000", 
              "#00FF00", 
              "#0000FF", 
              "#622b06", 
              "#000000", 
              "#79790b", 
              "#1d628e", 
              "#FF00FF",
              "#00ff84",
              "#0000ff",
              "#000",
              "#9600ff",
              "#08541a",
              "#e37906"
          ];

        that._objCycle = response;

        $.each(that._objCycle, function(idx, value){
          var DrivePath = [],
            coordinates = value.geometry;

          for (c = 0, countCoordinates = coordinates.length; c < countCoordinates; c = c+1) {
            var coordinate = coordinates[c],
            latitude = coordinate[1],
            longitude = coordinate[0];

            DrivePath.push(new google.maps.LatLng(latitude, longitude));
          }

          var PathStyle = new google.maps.Polyline({
            path: DrivePath,
            strokeColor: colors[i],
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: that.pai().Map._map,
            id: value.id
          });

          PathStyle.setMap(that.pai().Map._map);

          var customMarker = new google.maps.Marker({
            position: new google.maps.LatLng(DrivePath[0].k, DrivePath[0].B),
            map: that.pai().Map._map,
            id: value.id,
            icon: 'src/images/location.svg'
          });

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
              background: "#fff",
              borderRadius: '3px',
              boxShadow: '0 0 10px rgba(0, 0, 0, .4)',
              marginTop: '13px',
              padding: '15px',
              width: '280px'
            },
            closeBoxMargin: "0 2px 2px 2px",
            closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
          };

          var infobox = new InfoBox(myOptions);

          google.maps.event.addListener(customMarker, 'click', (function(customMarker, i) {
            
            return function() {
              infobox.open(that.pai().Map._map, customMarker);
            }

          })(customMarker));

          $('#main-section').on('click', '.locais-item', function(event){
            var id = $(event.currentTarget).attr('id');

            customMarker.setVisible(false);
            $('#main-section').empty().css('z-index', '-999999');

            if (customMarker.id == id) {
              
              customMarker.setVisible(true);
              infowindow.open(that.pai().Map._map, customMarker);
            }
          });

          $('.right-small').on('click', function(event){
            customMarker.setVisible(true);
          });

          i++;
        });
      });
    }
  }
}