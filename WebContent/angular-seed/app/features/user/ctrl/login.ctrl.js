'use strict';

angular.module('myapp.login', [])
		.controller('loginController', LoginController);

function LoginController($location, $rootScope, $cookies, LoginService) {

	(function initController() {
		// reset login status
		LoginService.ClearCredentials();
	})();

	var ctrl = this;

	ctrl.login = function() {
		ctrl.dataLoading = true;
		var promise = LoginService.Login(ctrl.username, ctrl.password);
		promise.then(function(response) {
			if (response.success) {
				LoginService.SetCredentials(ctrl.username, ctrl.password);
				ctrl.dataLoading = false;
				$location.path('/dashboard');
			} else {
				//FlashService.Error(response.message);
				ctrl.dataLoading = false;
			}
		});
	};

}