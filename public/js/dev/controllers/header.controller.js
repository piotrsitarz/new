'use strict';

angular.module('weddingApp')

    .controller('headerController', ['$scope','$state','$cookies','$timeout','$location', '$mdSidenav', function($scope,$state,$cookies,$timeout,$location, $mdSidenav) {

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }

      $scope.toggleLeft = buildToggler('left');

      $scope.changeViewToMain = function() {
        $state.go('main');
      }

      $scope.changeViewToGuestsList = function() {
        $state.go('guestsList');
      }

      $scope.changeViewToGuestsArrangement = function() {
        $state.go('guestsArrangement');
      }

      $scope.changeViewToBudget = function() {
        $state.go('budget');
      }

      $scope.changeViewToCalendar = function() {
        $state.go('calendar');
      }

      $scope.logout = function() {
        $cookies.remove('auth');
        $state.go('initialize');
      };

      var activeClass = 'header--route header--route-active';
      var inactiveClass = 'header--route';
      var url = $location.url();

      $scope.views__route = [
        inactiveClass,
        inactiveClass,
        inactiveClass,
        inactiveClass,
        inactiveClass
      ];

      $scope.changeClass = function(url){
            var routes = ['/main','/lista','/rozmieszczenie','/bud%C5%BCet','/kalendarz'];
            var active = routes.indexOf(url);
            $scope.views__route[active] = activeClass;
      };

      $scope.changeClass(url);

}]);
