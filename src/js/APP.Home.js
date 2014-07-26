var APP = APP || {};

APP.Home = {
  _map: null,

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
        zoom: 12,
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
      var image = 'http://google-maps-icons.googlecode.com/files/cycling.png';
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
        console.log("Carregando...");
      },
      complete: function(){
        console.log("Carregou!!!");
      },
      success: function(pontos) {
        var arrCiclo = pontos,
            i = 0, c, countFeatures, countCoordinates,

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

          setTimeout(function(){
              $.each(arrCiclo, function(idx, value){
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
                  map: that._map,
                  id: value.id
                });

                PathStyle.setMap(that._map);

                var marcadorPersonalizado = new google.maps.Marker({
                  position: new google.maps.LatLng(DrivePath[0].k, DrivePath[0].B),
                  map: that._map,
                  id: value.id
                  // icon: image,
                });

                // var infowindow = new google.maps.InfoWindow({
                //     content: '<h1 class="title-info">' + value.name + '</h1>' + 
                //             '<h2 class="distance-info">' + value.distance + ' km de distância</h2>' + 
                //             '<a class="link-info">Pedalar até aqui</a>',
                //     id: value.id,
                //     maxWidth: 170
                // });
                
                // infowindow.setPosition(new google.maps.LatLng(DrivePath[0].k, DrivePath[0].B));
                // infowindow.open(that._map);

                var infowindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marcadorPersonalizado, 'click', (function(marcadorPersonalizado, i) {
                  
                  return function() {
                    infowindow.setContent(

                      '<h1 class="title-info">' + value.name + '</h1>' + 
                            '<h2 class="distance-info">' + value.distance + ' km de distância</h2>' + 
                            '<a class="link-info">Pedalar até aqui</a>'
                      
                    );
                    
                    infowindow.open(that._map, marcadorPersonalizado);
                  }

              })(marcadorPersonalizado));

                $('#main-section').on('click', '.locais-item', function(event){
                  var id = $(event.currentTarget).attr('id');

                  marcadorPersonalizado.setVisible(false);
                  $('#main-section').empty().css('z-index', '-999999');

                  if (marcadorPersonalizado.id == id) {
                    
                    marcadorPersonalizado.setVisible(true);
                    infowindow.open(that._map, marcadorPersonalizado);
                  }
                });

                $('.right-small').on('click', function(event){
                  marcadorPersonalizado.setVisible(true);
                });

                i++;
              });
    }, 1000);

          // for (i = 0, countFeatures = arrCiclo.length; i < countFeatures; i = i+1) {
          //   var objCiclo = arrCiclo[i],
          //   coordinates = objCiclo.geometry.coordinates;

          //   var DrivePath = [];

          //   for (c = 0, countCoordinates = coordinates.length; c < countCoordinates; c = c+1) {
          //     var coordinate = coordinates[c],
          //     latitude = coordinate[1],
          //     longitude = coordinate[0];

          //     DrivePath.push(new google.maps.LatLng(latitude, longitude));
          //   }

          //   var PathStyle = new google.maps.Polyline({
          //     path: DrivePath,
          //     strokeColor: colors[i],
          //     strokeOpacity: 1.0,
          //     strokeWeight: 2,
          //     map: that._map,
          //     id: objCiclo.id
          //   });

          //   PathStyle.setMap(that._map);

          //   var infowindow = new google.maps.InfoWindow({
          //       content: '<h1 class="title-info">' + objCiclo.properties.Name + '</h1>',
          //       id: objCiclo.id
          //   });
            
          //   infowindow.setPosition(new google.maps.LatLng(DrivePath[0].k, DrivePath[0].B));
          //   infowindow.open(that._map);

          // }

      },
      error: function() {
        console.log("Error!");
      }
    });
  }
}