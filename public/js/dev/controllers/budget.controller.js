'use strict';

angular.module('weddingApp')

  .controller('budgetController', ['$scope','$http','$mdDialog','expenses', function($scope,$http,$mdDialog,expenses) {

    $scope.expenses = expenses;

    $scope.addExpense = function() {
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/expenses_add_dialog.html',
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

    $scope.editExpense = function(expense) {
      expenses.beforeEdit = angular.copy(expense);
      expenses.toEdit = expense;
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/expenses_edit_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose:false,
        escapeToClose: false
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    }

    $scope.deleteExpense = function(expense) {
      expenses.toDelete = expense;
      alert = $mdDialog.alert({
        controller: 'dialogController',
        templateUrl: 'public/views/expenses_delete_dialog.html',
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

    $scope.filterExpenses = function(expense) {
      if (expense === 'opłacone') {
        return function(item) {
          return item.price === item.paid;
        };
      }else if (expense === 'częściowo') {
        return function(item) {
          return ((item.price !== item.paid) && item.paid >0);
        };
      }
    };

  }]);
