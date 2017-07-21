angular
    .module('myapp.category').service('categoryService', function($http, $q, RESOURCE_DOMAIN, RESOURCE_CONFIG) {

	this.createCategory = function(catData) {
		var data = angular.fromJson(angular.toJson(catData));
		return $http.post(RESOURCE_DOMAIN+ 'category', data, RESOURCE_CONFIG);
	};
	

	this.editCategory = function(category) {
		var data = angular.fromJson(angular.toJson(category));
		return $http.put(RESOURCE_DOMAIN+ 'category', data, RESOURCE_CONFIG);
	};
	
	this.deleteCategory = function(catId) {
		return $http.delete(RESOURCE_DOMAIN+ 'category/'+ catId, RESOURCE_CONFIG);
	};
	
	
	this.getCategory = function(catId) {
		return $http.get(RESOURCE_DOMAIN+ 'category/'+ catId, RESOURCE_CONFIG);
	};
	
	this.getCategories = function() {
		return	$http.get(RESOURCE_DOMAIN+ 'category/', RESOURCE_CONFIG);
	};
});
