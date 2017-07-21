//angular.module('myApp.whDirectives', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
var app =angular.module('myApp.whDirectives')

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});

// Google Map
app.directive('googleMap', function($rootScope, lazyLoadApi) {

  return {
    restrict: 'CA', // restrict by class name
    scope: {
      mapId: '@id', // map ID
      lat: '@', // latitude
      long: '@' // longitude
    },
    link: function(scope, element, attrs) {
      var location = null;
      var map = null;
      var mapOptions = null;

      // Check if latitude and longitude are specified
      if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)) {
        // Loads google map script
        lazyLoadApi.then( initializeMap )
      }
      
      // Initialize the map
      function initializeMap() {
        location = new google.maps.LatLng(scope.lat, scope.long);

        mapOptions = {
          zoom: 12,
          center: location
        };

        map = new google.maps.Map(element[0], mapOptions);

        new google.maps.Marker({
          position: location,
          map: map,
        });
      }
    }
  };
});

app.service('lazyLoadApi', function lazyLoadApi($window, $q) {
  function loadScript() {
    console.log('loadScript')
      // use global document since Angular's $document is weak
    var s = document.createElement('script')
    s.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyApoR1xWREuIsdQNskFgmDGpTxONkab-Bc&sensor=false&language=en&callback=initMap'
    document.body.appendChild(s)
  }
  var deferred = $q.defer()

  $window.initMap = function() {
    deferred.resolve()
  }

  if ($window.attachEvent) {
    $window.attachEvent('onload', loadScript)
  } else {
    $window.addEventListener('load', loadScript, false)
  }

  return deferred.promise
});