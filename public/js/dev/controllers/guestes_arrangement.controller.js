'use strict';

angular.module('weddingApp')

  .controller('guestsArrangementController', ['$scope','$http','$compile','dragulaService', function($scope,$http,$compile,dragulaService) {

    $scope.getGuestList = function() {
      $http.get('/guests_list').then(function successCallback(response) {
        $scope.model = response.data.guests;
      });
    };

    $scope.getGuestList();

    dragulaService.options($scope, 'first-bag', {
      revertOnSpill: true
    });

    $scope.add = function(table) {
      $scope[table] = [];
      var html = `<div class="table__wrapper" layout="column" layout-align="center center">
                    <p class="table__title">${table}</p>
                    <div class="table__guests" dragula='"first-bag"' dragula-model='${table}' layout="column" layout-align="center center">
                      <p ng-repeat="item in ${table}" class="table__guest">{{$index+1}} {{item.name}}</p>
                    </div>
                  </div>`,
      pageElement = angular.element(document.getElementsByClassName("tables__container")[0]),
      compiledElement = $compile(html)($scope);
      pageElement.append(compiledElement);
      console.log($scope.a);
    };

    // $scope.tablesGuests = [];


  }]);
