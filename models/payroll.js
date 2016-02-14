'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Payroll (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Payroll",
        "type": "object",
        "properties": {
            "paymentFrequency": {
                "type": "string",
                "required": true
            },
            "status": {
                "type": "number",
                "required": true
            },
            "accountNumber": {
                "type": "number",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'PAYROLL', this.schema);
};

//This is a test function
Payroll.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Payroll;