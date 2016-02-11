'use strict';

var q = require('q');

// Class constructor
function ShipmentType (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/ShipmentType",
        "type": "object",
        "properties": {
            "description": {
                "type": "string",
                "required": true
            }
        }
    };
};

//This is a test function
ShipmentType.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = ShipmentType;