'use strict';

var q = require('q');

// Class constructor
function Account (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Account",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "required": true
            },
            "accountNumber": {
                "type": "number",
                "required": true
            },
            "accountType": {
                "type": "object",
                "required": true
            }
        }
    };
};

//This is a test function
Account.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Account;