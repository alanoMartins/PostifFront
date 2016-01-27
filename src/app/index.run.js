// (function() {
//   'use strict';

//   angular
//     .module('postifFront')
//     .run(runBlock);

//   /** @ngInject */
//   function runBlock($log, $rootScope, $state, $mdToast, Auth) {

//     $rootScope.$on('$stateChangeStart', function (event, toState) {

//         if (!Auth.logged() && toState.name != "login")  {
//           event.preventDefault();
//             $state.go('login');
//         }
        
//     });

//     $log.debug('runBlock end');


//   }

// })();
