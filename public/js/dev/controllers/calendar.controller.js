'use strict';

angular.module('weddingApp')

    .controller('calendarController', ['$scope','$http', function($scope,$http) {

      $scope.addAction = function(expense) {
        var a = {type:expense.type,name:expense.name};
        $http.post('/actions_add', a).then(function successCallback(response) {
          // $scope.actions.push(a);
        });
      };

      $scope.getActions = function() {
        $http.get('/actions_list').then(function successCallback(response) {
          // $scope.actions = response.data;
          console.log(response.data);
        });
      }

      $scope.getActions();

    }]);
