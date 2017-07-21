angular
    .module('myapp.dashboard').service('dashboardService', function($http, $q, RESOURCE_DOMAIN, RESOURCE_CONFIG) {

	this.userLogin = function(userData) {
		var data = angular.fromJson(angular.toJson(userData));

		var config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		var deferred = $q.defer();
		$http.post(RESOURCE_DOMAIN+ 'user/authenticate', data, config)
				.success(function(result, status, headers, config) {
					deferred.resolve(result);
				}).error(function(result, status, header, config) {
					deferred.reject(result);
				});
		return deferred.promise
	};
	
	
	this.userLogout = function(userData) {
		var data = angular.fromJson(angular.toJson(userData));

		var config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		var deferred = $q.defer();
//		$http.post(RESOURCE_DOMAIN+ 'user/authenticate', data, config)
//				.success(function(result, status, headers, config) {
//					deferred.resolve(result);
//				}).error(function(result, status, header, config) {
//					deferred.reject(result);
//				});
		return deferred.promise
	};
});
