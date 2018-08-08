'use strict';

angular.module('weddingApp')

    .factory('expenses', ['$http','$mdDialog', function($http,$mdDialog) {

        var factory = {};

        factory.expenseExist = function() {
          alert = $mdDialog.alert({
            title: 'Uwaga!',
            content: 'Istnieje wydatek o podanej nazwie. Proszę wybrać inną nazwę.',
            ok: 'Close'
          });
          $mdDialog
            .show(alert)
            .finally(function() {
                alert = undefined;
          });
        };

        factory.addExpense = function(expense) {
          var expenseExist = false;

          factory.model.forEach(function(exp){
            if (exp.name === expense.name){
              expenseExist = true;
            }
          })

          if (expenseExist) {
            factory.expenseExist();
            expense.name = '';
            expense.price = '';
          }else {
            var expenseToSend = {name:expense.name,price:expense.price, paid:0};
            $http.post('/expenses__add', expenseToSend).then(function successCallback(response) {
              factory.expensesAmount = factory.expensesAmount + expenseToSend.price;
              factory.model.push(response.data);
              factory.diff = factory.expensesAmount - factory.expensesPaidAmount;
              expense.name = '';
              expense.price = '';
              factory.get();
            });
          }
        };

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

        factory.filter = function(filter) {

        };

        factory.get();

        return factory;

    }]);
