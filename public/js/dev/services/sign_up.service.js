'use strict';

angular.module('weddingApp')

    .factory('signUp', ['$http','$mdDialog', function($http,$mdDialog) {

        var factory = {};
        factory.account = {};
        factory.account.email = 'piotrsitarz@onet.eu';
        factory.account.password = 'siemanko1234567';

        factory.emailUsed = function() {
          alert = $mdDialog.alert({
            title: 'Uwaga!',
            content: 'Podany email jest już wykorzystywany, proszę podać inny.',
            ok: 'Close'
          });
          $mdDialog
            .show(alert)
            .finally(function() {
                alert = undefined;
          });
        };

        factory.do = function(account) {
          $http.post('/signUp', account).then(function successCallback(response) {
            if (response.data.errmsg !== undefined) {
              factory.emailUsed();
              factory.account.email = '';
              factory.account.password = '';
            }
            factory.account.email = '';
            factory.account.password = '';
          });
        };

        return factory;

    }]);
