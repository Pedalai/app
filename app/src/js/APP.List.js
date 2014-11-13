var APP = APP || {};
var Geolocation = APP || {};

APP.Geolocation.Home.List = {
  setUp: function() {
    var that = this,
        bodyHeight = $('body').height();

    $('.main-section').css('height', bodyHeight - 80);

    $('.canvas-list').on('click', function(event) {
      var element = $(event.currentTarget),
          id = element.attr('id'),
          request;

      $('.main-section').empty();

      if (that.pai()._objResponse !== null) {
        that.makeList(APP.Geolocation.Home._objResponse, id);
      } else {
        console.log('Aguarde! Estamos carregando os dados!!!');
      }
    });

    // $('#main-section').on('click', '.locais-item', function(event){
    //   var id = $(event.currentTarget).attr('id');

    //   customMarker.setVisible(false);
    //   $('#main-section').empty().css('z-index', '-999999');

    //   if (customMarker.id == id) {

    //     customMarker.setVisible(true);
    //     infowindow.open(that.pai().Map._map, customMarker);
    //   }
    // });

    // $('.right-small').on('click', function(event){
    //   customMarker.setVisible(true);
    // });
  },

  makeList: function(obj, typeId) {
    var that = this,
        ul = $('<ul>').appendTo('#main-section'),
        fragment = document.createDocumentFragment();

    if (typeId === 'alone') {
      $.each(obj.cicloways, function(idx, item){
        var li = $('<li>'),
            h5 = $('<h5>'),
            distance = $('<p>');
            type = $('<p>');

        h5.text(item.name).appendTo(li);
        distance.text(item.distance).appendTo(li);
        type.text(item.type).appendTo(li);

        $(fragment).append(li);
      });

    } else {
      $.each(obj.groups, function(idx, item){
        var li = $('<li>'),
            h5 = $('<h5>'),
            h4 = $('<h4>'),
            distance = $('<p>'),
            level = $('<p>'),
            schedule = $('<p>');

        h5.text(item.name).appendTo(li);
        h4.text('Informações: ' + item.information).appendTo(li);
        distance.text('Distância: ' + item.distance + 'km').appendTo(li);
        level.text('Nível: ' + item.level).appendTo(li);
        schedule.text('Data do evento: ' + item.schedule).appendTo(li);

        $(fragment).append(li);
      });
    }

    ul.append(fragment);
  }
}
