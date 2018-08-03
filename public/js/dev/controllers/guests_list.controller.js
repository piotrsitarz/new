'use strict';

angular.module('weddingApp')

    .controller('guestsListController', ['$scope','$http','$mdDialog','guestList', function($scope,$http,$mdDialog,guestList) {

      $scope.guestList = guestList;

      $scope.addGuest = function() {
        alert = $mdDialog.alert({
          controller: 'dialogController',
          templateUrl: 'public/views/guests_add_dialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

      $scope.editGuest = function(guest) {
        guestList.beforeEdit = angular.copy(guest);
        guestList.toEdit = guest;

        alert = $mdDialog.alert({
          controller: 'dialogController',
          templateUrl: 'public/views/guests_edit_dialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose:false,
          escapeToClose: false
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

    }]);
