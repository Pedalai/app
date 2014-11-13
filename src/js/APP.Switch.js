var APP = APP || {};
APP.Switch = {
  setUp: function() {
    this.listening();
    this.removeAlone();
  },

  initialize: function() {
    $('#switch').bootstrapSwitch();
    APP.Switch.listening();
  },

  listening: function() {
    var aloneId, groupId, rideType;

    aloneId = document.querySelector('#btn-alone').id;
    groupId = document.querySelector('#btn-group').id;
    rideType = document.querySelector('#ride-type');

    $('#switch-choose').on('click', 'button', function (event) {
      if (this.id === aloneId) {
        var name = 'sozinho';
        APP.Switch.removeAlone();
        APP.Switch.changeType(name)
      } else if (this.id === groupId) {
        var name = 'em grupo';
        APP.Switch.removeGroup();
        APP.Switch.changeType(name)
      }
    });
  },

  changeType: function(name) {
    var rideType;

    rideType = document.querySelector('#ride-type');

    rideType.innerHTML = name;
  },

  removeAlone: function() {
    var alone, group;

    alone = document.querySelector('#btn-alone');
    group = document.querySelector('#btn-group');

    alone.classList.remove('off');
    group.classList.add('off');
  },

  removeGroup: function() {
    var alone, group;

    alone = document.querySelector('#btn-alone');
    group = document.querySelector('#btn-group');

    group.classList.remove('off');
    alone.classList.add('off');
  }
}
