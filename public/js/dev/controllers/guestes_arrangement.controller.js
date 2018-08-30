'use strict';

angular.module('weddingApp')

  .controller('guestsArrangementController', ['$scope','$http','$compile','$parse','$mdDialog','dragulaService','guestList', function($scope,$http,$compile,$parse,$mdDialog,dragulaService,guestList) {

    $scope.tables = [];
    $scope.guestList = guestList;

    $scope.getGuestList = function() {
      $http.get('/guests_list').then(function successCallback(response) {
        $scope.guestsOfTable = [];
        var counter = 0;
        response.data.guests.forEach(function(x){
          counter++;
          if(x.table === "none"){
            $scope.guestsOfTable.push(x);
            if(x.checkboxs[0].partner){
              var partner = {
                name : x.name + ' os.tow.'
              };
              $scope.guestsOfTable.push(partner);
            }
          }else {
            if($scope[x.table]){
              $scope[x.table].push(x);
              if(x.checkboxs[0].partner){
                var partner = {
                  name : x.name + ' os.tow.'
                };
                $scope[x.table].push(partner);
              }
            }else{
              $scope[x.table] = [];
              $scope.tables.push(x.table);
              $scope[x.table].push(x);
              if(x.checkboxs[0].partner){
                var partner = {
                  name : x.name + ' os.tow.'
                };
                $scope[x.table].push(partner);
              }
            }
          }
        });
        $scope.tables.forEach(function(y){
          var html = `<div class="table__wrapper" layout="column" layout-align="center center">
                        <p class="table__title">${y}</p>
                        <div class="table__guests" dragula='"first-bag"' dragula-model='${y}' layout="column" layout-align="center center">
                          <p ng-repeat="item in ${y}" class="table__guest" title="{{item.name}}"><span class="guests__index">{{$index+1}}</span>{{'.   ' + item.name}}</p>
                        </div>
                      </div>`,
          pageElement = angular.element(document.getElementsByClassName("tables__container")[0]),
          compiledElement = $compile(html)($scope);
          pageElement.append(compiledElement);
        });
      });
    };

    $scope.getGuestList();

    dragulaService.options($scope, 'first-bag', {
      revertOnSpill: true
    });

    $scope.tableExist = function() {
      alert = $mdDialog.alert({
        title: 'Uwaga!',
        content: 'Istnieje stół o podanej nazwie. Proszę wybrać inną nazwę.',
        ok: 'Close'
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    };

    $scope.add = function(table) {
      $scope.name = '';
      if($scope.tables.includes(table)) {
          $scope.tableExist();
      } else {
          var model = $parse(table);
          model.assign($scope, []);
          var html = `<div class="table__wrapper" layout="column" layout-align="center center">
                        <p class="table__title">${table}</p>
                        <div class="table__guests" dragula='"first-bag"' dragula-model='${table}' layout="column" layout-align="center center">
                          <p ng-repeat="item in ${table}" class="table__guest" title="{{item.name}}"><span class="guests__index">{{$index+1}}</span>{{'.   ' + item.name}}</p>
                        </div>
                      </div>`,
          pageElement = angular.element(document.getElementsByClassName("tables__container")[0]),
          compiledElement = $compile(html)($scope);
          pageElement.append(compiledElement);
          $scope.tables.push(table);
      }
    };

    $scope.saveArrangement = function() {
      var arrangement = [];
      $scope.guestsOfTable.forEach(function(x){
        x.table = 'none';
        arrangement.push(x);
      });
      $scope.tables.forEach(function(table){
        $scope[table].forEach(function(y){
          y.table = table;
          arrangement.push(y);
        });
      });
      $http.post('/arrangement__update', arrangement).then(function successCallback(response) {
      });
    };

  }]);
