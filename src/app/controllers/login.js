'use strict';

angular
.module('postifFront')
.controller('LoginCtrl', function ($scope, PostifService, $state, $cookies, $mdToast, md5) {
	$scope.info = {};
	$scope.screen = {};
	$scope.screen.error = false;

	$cookies.remove('user');

	$scope.info.login = function() {

		var username = $scope.info.username.toLowerCase();
		var hashpass = md5.createHash(username + $scope.info.password);

		var login = {
			'username': username,
			'password': hashpass,
		};

		PostifService.login(login,
			function(user, status) {

				// Put something more strong in cookie...
				$cookies.putObject('token', user.token);
				$state.go('board');
			},
			function(error, status){

				if(error === null){
					PostifService.showToast('Erro ao tentar conectar ao servidor');
				}

				if (status === 403) {
					PostifService.showToast('Login ou senha errados');
				} else {
					PostifService.showToast('Erro ao tentar conectar ao servidor');
				}
			});
	};

});
