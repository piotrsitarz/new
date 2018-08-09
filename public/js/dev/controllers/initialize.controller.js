'use strict';

angular.module('weddingApp')

  .controller('initializeController', ['$scope','$http','login','signUp', function($scope,$http,login,signUp) {

		$scope.login = login;
    $scope.signUp = signUp;

  }]);
