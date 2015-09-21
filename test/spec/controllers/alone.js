'use strict';

describe('Controller: AloneCtrl', function () {

  // load the controller's module
  beforeEach(module('pedalaiAppApp'));

  var AloneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AloneCtrl = $controller('AloneCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AloneCtrl.awesomeThings.length).toBe(3);
  });
});
