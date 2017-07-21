'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myapp.core',
  'myApp.constant',
  'myapp.user',
  'myapp.login',
  'myapp.category',
  'myapp.dashboard',
  'myapp.event',
  'myapp.feed',
  'myApp.version',
  'myApp.whDirectives',
  'myapp.page'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
$locationProvider.hashPrefix('!');

  $routeProvider.
	when('/login', {
		templateUrl : 'angular-seed/app/features/user/pages/login.html',
		controller : 'loginController'
	}).
	when('/create', {
		templateUrl : 'angular-seed/app/features/user/pages/userRegister.html',
		controller : 'userController'
	}).
	when('/user', {
		templateUrl : 'angular-seed/app/features/user/pages/userDashboard.html',
		controller : 'userController'
	}).
	when('/dashboard', {
		templateUrl : 'angular-seed/app/features/dashboard/pages/mainDashboard.html',
		controller : 'dashboardController'
	}).
	when('/events', {
		templateUrl : 'angular-seed/app/features/events/pages/eventDashboard.html',
		controller : 'eventController'
	}).
	when('/category', {
		templateUrl : 'angular-seed/app/features/category/pages/categoryDashboard.html',
		controller : 'categoryController'
	}).
	when('/feed', {
		templateUrl : 'angular-seed/app/features/feed/pages/feed.html',
		controller : 'feedController'
	}).
	when('/page', {
		templateUrl : 'angular-seed/app/features/page/pages/page.html',
		controller : 'pageController'
	}).
	
  otherwise({redirectTo: '/login'});
}]).run(function($rootScope, $location, $cookies, $http) { 
	
//	 $rootScope.globals = $cookies.getObject('globals') || {};
//     if ($rootScope.globals.currentUser) {
//         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
//     }
//
//     $rootScope.$on('$locationChangeStart', function (event, next, current) {
//    	 $rootScope.globals = $cookies.getObject('globals') || {};
//         // redirect to login page if not logged in and trying to access a restricted page
//         var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
//         var loggedIn = $rootScope.globals.currentUser;
//         if (restrictedPage && !loggedIn) {
//             $location.path('/login');
//         }
//     });
 
	});
