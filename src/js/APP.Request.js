var APP = APP || {};

APP.Request = {
  makeRequest: function(url){
    return $.ajax({
      url: url,
      dataType: 'json',
      beforeSend: function(){
        console.log('Carregando...');
      },
      complete: function(){
        console.log('Carregou!');
      }
    });
  }
}