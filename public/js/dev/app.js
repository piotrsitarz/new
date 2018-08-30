'use strict';
var app = angular.module('weddingApp', ['ngMessages','ngMaterial', 'xeditable','ngCookies','ui.router','moment-picker','angularMoment','ngPatternRestrict','ngJsonExportExcel',angularDragula(angular)])

  .config(['$stateProvider','$urlRouterProvider','$locationProvider','momentPickerProvider', function ($stateProvider,$urlRouterProvider,$locationProvider,momentPickerProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider
      .state('initialize', {
          url: '/',
          views: {
            mainView: {
                templateUrl: '/public/views/initialize.html',
                controller: 'initializeController'
            }
          }
      })
      .state('main', {
          url: '/main',
          views: {
            headerView: {
                templateUrl: '/public/views/header.html',
                controller: 'headerController'
            },
            mainView: {
                templateUrl: '/public/views/general.html',
                controller: 'generalController'
            }
          }
      })
      .state('guestsList', {
          url: '/lista',
          views: {
            headerView: {
                templateUrl: '/public/views/header.html',
                controller: 'headerController'
            },
            mainView: {
                templateUrl: '/public/views/guests_list.html',
                controller: 'guestsListController'
            }
          }
      })
      .state('guestsArrangement', {
          url: '/rozmieszczenie',
          views: {
            headerView: {
                templateUrl: '/public/views/header.html',
                controller: 'headerController'
            },
            mainView: {
                templateUrl: '/public/views/guests_arrangement.html',
                controller: 'guestsArrangementController'
            }
          }
      })
      .state('budget', {
          url: '/budżet',
          views: {
            headerView: {
                templateUrl: '/public/views/header.html',
                controller: 'headerController'
            },
            mainView: {
                templateUrl: '/public/views/budget.html',
                controller: 'budgetController'
            }
          }
      })
      .state('calendar', {
          url: '/kalendarz',
          views: {
            headerView: {
                templateUrl: '/public/views/header.html',
                controller: 'headerController'
            },
            mainView: {
                templateUrl: '/public/views/calendar.html',
                controller: 'calendarController'
            }
          }
      });

      $urlRouterProvider.otherwise('/');

      momentPickerProvider.options({
          locale:        'pl',
          format:        'L LTS',
          minView:       'decade',
          maxView:       'minute',
          startView:     'year',
          autoclose:     true,
          today:         false,
          keyboard:      false,
          leftArrow:     '&larr;',
          rightArrow:    '&rarr;',
          yearsFormat:   'YYYY',
          monthsFormat:  'MMMM',
          daysFormat:    'D',
          hoursFormat:   'HH:[00]',
          minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
          secondsFormat: 'ss',
          minutesStep:   5,
          secondsStep:   1
      });
    }])

  .run(['$state','amMoment','editableOptions','editableThemes',
    function ($state,amMoment,editableOptions, editableThemes) {
       $state.go('initialize');
       amMoment.changeLocale('pl');
  }])
