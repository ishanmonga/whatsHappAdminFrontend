'use strict';

angular.module('myapp.feed', []).controller('feedController', FeedController);

function FeedController($location, feedService, $scope, NgMap) {
	var ctrl = this;
		//var autocomplete = new google.maps.places.Autocomplete(input);
		ctrl.mapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApoR1xWREuIsdQNskFgmDGpTxONkab-Bc";
		 NgMap.getMap().then(function(map) {
		 console.log(map.getCenter());
		 console.log('markers', map.markers);
		 console.log('shapes', map.shapes);
		 }, function(errorPayload) {
		 console.error('can not load map' + errorPayload);
		 });
	
		ctrl.types = "['establishment']";
		
		ctrl.placeChanged = function() {
		 ctrl.place = this.getPlace();
		// console.log('location', ctrl.place.geometry.location);
			ctrl.map.setCenter(ctrl.place.geometry.location);
			ctrl.feed.feedLocation=JSON.stringify(ctrl.place.geometry.location);
		};
	
		NgMap.getMap().then(function(map) {
			ctrl.map = map;
		});

	var error = 'ERROR'
	ctrl.hasError = false;
	var refreshPage = function() {
		ctrl.media = {};
		ctrl.medias = [];
		ctrl.feed = {};
		ctrl.feed.feedMessage = '';
		ctrl.feed.feedHeading = '';
		ctrl.feeds = [];
		ctrl.getFeeds();
		ctrl.hasError = false;
		ctrl.messages = [];
		ctrl.feed.feedAddress='';
		ctrl.feed.feedMediaUrlList='';
		ctrl.feed.feedLocation='';
		ctrl.feedCity='ALL';
	}

	// for creating new user
	ctrl.createFeed = function(feed) {
		feed.feedMediaUrlList = ctrl.medias.toString();
		var promise = feedService.createFeed(feed);
		promise.then(function(payload) {
			refreshPage();
		}, function(errorPayload) {
			ctrl.hasError = true;
			ctrl.messages.type = error;
			ctrl.messages.content = errorPayload.fieldErrors;

		})
	};

	ctrl.deleteFeed = function(feedPk) {
		var promise = feedService.deleteFeed(feedPk);
		promise.then(function(payload) {
			alert('feed deleted');
			refreshPage();
		}, function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	ctrl.editFeed = function(feed) {
		var promise = feedService.editFeed(feed);
		promise.then(function(payload) {
			refreshPage();
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	ctrl.prepareEditFeed = function(feed) {
		ctrl.feed = feed;
	};
	
	// after saving the media with the directive
	ctrl.onMediaLoadCallback = function(mediaId) {
		ctrl.medias.push(ctrl.media.mediaName);
	};

	ctrl.getFeeds = function() {
		var promise = feedService.getFeeds(ctrl.feedCity);
		promise.then(function(payload) {
			ctrl.feeds = payload.data;
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})
	};

	refreshPage();

}