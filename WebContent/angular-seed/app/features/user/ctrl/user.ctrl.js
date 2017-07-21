'use strict';

angular.module('myapp.user', []).controller('userController', UserController);

function UserController($location, userService, $scope) {
	var error = 'ERROR'

	var refreshPage = function() {
		this.user = {};
		this.user.userFirstName = '';
		this.user.userLastName = '';
		this.user.userEmail = '';
		this.user.userPassword = '';
		this.users = [];
		this.hasError = false;
		this.messages = [];
		this.getUsers();
	}.bind(this);

	// for creating new user
	this.createUser = function(user) {
		var promise = userService.createUser(user);
		promise.then(function(payload) {
			//FlashService.Success('Registration successful', true);
			$location.path('/login');
		}, function(errorPayload) {
			this.hasError = true;
			//FlashService.Error(response.message);
			this.dataLoading = false;
			this.messages.type = error;
			this.messages.content = errorPayload.fieldErrors;

		}.bind(this))
	};

	this.deleteUser = function(userPk) {
		var promise = userService.deleteUser(userPk);
		promise.then(function(payload) {
			alert('user deleted');
			refreshPage();
		}, function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	this.editUser = function(user) {
		var promise = userService.editUser(user);
		promise.then(function(payload) {
			refreshPage();
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	this.prepareEditUser = function(user) {
		this.user = user;
	}.bind(this);

	 this.getUsers = function() {
		var promise = userService.getUsers();
		promise.then(function(payload) {
			this.users = payload.data;
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})
	};

	refreshPage();

}