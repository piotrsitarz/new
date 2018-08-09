'use strict';

angular.module('weddingApp')

  .factory('actions', ['$http', function($http) {

      var factory = {};

      factory.get = function() {
        $http.get('/actions_list').then(function successCallback(response) {
          factory.model = response.data;
          factory.modelChurch = [];
          factory.modelGeneral = [];
          factory.modelBride = [];
          factory.modelGroom = [];
          factory.earliest = factory.model.sort(function(a, b) {
            return parseFloat(a.utc) - parseFloat(b.utc);
          });
          factory.earliest = factory.earliest.filter(function(action){
            return action.utc !== 0;
          });
          factory.model.forEach(function(action){
            if (action.type === 'Kościół') {
              factory.modelChurch.push(action);
            }else if (action.type === 'Ogólne') {
              factory.modelGeneral.push(action);
            }else if (action.type === 'Panna Młoda') {
              factory.modelBride.push(action);
            }else if (action.type === 'Pan Młody') {
              factory.modelGroom.push(action);
            }
          });
          var counter = 0;
          var i;
          factory.earliestModel = [];
          for (i = 0; i < factory.earliest.length; i++) {
            if (counter === 5) {
              break;
            }
            counter++;
            factory.earliestModel.push(factory.earliest[i]);
          }
        });
      }

      factory.get();

      factory.deleteAction = function() {
        $http.post('/actions_delete', factory.toDelete).then(function successCallback(response) {
          factory.get();
        });
      };

      return factory;

  }]);
