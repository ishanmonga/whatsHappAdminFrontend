angular
    .module('myapp.page').service('pageService', function($http, $q, RESOURCE_DOMAIN, RESOURCE_CONFIG) {

	this.createPage = function(catData) {
		var data = angular.fromJson(angular.toJson(catData));
		return $http.post(RESOURCE_DOMAIN+ 'page', data, RESOURCE_CONFIG);
	};
	

	this.editPage = function(page) {
		var data = angular.fromJson(angular.toJson(page));
		return $http.put(RESOURCE_DOMAIN+ 'page', data, RESOURCE_CONFIG)
	};
	
	this.deletePage = function(id) {
		return $http.delete(RESOURCE_DOMAIN+ 'page/'+ id, RESOURCE_CONFIG);
			
	};
	
	
	this.getPage = function(catId) {
		return$http.get(RESOURCE_DOMAIN+ 'page/', catId, RESOURCE_CONFIG);
	};
	
	this.getPages = function() {
		return $http.get(RESOURCE_DOMAIN+ 'page/', RESOURCE_CONFIG);
	};
});
