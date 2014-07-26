var APP = APP || {};

APP.Sozinho = {
  setUp: function() {
    var that = this;
    that.getData();
  },

  getData: function() {
    $.ajax({
      url: "proxyGroups.php",
      dataType: "JSON",
      beforeSend: function() {
        console.log("CARREGANDO SOZNHO!");
      },

      success: function(groups) {
        $.each(groups, function(key, grupos) {
          var grupos = local,
              id = local.id,
              distance = local.distance,
              name = local.name,
              type = local.type;

              // pegando body criando os elementos
              var ul = document.querySelector('#locais-list'),
                  li = document.createElement('li'),
                  h5 = document.createElement('h5'),
                  p = document.createElement('p');
                  span = document.createElement('span');

              // adicionando classes
              li.classList.add('locais-item');
              h5.classList.add('locais-nome');
              p.classList.add('locais-distancia');
              span.classList.add('locais-tipo');

              // append
              ul.appendChild(li);
              li.appendChild(h5);
              li.appendChild(p);
              li.appendChild(span);

              // insert data
              li.id = id;
              h5.innerHTML = name;
              p.innerHTML = 'Aprox. ' + distance + ' km de distância';
              span.innerHTML = type;

              // check type
              if (type == 'PraÇa') {
                span.classList.add('praca');
              } else if (type == 'Ciclovia') {
                span.classList.add('ciclovia')
              } else if (type == 'Ciclofaixa') {
                span.classList.add('ciclofaixa')
              } else if (type == 'Rota') {
                span.classList.add('rota');
              } else if (type == 'Parque') {
                span.classList.add('parque');
              } else if (type == 'Ciclofaixa Móvel') {
                span.classList.add('ciclofaixa-movel');
              }
        });

      },

      error: function() {
        console.log("ERROR SOZNHO!");
      }
    });
  }

}