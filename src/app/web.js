(function() {
  'use strict';

  angular
    .module('postifFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr', 'postifServices', 'angular-md5'])
    .config(config)
    .config(routerConfig)
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $mdToast, Auth) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {

        if (!Auth.logged() && toState.name != "login")  {
          event.preventDefault();
            $state.go('login');
        }
        
    });

    $log.debug('runBlock end');
  }

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('board', {
        url: '/board',
        templateUrl: 'app/views/board.html',
        controller: 'BoardCtrl',
        controllerAs: 'board'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
