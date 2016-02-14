'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function AccountType (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/AccountType",
        "type": "object",
        "properties": {
            "description": {
                "type": "string",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'ACCOUNTTYPE', this.schema);
};

//This is a test function
AccountType.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = AccountType;