angular
    .module('myapp.event').service('eventService', function($http, $q, RESOURCE_DOMAIN, RESOURCE_CONFIG) {

	this.createEvent = function(catData) {
		var data = angular.fromJson(angular.toJson(catData));
	return	$http.post(RESOURCE_DOMAIN+ 'event', data, RESOURCE_CONFIG);
	};
	

	this.editEvent = function(event) {
		var data = angular.fromJson(angular.toJson(event));
		return $http.put(RESOURCE_DOMAIN+ 'event', data, RESOURCE_CONFIG);
	};
	
	this.deleteEvent = function(catId) {
		return $http.delete(RESOURCE_DOMAIN+ 'event/'+ catId, RESOURCE_CONFIG);
	};
	
	this.getEvent = function(catId) {
		return	$http.get(RESOURCE_DOMAIN+ 'event/'+ catId, RESOURCE_CONFIG);
	};
	
	this.getEvents = function(city) {
		return $http.get(RESOURCE_DOMAIN+ 'event/city/'+ city, RESOURCE_CONFIG);
	};
});
