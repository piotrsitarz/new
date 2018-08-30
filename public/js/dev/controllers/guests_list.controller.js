'use strict';

angular.module('weddingApp')

  .controller('guestsListController', ['$scope','$mdDialog','guestList', function($scope,$mdDialog,guestList) {

    $scope.guestList = guestList;

    $scope.addGuest = function() {
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/guests_add_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        escapeToClose: true
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
        clickOutsideToClose:true,
        escapeToClose: true
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    };

    $scope.deleteGuest = function(guest) {
      guestList.toDelete = guest;
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/guests_delete_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        escapeToClose: false
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    };

  }]);
