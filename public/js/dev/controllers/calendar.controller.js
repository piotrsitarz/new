'use strict';

angular.module('weddingApp')

  .controller('calendarController', ['$scope','$mdDialog','actions', function($scope,$mdDialog,actions) {

    $scope.actions = actions;

    $scope.addAction = function() {
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/actions_add_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        escapeToClose:true
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    }

    $scope.editAction = function(action) {
      actions.beforeEdit = angular.copy(action);
      actions.toEdit = action;
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/actions_edit_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        escapeToClose:true
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    };

    $scope.deleteAction = function(action) {
      actions.toDelete = action;
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/actions_delete_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        escapeToClose:true
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    };

    $scope.filterActions = function(action) {
      if (action === 'wykonane') {
        return function(item) {
          return item.done === true;
        };
      }else if (action === 'niewykonane') {
        return function(item) {
          return item.done === false;
        };
      }
    };


  }]);
