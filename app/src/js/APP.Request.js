var APP = APP || {};
APP.Request = {
  makeRequest: function(url, params){
    return $.ajax({
      url: url,
      dataType: 'json',
      data: params,
      beforeSend: function(){
        console.log('Carregando...');
      },
      complete: function(){
        console.log('Carregou!');
      }
    });
  }
}
