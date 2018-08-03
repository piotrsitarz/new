'use strict';

angular.module('weddingApp')

    .controller('budgetController', ['$scope','$http', function($scope,$http) {


      $scope.get = function() {
        console.log('aa');
        // $http.get('/budget').then(function successCallback(response) {
        //   console.log(response.data);
        // });
      };

        $scope.get();


    }]);
