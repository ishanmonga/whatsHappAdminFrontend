angular.module('myApp.whDirectives')
.directive('whErrorMessage', function() {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	    	'messages': '=messages',
	    	'type':'=type'
	    },
	    templateUrl: 'angular-seed/app/common/directives/errorMessge.html'
	  };
});