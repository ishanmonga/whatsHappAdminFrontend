angular
    .module('myapp.user').service('userService', function($http, $q, RESOURCE_DOMAIN, RESOURCE_CONFIG) {

	this.createUser = function(catData) {
		var data = angular.fromJson(angular.toJson(catData));
		return $http.post(RESOURCE_DOMAIN+ 'user', data, RESOURCE_CONFIG);
	};
	

	this.editUser = function(user) {
		var data = angular.fromJson(angular.toJson(user));
		return $http.put(RESOURCE_DOMAIN+ 'user', data, RESOURCE_CONFIG);
	};
	
	this.deleteUser = function(userId) {
		return $http.delete(RESOURCE_DOMAIN+ 'user/'+ userId, RESOURCE_CONFIG);
	};
	
	
	this.getUser = function(userId) {
		return $http.get(RESOURCE_DOMAIN+ 'user/' + userId, RESOURCE_CONFIG);
	};
	
	this.getUserByUsername = function(username) {
		
		return $http.get(RESOURCE_DOMAIN+ 'user/'+username+'/username'
		 , RESOURCE_CONFIG);
	};
	
	this.getUsers = function() {
		return	$http.get(RESOURCE_DOMAIN+ 'user/', RESOURCE_CONFIG);
	};
	
});
