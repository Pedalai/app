var APP = APP || {};

APP.List = {
  setUp: function() {
    var that = this;

    $('.canvas-list').on('click', function(event) {
      var element = $(event.currentTarget),
          id = element.attr('id'),
          path, request;

      id == 'alone' ? path = 'proxySozinho.php' : path = 'proxyGroups.php';

      request = $.when(APP.Request.makeRequest(path));

      request.done(function(response){
        $('.main-section').remove();
        that.makeList(response);
      });
    });
  },

  makeList: function(list) {
    var section = $('<section>')
        .addClass('main-section')
        .attr('id', 'main-section')
        .appendTo('.inner-wrap'),

        ul = $('<ul>').appendTo(section),
        fragment = document.createDocumentFragment();

    $.each(list, function(idx, item){
      var li = $('<li>'),
          h5 = $('<h5>'),
          distance = $('<p>');
          type = $('<p>');

      h5.text(item.name).appendTo(li);
      distance.text(item.distance).appendTo(li);
      type.text(item.type).appendTo(li);

      $(fragment).append(li);
    });

    ul.append(fragment);
  }

}