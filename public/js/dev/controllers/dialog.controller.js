'use strict';

angular.module('weddingApp')

  .controller('dialogController', ['$scope','$http','$mdDialog','$timeout','guestList','expenses','actions','moment', function($scope,$http,$mdDialog,$timeout,guestList,expenses,actions,moment) {

    $scope.guestList = guestList;
    $scope.expenses = expenses;
    $scope.actions = actions;

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

    $scope.expenseExist = function() {
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

    $scope.actionExist = function() {
      alert = $mdDialog.alert({
        title: 'Uwaga!',
        content: 'Istnieje czynność o podanej nazwie. Proszę wybrać inną nazwę.',
        ok: 'Close'
      });
      $mdDialog
        .show(alert)
        .finally(function() {
            alert = undefined;
      });
    };

    $scope.confirmedDeleteGuest = function() {
      $mdDialog.hide();
      guestList.deleteGuest();
    };

    $scope.confirmedDeleteExpense = function() {
      $mdDialog.hide();
      expenses.deleteExpense();
    };

    $scope.confirmedDeleteAction = function() {
      $mdDialog.hide();
      actions.deleteAction();
    }


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

      $scope.addExpense = function(expense) {
          var expenseExist = false;

          expenses.model.forEach(function(exp){
            if (exp.name === expense.name){
              expenseExist = true;
            }
          })

          if (expenseExist) {
            $scope.expenseExist();
            expenses.name = '';
            expenses.price = '';
          }else {
            var expenseToSend = {name:expense.name,price:expense.price, paid:0};
            $http.post('/expenses__add', expenseToSend).then(function successCallback(response) {
              $mdDialog.hide();
              expenses.expensesAmount = expenses.expensesAmount + expenseToSend.price;
              expenses.model.push(response.data);
              expenses.diff = expenses.expensesAmount - expenses.expensesPaidAmount;
              expense.name = '';
              expense.price = '';
              expenses.get();
            });
          }
      };

      $scope.addAction = function(action) {
          var actionExist = false;
          var timeStamp = moment(action.date, 'YYYY dddd D MMMM HH:[00]').unix();
          action.utc = timeStamp;

          actions.model.forEach(function(act){
            if (act.name === action.name){
              actionExist = true;
            }
          })

          if (actionExist) {
            $scope.actionExist();
          }else {
            $http.post('/actions_add', action).then(function successCallback(response) {
              $mdDialog.hide();
              actions.get();
            });
          }
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

      $scope.confirmEditExpenses = function(expenseEdited) {
        if (expenseEdited.price !== expenses.beforeEdit.price || expenseEdited.paid !== expenses.beforeEdit.paid ) {
          var diffPrice = expenseEdited.price - expenses.beforeEdit.price;
          expenses.expensesAmount = expenses.expensesAmount + diffPrice;
          var diffPaid = expenseEdited.paid - expenses.beforeEdit.paid;
          expenses.expensesPaidAmount = expenses.expensesPaidAmount + diffPaid;
          expenses.diff = expenses.expensesAmount - expenses.expensesPaidAmount;
        }
        var expenseExisting = 0;

        expenses.model.forEach(function(expense){
          if (expense.name === expenseEdited.name ) {
            expenseExisting++;
          }
        });

        if (expenseExisting === 2) {
          $mdDialog.hide();
          $scope.expenseExist();
          expenses.get();
        } else {
          $mdDialog.hide();
          $http.post('/expenses_edit', expenseEdited).then(function successCallback(response) {
          });
        }
      }

      $scope.confirmEditActions = function(actionEdited) {
        var actionExisting = 0;
        actions.model.forEach(function(action){
          if (action.name === actionEdited.name ) {
            actionExisting++;
          }
        });

        if (actionExisting === 2) {
          $mdDialog.hide();
          $scope.actionExist();
          actions.get();
        } else {
          $mdDialog.hide();
          var timeStamp = moment(actionEdited.date, 'YYYY dddd D MMMM HH:[00]').unix();
          actionEdited.utc = timeStamp;
          $http.post('/actions_edit', actionEdited).then(function successCallback(response) {
            actions.get();
          });
        }
      }

      $scope.checkChanges = function() {
        if (guestList.beforeEdit.name === guestList.toEdit.name && JSON.stringify(guestList.beforeEdit.checkboxs[0]) === JSON.stringify(guestList.toEdit.checkboxs[0])) {
          $scope.guestChanged = false;
        } else if (guestList.toEdit.name === undefined) {
          $scope.guestChanged = false;
        } else {
            $scope.guestChanged = true;
        }
      };

      $scope.checkExpenseChanges = function() {
        if (expenses.beforeEdit.name === expenses.toEdit.name && expenses.beforeEdit.price === expenses.toEdit.price && expenses.beforeEdit.paid === expenses.toEdit.paid) {
          $scope.expenseChanged = false;
        } else if (expenses.toEdit.name === undefined || expenses.toEdit.price === undefined || expenses.toEdit.paid === undefined) {
            $scope.expenseChanged = false;
        } else {
          $scope.expenseChanged = true;
        }
      };

      $scope.checkActionsChanges = function() {
        if (actions.beforeEdit.name === actions.toEdit.name && actions.beforeEdit.date === actions.toEdit.date && actions.beforeEdit.type === actions.toEdit.type && actions.beforeEdit.done === actions.toEdit.done
            && actions.beforeEdit.note === actions.toEdit.note) {
          $scope.actionsChanged = false;
        } else {
          $scope.actionsChanged = true;
        }
      };


      $scope.action = {
        name:undefined,
        date:'Data Czynności',
        type:undefined
      }

      $scope.enableAddActionButton = false;

      $scope.checkenableAddActionButton = function(action) {
        if (action.name !== undefined && action.date !== 'Data Czynności' && action.type !== undefined) {
          $timeout(function() {
            $scope.enableAddActionButton = true;
          }, 0);
        } else {
          $timeout(function() {
            $scope.enableAddActionButton = false;
          }, 0);
        }
      }

      $scope.updateDateOfAction = function(dateOfActionText, dateOfAction) {

        $scope.action.date = dateOfActionText;
        if ($scope.action.name !== undefined && $scope.action.type !== undefined){
          $scope.enableAddActionButton = true;
        }
      };

      $scope.updateEditingDateOfAction = function(dateOfEditingActionText, dateOfEditingAction){
        actions.toEdit.date = dateOfEditingActionText;
        if (actions.beforeEdit.name === actions.toEdit.name && actions.beforeEdit.date === actions.toEdit.date && actions.beforeEdit.type === actions.toEdit.type) {
          $scope.actionsChanged = false;
        } else {
          $scope.actionsChanged = true;
        }
      }

      $scope.updateEditingDateOfActionGeneral = function(dateOfEditingActionText, dateOfEditingAction){
        actions.toEdit.date = dateOfEditingActionText;
        if (actions.beforeEditGeneral.name === actions.toEditGeneral.name && actions.beforeEditGeneral.date === actions.toEditGeneral.date && actions.beforeEditGeneral.type === actions.toEditGeneral.type) {
          $scope.actionsChangedGeneral = false;
        } else {
          $scope.actionsChangedGeneral = true;
        }
      }

  }]);
