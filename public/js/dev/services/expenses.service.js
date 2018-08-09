'use strict';

angular.module('weddingApp')

  .factory('expenses', ['$http','$mdDialog', function($http,$mdDialog) {

      var factory = {};

      factory.get = function() {
        $http.get('/expenses_list').then(function successCallback(response) {
          factory.model = response.data;
          factory.expensesAmount = 0;
          factory.expensesPaidAmount = 0;
          factory.model.forEach(function(expense){
            factory.expensesAmount = factory.expensesAmount + parseInt(expense.price);
            factory.expensesPaidAmount = factory.expensesPaidAmount + parseInt(expense.paid);
          });
          factory.diff = factory.expensesAmount - factory.expensesPaidAmount;
        });
      };

      factory.deleteExpense = function() {
        $http.post('/expenses_delete', factory.toDelete).then(function successCallback(response) {
          factory.get();
        });
      };

      factory.get();

      return factory;

  }]);
