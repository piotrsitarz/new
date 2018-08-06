'use strict';

angular.module('weddingApp')

    .factory('guestList', ['$http', function($http) {

        var factory = {};

        factory.get = function() {
          $http.get('/guests_list').then(function successCallback(response) {
            factory.model = response.data.guests;
            factory.guests = factory.model.length;
            factory.modelCopy = angular.copy(factory.model);
            factory.model.forEach(function(x) {
              if (x.checkboxs[0].partner) {
                  factory.guests++;
              }
            });
            factory.filteredGuests = factory.guests;
          });
        };

      factory.get();


        factory.getCheckbox = function(checkbox, array) {
          switch(checkbox) {
            case 'women':
                return 'Kobieta'
                break;
            case 'men':
                return 'Mężczyzna'
                break;
            case 'partner':
                return 'Z Os. Tow.'
                break;
            case 'noPartner':
                return 'Bez Os. Tow.'
                break;
            case 'invite':
                return 'Zaproszono'
                break;
            case 'noInvite':
                return 'Nie Zapr.'
                break;
            case 'confirmation':
                return 'Potwierdzono'
                break;
            case 'noConfirmation':
                return 'Nie Potw.'
                break;
            case 'accommodation':
                return 'Nocleg'
                break;
            case 'noAccommodation':
                return 'Brak Noclegu'
                break;
            case 'groom':
                return 'Pan Młody'
                break;
            case 'bride':
                return 'Pani Młoda'
                break;
          }
        };

        factory.filtersSex = [
          {sex:'None'},
          {sex:'Kobieta'},
          {sex:'Mężczyzna'}
        ];

        factory.filtersCompan = [
          {compan:'None'},
          {compan:'Tak'},
          {compan:'Nie'}
        ];

        factory.filtersInvited= [
          {invited:'None'},
          {invited:'Tak'},
          {invited:'Nie'}
        ];

        factory.filtersConfirmed = [
          {confirmed:'None'},
          {confirmed:'Tak'},
          {confirmed:'Nie'}
        ];

        factory.filtersAccommodation = [
          {accommodation:'None'},
          {accommodation:'Tak'},
          {accommodation:'Nie'}
        ];

        factory.filtersFamily = [
          {family:'None'},
          {family:'Pani Młoda'},
          {family:'Pan Młody'}
        ];

        factory.filters = [];

        factory.filterBySex = function(filter) {
          filter = {sex:filter.sex};
          var filterBySexExist = factory.filters.filter(function(x){
            return x.sex !== undefined;
          });
          if (filterBySexExist.length !==0) {
            factory.filters.forEach(function(x){
              if (x.sex !== undefined) {
                x.sex = filter.sex;
              }
            });
          }else {
              factory.filters.push(filter);
          }
        };

        factory.filterByCompan = function(filter) {
          filter = {compan:filter.compan};
          var filterByCompanExist = factory.filters.filter(function(x){
            return x.compan !== undefined;
          });
          if (filterByCompanExist.length !==0) {
            factory.filters.forEach(function(x){
              if (x.compan !== undefined) {
                x.compan = filter.compan;
              }
            });
          }else {
              factory.filters.push(filter);
          }
        };

        factory.filterByInvited = function(filter) {
          filter = {invited:filter.invited};
          var filterByInvitedExist = factory.filters.filter(function(x){
            return x.invited !== undefined;
          });
          if (filterByInvitedExist.length !==0) {
            factory.filters.forEach(function(x){
              if (x.invited !== undefined) {
                x.invited = filter.invited;
              }
            });
          }else {
              factory.filters.push(filter);
          }
        };

        factory.filterByConfirmed = function(filter) {
          filter = {confirmed:filter.confirmed};
          var filterByConfirmedExist = factory.filters.filter(function(x){
            return x.confirmed !== undefined;
          });
          if (filterByConfirmedExist.length !==0) {
            factory.filters.forEach(function(x){
              if (x.confirmed !== undefined) {
                x.confirmed = filter.confirmed;
              }
            });
          }else {
              factory.filters.push(filter);
          }
        };

        factory.filterByAccommodation = function(filter) {
          filter = {accommodation:filter.accommodation};
          var filterByAccommodationExist = factory.filters.filter(function(x){
            return x.accommodation !== undefined;
          });
          if (filterByAccommodationExist.length !==0) {
            factory.filters.forEach(function(x){
              if (x.accommodation !== undefined) {
                x.accommodation = filter.accommodation;
              }
            });
          }else {
              factory.filters.push(filter);
          }
        };

        factory.filterByFamily = function(filter) {
          filter = {family:filter.family};
          var filterByFamilyExist = factory.filters.filter(function(x){
            return x.family !== undefined;
          });
          if (filterByFamilyExist.length !==0) {
            factory.filters.forEach(function(x){
              if (x.family !== undefined) {
                x.family = filter.family;
              }
            });
          }else {
              factory.filters.push(filter);
          }
        };

        factory.filter = function(filter) {
          console.log('aaa',filter);
          if(filter.sex !== undefined) {
            if(filter.sex === 'None') {
                factory.filterBySex(filter);
            } else if(filter.sex === 'Kobieta') {
                factory.filterBySex(filter);
            }else if(filter.sex ==='Mężczyzna') {
                factory.filterBySex(filter);
            }
          }else if(filter.compan !== undefined) {
              if(filter.compan === 'None') {
                  factory.filterByCompan(filter);
              }else if(filter.compan === 'Tak'){
                  factory.filterByCompan(filter);
              }else if(filter.compan === 'Nie'){
                  factory.filterByCompan(filter);
              }
          }else if(filter.invited !== undefined) {
              if(filter.invited === 'None') {
                  factory.filterByInvited(filter);
              }else if(filter.invited === 'Tak'){
                  factory.filterByInvited(filter);
              }else if(filter.invited === 'Nie'){
                  factory.filterByInvited(filter);
              }
          }else if(filter.confirmed !== undefined) {
              if(filter.confirmed === 'None') {
                  factory.filterByConfirmed(filter);
              }else if(filter.confirmed === 'Tak'){
                  factory.filterByConfirmed(filter);
              }else if(filter.confirmed === 'Nie'){
                  factory.filterByConfirmed(filter);
              }
          }else if(filter.accommodation !== undefined) {
              if(filter.accommodation === 'None') {
                  factory.filterByAccommodation(filter);
              }else if(filter.accommodation === 'Tak'){
                  factory.filterByAccommodation(filter);
              }else if(filter.accommodation === 'Nie'){
                  factory.filterByAccommodation(filter);
              }
          }else if(filter.family !== undefined) {
              if(filter.family === 'None') {
                  factory.filterByFamily(filter);
              }else if(filter.family === 'Pani Młoda'){
                  factory.filterByFamily(filter);
              }else if(filter.family === 'Pan Młody'){
                  factory.filterByFamily(filter);
              }
          }
          factory.filterBy = [];
          factory.filters.forEach(function(x){
            if(x.sex !== undefined) {
              switch(x.sex) {
                case 'Kobieta':
                  factory.filterBy.push('women');
                  break;
                case 'Mężczyzna':
                  factory.filterBy.push('men');
                  break;
                case 'None':
                  factory.filterBy.push('none');
                  break;
              }
            }else if(x.compan !== undefined) {
              switch(x.compan) {
                case 'Tak':
                  factory.filterBy.push('partner');
                  break;
                case 'Nie':
                  factory.filterBy.push('noPartner');
                  break;
                case 'None':
                  factory.filterBy.push('none');
                  break;
              }
            }else if(x.invited !== undefined) {
              switch(x.invited) {
                case 'Tak':
                  factory.filterBy.push('invite');
                  break;
                case 'Nie':
                  factory.filterBy.push('noInvite');
                  break;
                case 'None':
                  factory.filterBy.push('none');
                  break;
              }
            }else if(x.confirmed !== undefined) {
              switch(x.confirmed) {
                case 'Tak':
                  factory.filterBy.push('confirmation');
                  break;
                case 'Nie':
                  factory.filterBy.push('noConfirmation');
                  break;
                case 'None':
                  factory.filterBy.push('none');
                  break;
              }
            }else if(x.accommodation !== undefined) {
              switch(x.accommodation) {
                case 'Tak':
                  factory.filterBy.push('accommodation');
                  break;
                case 'Nie':
                  factory.filterBy.push('noAccommodation');
                  break;
                case 'None':
                  factory.filterBy.push('none');
                  break;
              }
            }else if(x.family !== undefined) {
              switch(x.family) {
                case 'Pani Młoda':
                  factory.filterBy.push('bride');
                  break;
                case 'Pan Młody':
                  factory.filterBy.push('groom');
                  break;
                case 'None':
                  factory.filterBy.push('none');
                  break;
              }
            }
          });
          factory.model = factory.modelCopy.filter(function(guest){
            var filters = factory.filterBy.filter(function(x){
              return guest.checkboxs[0][x] === true;
            });
            if (filters.length === factory.filterBy.length) {
              return guest;
            }
          });
          var filteredGuestsWithCompan = 0;
          factory.model.forEach(function(guest){
            if (guest.checkboxs[0].partner) {
                filteredGuestsWithCompan++;
            }
          })
          factory.filteredGuests = factory.model.length + filteredGuestsWithCompan;
        };

        factory.deleteGuest = function() {
          factory.model = factory.model.filter(function(x){
            return x._id !== factory.toDelete._id;
          })
        };


        return factory;

    }]);
