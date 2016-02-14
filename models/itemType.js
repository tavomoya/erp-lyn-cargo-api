'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function ItemType (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/ItemType",
        "type": "object",
        "properties": {
            "description": {
                "type": "string",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'ITEMTYPE', this.schema);
};

//This is a test function
ItemType.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = ItemType;