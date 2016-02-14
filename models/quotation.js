'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Quotation (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Quotation",
        "type": "object",
        "properties": {
            "clientId": {
                "type": "number",
                "required": true
            },
            "agentId": {
                "type": "number",
                "required": true
            },
            "transporterId": {
                "type": "number",
                "required": true
            },
            "shipmentType": {
                "type": "object",
                "required": true
            },
            "consignatorExporter": {
                "type": "string",
                "required": true
            },
            "status": {
                "type": "number",
                "required": true
            },
            "from": {
                "type": "string",
                "required": true
            },
            "to": {
                "type": "string",
                "required": true
            },
            "weight": {
                "type": "number"
            },
            "packagesQuantity": {
                "type": "number"
            },
            "volume": {
                "type": "number"
            },
            "merchDescription": {
                "type": "string"
            },
            "item": {
                "type": "object"
            },
            "price": {
                "type": "double",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'QUOTATION', this.schema);
};

//This is a test function
Quotation.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Quotation;