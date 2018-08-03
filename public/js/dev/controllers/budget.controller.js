'use strict';

angular.module('weddingApp')

    .controller('budgetController', ['$scope','$http', function($scope,$http) {

      // $scope.expenses = [];


      // $scope.expense = {};
          $scope.addExpense = function(expense) {
            var a = {name:expense.name,price:expense.price};
            $http.post('/budget', a).then(function successCallback(response) {
              $scope.expenses.push(a);
              // $scope.getExpenses();
            });
          };

          $scope.getExpenses = function() {
            $http.get('/buget_list').then(function successCallback(response) {
              console.log(response.data);
              $scope.expenses = response.data;
            //   console.log($scope.expenses);
            //   if (response.data.length == 'firstLogin'){
            //     $scope.expenses.push({
            //       name:'Kościół',
            //       price:400
            //     },{
            //       name:'Urząd Stanu Cywilnego',
            //       price:50
            //     });
            //     console.log('firstLogin');
            //   }else {
            //     $scope.expenses = response.data.expenses;
            //     console.log($scope.expenses);
            //   }
            //     console.log($scope.expenses);
              });
            }
          $scope.getExpenses();




    }]);
