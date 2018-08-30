'use strict';

angular.module('weddingApp')

  .controller('generalController', ['$scope','$http','$timeout','$interval','moment', function($scope,$http,$timeout,$interval,moment) {

      function callCounter(weddingDate, currentDate) {
        $scope.dateOfWedding = weddingDate;
        var dateOfWedding = moment(weddingDate, 'YYYY dddd D MMMM HH:mm');
        var now = moment(currentDate,'YYYY-MM-DD HH:mm:ss');
        $scope.countdownTimer = moment.duration(dateOfWedding.diff(now)).format('HH:mm:ss');
        var seconds = 0;
        $scope.interval = $interval(function() {
          seconds++
          var dateOfWedding = moment(weddingDate, 'YYYY dddd D MMMM HH:mm');
          var now = moment(currentDate,'YYYY-MM-DD HH:mm:ss').add(seconds, 'seconds');
          $scope.countdownTimer = moment.duration(dateOfWedding.diff(now)).format('HH:mm:ss');
        }, 1000);
      };

      $scope.countdown = function() {
        $http.get('/get_date_of_wedding').then(function successCallback(response) {
          if (response.data !== 'dataNotSet') {
            callCounter(response.data.date[0].date, response.data.now);
          } else {
              $scope.dateOfWedding = 'Wybierz datę ślubu';
          }
        });
      }

      $scope.updateDateOfWedding = function(dateOfWeddingText, dateOfWedding) {
        $timeout(function() {
          $http.post('/update_date_of_wedding', {date:dateOfWeddingText}).then(function successCallback(response) {
            $interval.cancel($scope.interval);
            callCounter(dateOfWeddingText, response.data.now);
          });
        }, 0);
      };

      $timeout(function() {
        $scope.countdown();
      }, 0);

      $scope.getMap = function(weddingVenue, mapElement) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': weddingVenue}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var mapOptions = {
              zoom: 16,
              mapTypeControl: true,
              mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
              },
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
              },
              center: results[0].geometry.location
            }
            var map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              draggable: false,
              animation: google.maps.Animation.DROP
            });
          } else {
            alert('Nie można znaleźć podanej nazwy. Spróbuj jeszcze raz.');
            if (mapElement === 'weddingVenue') {
              $scope.weddingVenue = 'Zła nazwa miejsca ślubu.';
            } else if (mapElement === 'weddingPartyVenue') {
              $scope.weddingPartyVenue = 'Zła nazwa miejsca wesela.'
            }
          }
        });
      };

      $scope.getWeddingVenue = function() {
        $http.get('/get_wedding_venue').then(function successCallback(response) {
          if (response.data.place.place === 'New York City') {
              $scope.weddingVenue = 'Miejsce Ślubu';
              $scope.getMap(response.data.place.place,'weddingVenue');
          } else {
              $scope.weddingVenue = response.data.place[0].place;
              $scope.getMap(response.data.place[0].place,'weddingVenue');
          }
        });
      }

      $scope.updateWeddingVenue = function(weddingVenue) {
        $http.post('/update_wedding_venue', {place:weddingVenue}).then(function successCallback(response) {
          $timeout(function() {
            $scope.getMap(response.data.place.place, 'weddingVenue');
          }, 0);
        });
      }

      $scope.getWeddingPartyVenue = function() {
        $http.get('/get_wedding_party_venue').then(function successCallback(response) {
          if (response.data.place.place === 'Plac Św. Piotra') {
              $scope.weddingPartyVenue = 'Miejsce Wesela';
              $scope.getMap(response.data.place.place,'weddingPartyVenue');
          } else {
              $scope.weddingPartyVenue = response.data.place[0].place;
              $scope.getMap(response.data.place[0].place,'weddingPartyVenue');
          }
        });
      }

      $scope.updateWeddingPartyVenue = function(weddingVenue) {
        $http.post('/update_wedding_party_venue', {place:weddingVenue}).then(function successCallback(response) {
          $timeout(function() {
            $scope.getMap(response.data.place.place, 'weddingPartyVenue');
          }, 0);
        });
      }

      $scope.getWeddingVenue();
      $scope.getWeddingPartyVenue();

  }]);
