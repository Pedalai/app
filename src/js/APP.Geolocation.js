// módulo que obtem a localização do usuário e ativa o método que cria o mapa

var APP = APP || {};

APP.Geolocation = {
  _latitude: null,
  _longitude: null,

  setUp: function(){
    var that = this;

    that.getLocation();
  },

  // obtem a posição do usuário
  getLocation: function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(APP.Geolocation.saveLocation, APP.Geolocation.showError);
    } else {
      console.log('Geolocalização não é suportada!');
    }
  },

  // guarda a posição do usuário para consultas globais
  saveLocation: function(dataPosition){
    APP.Geolocation._latitude  = dataPosition.coords.latitude;
    APP.Geolocation._longitude = dataPosition.coords.longitude;

    // ativa o método que cria o mapa
    APP.Geolocation._latitude  !== null && 
    APP.Geolocation._longitude !== null ? APP.Geolocation.Home.Map.createMap() : APP.Geolocation.getLocation();
  },

  showError: function(error){
    console.log(error);
  }
}