var app= angular.module('myApp.whDirectives', ['ngFileUpload', 'ngImgCrop']);

app.controller('mediaController', ['$scope', 'Upload', '$timeout','RESOURCE_CONFIG', function ($scope, Upload, $timeout, RESOURCE_CONFIG) {
	$scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: 'http://localhost:8080/WhatsHappBackend/rest/media',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
                $scope.result = response.data;
                $scope.properties.mediaName=response.data.mediaName;
                $scope.onMediaLoadCallback($scope.properties);
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
}]).

//inject ngFileUpload and ngImgCrop directives and services.

controller('mediaControllerThumbnail', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: 'http://localhost:8080/WhatsHappBackend/rest/media',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
                $scope.properties.mediaThumbnailName=response.data.mediaName;
    	        $scope.onMediaLoadCallback($scope.properties);
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
}]).
service('mediaService', function($http, $q, RESOURCE_DOMAIN, RESOURCE_CONFIG) {

	

	this.editMedia = function(media) {
		var data = angular.fromJson(angular.toJson(media));
		return $http.put(RESOURCE_DOMAIN+ 'media', data, RESOURCE_CONFIG);
	};
	
	this.deleteMedia = function(catId) {
		return $http.delete(RESOURCE_DOMAIN+ 'media/'+ catId, RESOURCE_CONFIG);
	};
	
	
	this.getMedia = function(catId) {
		return $http.get(RESOURCE_DOMAIN+ 'media/'+ catId, RESOURCE_CONFIG);
	};
	
	this.getCategories = function() {
		return	$http.get(RESOURCE_DOMAIN+ 'media/', RESOURCE_CONFIG);
	};
});


	app.directive('whMediaUpload', function() {
	return {
		scope : {
			properties:'=',
			onMediaLoadCallback:'&onMediaLoadCallback'
		},
		restrict : 'EA',
		controller : 'mediaController',
		controllerAs : 'ctrl',
		templateUrl : 'angular-seed/app/common/uploadFiles/fileUpload.html'
	};
});
	
	app.directive('whMediaUploadThumbnail', function() {
		return {
			scope : {
				properties:'=',
				onMediaLoadCallback:'&onMediaLoadCallback'
			},
			restrict : 'EA',
			controller : 'mediaControllerThumbnail',
			controllerAs : 'ctrl',
			templateUrl : 'angular-seed/app/common/uploadFiles/fileUploadThumbnail.html'
		};
	});