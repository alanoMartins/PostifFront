'use strict';

var postifServices = angular.module('postifServices', ['ngResource']);
postifServices.urlMagic = '://127.0.0.1:';
postifServices.emptyRequest = {};

postifServices
.factory('Auth', function($cookies,$state) {
	var Auth = {};

	Auth.logged = function() {
		var user = $cookies.getObject('token');

		if (user === undefined) {
			$cookies.remove('token');
			return false;
		}
		return true;
	};

	Auth.logout = function(info) {
		// TODO - Should remove token in backend ??
		$cookies.remove('token');
		$state.go('login');
	};

	return Auth;
})
.factory('PostifService', function($resource,$http,$cookies,$state,$mdToast) {
	var PostifService = {};
	var urlBase = 'http'+postifServices.urlMagic+'8080';

	function getHeader() {
		var token = $cookies.getObject('token');

		if(token === undefined) {
			$state.go('login');
		}
		return {headers: {'Authorization': token}};
	}

	PostifService.login = function(info, userFunction, errorFunction) {
		$http.post(urlBase+'/users/login', info)
			.success(function(data, status){
				userFunction(data, status);
			}).error(function(data, status){
				if(errorFunction) {
					errorFunction(data, status);
				}
			});

	};

	PostifService.listCards = function(info) {
		return $http.post(urlBase+'/cards/list',info, getHeader());
	};

	PostifService.logout = function(info) {
		return $http.post(urlBase+'/users/logout',info, getHeader());
	};

	PostifService.showToast = function(message) {
        console.log('show toast: ' + message);
        $mdToast.show({
            template: '<md-toast><span flex>' + message + '</span></md-toast>',
            position: 'top right'
        });
    };

    

	return PostifService;
});