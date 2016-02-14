'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Document (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Document",
        "type": "object",
        "properties": {
            "entity": {
                "type": "object",
                "required": true
            },
            "status": {
                "type": "number",
                "required": true
            },
            "shipmentId": {
                "type": "number",
                "required": true
            },
            "date": {
                "type": "date",
                "required": true
            },
            "price": {
                "type": "double",
                "required": true
            },
            "creditDays": {
                "type": "number",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'DOCUMENT', this.schema);
};

//This is a test function
Document.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Document;