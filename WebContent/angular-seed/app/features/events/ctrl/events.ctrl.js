'use strict';

angular.module('myapp.event', [])
		.controller('eventController', EventController)

		.filter(
				'propsFilter',
				function() {
					return function(items, props) {
						var out = [];

						if (angular.isArray(items)) {
							items.forEach(function(item) {
								var itemMatches = false;

								var keys = Object.keys(props);
								for (var i = 0; i < keys.length; i++) {
									var prop = keys[i];
									var text = props[prop].toLowerCase();
									if (item[prop].toString().toLowerCase()
											.indexOf(text) !== -1) {
										itemMatches = true;
										break;
									}
								}

								if (itemMatches) {
									out.push(item);
								}
							});
						} else {
							// Let the output be the input untouched
							out = items;
						}

						return out;
					};
				});

function EventController(eventService, categoryService, NgMap, mediaService, RESOURCE_DOMAIN_FRONTEND) {
	var ctrl = this;

	var error = 'ERROR';
	var city='ALL';
	ctrl.hasError = false;
	var refreshPage = function() {
		ctrl.event = {};
		ctrl.events = [];
		ctrl.categories = [];
		ctrl.googleAddressFlag = false;
		ctrl.hasError = false;
		ctrl.messages = [];
		ctrl.types = "['establishment']";
		ctrl.getEvents();
		ctrl.getCategories();
		ctrl.category = {};
		ctrl.medias = [];
		ctrl.media = {};
		ctrl.mediaThumbnail= {};

		// event attributes

		ctrl.event.eventName = '';
		//ctrl.event.mediaThumbnailByte = [];
		ctrl.event.eventDesc = '';
		ctrl.event.eventTags = '';
		ctrl.event.eventPublishUrl = '';
		ctrl.event.eventStartDate = '';
		ctrl.event.eventEndDate = '';
		ctrl.event.eventLocation = '';
		ctrl.event.eventGoogleAddress = '';
		ctrl.event.eventActiveFlag = false;
		ctrl.event.eventTermsConditions = '';
		ctrl.event.eventKind = '';
		ctrl.event.eventFaq = '';
		ctrl.event.eventLocation = '';
		ctrl.event.eventStartTime = '';
		ctrl.event.mediaUrlList = '';
		ctrl.event.eventEndTime = '';
		ctrl.event.eventThumbnail = '';
		ctrl.event.eventCategory = [];
		ctrl.event.eventAddress = {};
		ctrl.event.eventCreater = {};

	}

	ctrl.placeChanged = function() {
		ctrl.place = this.getPlace();
		console.log('location', ctrl.place.geometry.location);
		if (ctrl.place) {
			ctrl.map.setCenter(ctrl.place.geometry.location);
			ctrl.event.eventLocation = JSON
					.stringify(ctrl.place.geometry.location);
			ctrl.getAddressComponents(ctrl.place.address_components);
		} else {
			console.log('error logged while getting place from google map');
		}

	};

	ctrl.getAddressComponents = function(address) {
		// var out = _.filter(address, function(val){
		// return val;
		// }, bbb);
		address.forEach(function(element) {
			console.log(element);

		});

	};

	ctrl.createEvent = function(event) {
		event.mediaUrlList = ctrl.medias.toString();
		var promise = eventService.createEvent(event);

		promise.then(function(payload) {
			refreshPage();
		}, function(errorPayload) {
			ctrl.hasError = true;
			ctrl.messages.type = error;
			ctrl.messages.content = errorPayload.fieldErrors;

		})
	};

	// after saving the media with the directive
	ctrl.onMediaLoadCallback = function(mediaId) {
		ctrl.medias.push(ctrl.media.mediaName);
	};

	// after saving the media with the directive
	ctrl.onMediaLoadThumbnailCallback = function(mediaId) {
		ctrl.event.eventThumbnail = ctrl.mediaThumbnail.mediaThumbnailName;
	};

	ctrl.deleteEvent = function(eventPk) {
		var promise = eventService.deleteEvent(eventPk);
		promise.then(function(payload) {
			alert('event deleted');
			refreshPage();
		}, function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	ctrl.editEvent = function(event) {
		event.mediaUrlList = ctrl.medias.toString();
		var promise = eventService.editEvent(event);
		promise.then(function(payload) {
			refreshPage();
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	ctrl.prepareEditEvent = function(event) {
		ctrl.event = event;
	};

	ctrl.eventAddressTypeChange = function(value) {

		if (value == 'googleAddress') {
			ctrl.googleAddressFlag = true;

			ctrl.mapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApoR1xWREuIsdQNskFgmDGpTxONkab-Bc";
			NgMap.getMap().then(function(map) {
				console.log(map.getCenter());
				console.log('markers', map.markers);
				console.log('shapes', map.shapes);
			}, function(errorPayload) {
				console.error('can not load map' + errorPayload);
			});

			NgMap.getMap().then(function(map) {
				ctrl.map = map;
			});
		} else {
			ctrl.googleAddressFlag = false;
		}
	};

	ctrl.getEvents = function() {
		var promise = eventService.getEvents(city);
		promise.then(function(payload) {
			ctrl.events = payload.data;
			ctrl.events.forEach(function(element) {
				element.eventThumbnail = RESOURCE_DOMAIN_FRONTEND+ element.eventThumbnail;
			});
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})
	};


	ctrl.getCategories = function() {
		var promise = categoryService.getCategories();
		promise.then(function(payload) {
			ctrl.categories = payload.data;
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})
	};

	refreshPage();

}