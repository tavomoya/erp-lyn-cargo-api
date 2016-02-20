'use strict';

var q = require('q');
var JsonSchema = require('jsonschema').Validator;

// Class constructor

function Data (db, collection, schema) {
	this.db = db;
	this.collection = db.collection(collection);
	this.schema = schema;
};

// Private functions

function handleResponse (deferred, message) {
	return function (err, data) {
		if (err) {
			deferred.reject(err);
		};

		if (!data) {
			deferred.reject({
				error: new Error('There was an unknown error. Check server'),
				message: ''
			});
		} else {
			deferred.resolve(data);
		};
	};
};

function validateSchema (deferred, object, schema) {
	if (!schema) {
		throw new Error ('Schema is not defined');
	};

	var validated = new JsonSchema().validate(object, schema);

	if (validated.errors.length > 0) {
		deferred.reject(validated.errors);
	} else {
		return true
	};
	return false;
};


// Public functions

Data.prototype.find = function(query) {
	var deferred = q.defer();
	var query = (typeof query === 'string') ? JSON.parse(query) : query;

	this.collection.find(query)
	.toArray(handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.findById = function(id) {
	var deferred = q.defer();
	var query = {
		_id: id
	};

	this.collection.findOne(query, {}, 
		handleResponse(deferred));	

	return deferred.promise;
};

Data.prototype.insert = function (object) {
	var deferred = q.defer();
	var _this = this;
	object.createdDate = new Date();

	if (validateSchema(deferred, object, _this.schema)) {
		_this.collection.insert(object, 
			handleResponse(deferred))
	};

	return deferred.promise;
};

Data.prototype.update = function(query, updObject, options) {
	var deferred = q.defer();
	var _options = (!options) ? {} : options;

	this.collection.update(query, updObject, _options, 
		handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.delete = function(query) {
	var deferred = q.defer();

	this.collection.deleteOne(query, 
		handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.count = function(query, options) {
	var deferred = q.defer();
	var _options = (!options) ? {} : options;

	this.collection.count(query, _options, 
		handleResponse(deferred));

	return deferred.promise;
};

// Make the class visible
module.exports = Data;