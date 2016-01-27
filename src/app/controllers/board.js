'use strict';

angular
.module('postifFront')
.controller('BoardCtrl', function ($scope, PostifService, $state, $cookies, $mdToast, Auth) {
	$scope.info = {};
	$scope.screen = {};
	$scope.screen.error = false;

	$scope.list = function() {

		var data = {
			'token': $cookies.getObject('token')
		};

		PostifService.listCards(data)
			.success(function(cards, status){
				$scope.info.cards = cards;

			}).error(function(err, status){
				if(status == 403)
					$state.go('login');
			});

	};

	$scope.info.logout = function() {
		Auth.logout();
	};

	$scope.info.like = function() {
		PostifService.showToast('Não implementado ainda');
	};

	$scope.list();

});
