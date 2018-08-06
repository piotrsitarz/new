'use strict';

angular.module('weddingApp')

    .controller('budgetController', ['$scope','$http', function($scope,$http) {

      $scope.addExpense = function(expense) {
        var a = {name:expense.name,price:expense.price};
        $http.post('/expenses__add', a).then(function successCallback(response) {
          $scope.expenses.push(a);
          expense.name = '';
          expense.price = '';
        });
      };

      $scope.getExpenses = function() {
        $http.get('/expenses_list').then(function successCallback(response) {
          $scope.expenses = response.data;
        });
      }

      $scope.getExpenses();

    }]);
