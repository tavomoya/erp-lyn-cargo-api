'use strict';

var q = require('q');

// Class constructor
function Item (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Item",
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "required": true
            },
            "name": {
                "type": "number",
                "required": true
            },
            "itemType": {
                "type": "object",
                "required": true
            },
            "price": {
                "type": "object",
                "required": true
            }
        }
    };
};

//This is a test function
Item.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Item;