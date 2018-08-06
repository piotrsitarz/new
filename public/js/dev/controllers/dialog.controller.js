'use strict';

angular.module('weddingApp')

    .controller('dialogController', ['$scope','$http','$mdDialog','$cookies','$timeout','guestList', function($scope,$http,$mdDialog,$cookies,$timeout,guestList) {

      $scope.guestList = guestList;

      $scope.dialogHide = function() {
        $mdDialog.hide();
      }

      $scope.guestExist = function() {
        alert = $mdDialog.alert({
          title: 'Uwaga!',
          content: 'Istnieje gość o podanej nazwie. Proszę wybrać inną nazwę.',
          ok: 'Close'
        });
        $mdDialog
          .show(alert)
          .finally(function() {
              alert = undefined;
        });
      };

      $scope.confirmedDelete = function() {
        $mdDialog.hide();
        guestList.deleteGuest();
      };

      $scope.confirmAdd = function(guest, next) {
        var guestInformations = {};
        for (var key in guest.checkboxs) {
          if(guest.checkboxs[key] === false) {
              delete guest.checkboxs[key];
          } else {
              guestInformations[key] = guest.checkboxs[key];
          }
        }

        var newGuest = {
          name:guest.name,
          checkboxs:[guestInformations]
        }

        if (!next) {
          $mdDialog.hide();
        }

        $http.post('/guests_add', newGuest).then(function successCallback(response) {
          if (response.data === 'exist') {
            $scope.guestExist();
            Object.keys(guest.checkboxs).forEach(function(key, value) {
                return guest.checkboxs[key] = false;
            })
            guest.name = '';
          } else {
              guestList.model.push(newGuest);
              Object.keys(guest.checkboxs).forEach(function(key, value) {
                  return guest.checkboxs[key] = false;
              })
              guest.name = '';
              guestList.get();
            }
          });
        };

      $scope.confirmEdit = function(guestEdited) {
        var guestExisting = 0;

        guestList.model.forEach(function(guest){
          if(guest.name === guestList.toEdit.name) {
            guestExisting++;
          }
        });

        if (guestExisting === 2) {
          $mdDialog.hide();
          $scope.guestExist();
          guestList.get();
        } else {
            if (!guestEdited.partner) {
              guestEdited.partner = 0;
            }
            guestList.filteredGuests = guestList.filteredGuests + guestEdited.partner;
            guestList.guests = guestList.guests + guestEdited.partner;
            guestList.filters.forEach(function(filter){
              guestList.filter(filter);
            })
            $mdDialog.hide();
            $http.post('/guests_edit', guestEdited).then(function successCallback(response) {
            });
          }
        };

      $scope.checkChanges = function() {
        if (guestList.beforeEdit.name === guestList.toEdit.name && JSON.stringify(guestList.beforeEdit.checkboxs[0]) === JSON.stringify(guestList.toEdit.checkboxs[0])) {
          $scope.guestChanged = false;
        } else if (guestList.toEdit.name === undefined) {
          $scope.guestChanged = false;
        } else {
            $scope.guestChanged = true;
        }
      };

    }]);
