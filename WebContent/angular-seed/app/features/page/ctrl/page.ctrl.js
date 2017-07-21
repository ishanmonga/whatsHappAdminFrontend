'use strict';

angular.module('myapp.page', []).controller('pageController',
		PageController);

function PageController($location, pageService, $scope, textAngularManager) {
	//var cat=this;
	var error='ERROR'
	this.hasError = false;
	var refreshPage = function() {
		this.page = {};
		this.page.pageName = '';
		this.page.pageContent = '';
		this.page.pageUrl = '';
		this.pages = [];
		this.getPages();
		this.hasError = false;
		this.messages=[];
	}.bind(this);

	//	for creating new user 
	this.createPage = function(page) {
		var promise = pageService.createPage(page);
		promise.then(function(payload) {
			refreshPage();
		}, function(errorPayload) {
			this.hasError = true;
			this.messages.type=error;
			this.messages.content=errorPayload.fieldErrors;

		}.bind(this))
	};

	this.deletePage = function(pagePk) {
		var promise = pageService.deletePage(pagePk);
		promise.then(function(payload) {
			alert('page deleted');
			refreshPage();
		}, function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	this.editPage = function(page) {
		var promise = pageService.editPage(page);
		promise.then(function(payload) {
			refreshPage();
		}.bind(this), function(errorPayload) {
			console.error('edit failed' + errorPayload);
		})

	};

	this.prepareEditPage = function(page) {
		this.page = page;
	};

	this.getPages = function() {
		var promise = pageService.getPages();
		promise.then(function(payload) {
			this.pages = payload.data;
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})
	};

	refreshPage();

}