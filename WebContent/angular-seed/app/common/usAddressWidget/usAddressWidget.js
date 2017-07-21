angular.module('myApp.whDirectives')
.directive('whUsAddress', function() {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	    	'address': '='
	    },
	    templateUrl: 'angular-seed/app/common/usAddressWidget/usAddressWidget.html'
	  };
});