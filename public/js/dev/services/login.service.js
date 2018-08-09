'use strict';

angular.module('weddingApp')

  .factory('login', ['$http','$window','$cookies','$mdDialog','$state','guestList', function($http,$window,$cookies,$mdDialog,$state,guestList) {

      var factory = {};

      factory.account = {};
      factory.account.email = 'piotrsitarz@onet.eu';
      factory.account.password = 'siemanko1234567';
      factory.currentNavItem = 'login';
      factory.showLogin = true;

      factory.userDoesntConfirmed = function() {
        alert = $mdDialog.alert({
          title: 'Uwaga!',
          content: 'Konto nie zostało aktywowane. Proszę potwierdzić link rejestracyjny wysłany na maila.',
          ok: 'Close'
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

      factory.userDoesntExist = function() {
        alert = $mdDialog.alert({
          title: 'Uwaga!',
          content: 'Konto nie istnieje. Proszę wpisać dane jeszcze raz.',
          ok: 'Close'
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

      factory.do = function(account) {
        $http.post('/login', account).then(function successCallback(response) {
          if (response.data.account === 'confirmed') {
              $cookies.put('auth', response.data.token);
              guestList.get();
              // $window.location.href = '/main';
              $state.go('main');
          } else if (response.data.account === 'confirmEmail') {
              factory.userDoesntConfirmed();
          } else {
              factory.userDoesntExist();
          }
          factory.account.email = '';
          factory.account.password = '';
        });
      };

      factory.changeNav = function(nav) {
        if (nav === 'signUp' && factory.showLogin) {
          factory.showLogin = false;
        } else if (nav === 'login' && !factory.showLogin ) {
          factory.showLogin = true;
        }
      };

      return factory;

  }]);
