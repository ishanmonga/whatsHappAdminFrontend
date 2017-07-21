'use strict';

angular.module('myapp.category', []).controller('categoryController',
		CategoryController);

function CategoryController($location, categoryService, $scope) {
	var error = 'ERROR'

	var refreshPage = function() {
		this.category = {};
		this.category.categoryName = '';
		this.category.categoryDesc = '';
		this.categories = [];
		this.getCategories();
		this.hasError = false;
		this.messages = [];
	}.bind(this);

	// for creating new user
	this.createCategory = function(category) {
		var promise = categoryService.createCategory(category);
		promise.then(function(payload) {
			refreshPage();
		}, function(errorPayload) {
			this.hasError = true;
			this.messages.type = error;
			this.messages.content = errorPayload.fieldErrors;

		}.bind(this))
	};

	this.deleteCategory = function(categoryPk) {
		var promise = categoryService.deleteCategory(categoryPk);
		promise.then(function(payload) {
			alert('category deleted');
			refreshPage();
		}, function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	this.editCategory = function(category) {
		var promise = categoryService.editCategory(category);
		promise.then(function(payload) {
			refreshPage();
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})

	};

	this.prepareEditCategory = function(category) {
		this.category = category;
	}.bind(this);

	this.getCategories = function() {
		var promise = categoryService.getCategories();
		promise.then(function(payload) {
			this.categories = payload.data;
		}.bind(this), function(errorPayload) {
			console.error('authentication failed' + errorPayload);
		})
	};

	refreshPage();

}