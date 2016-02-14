'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Shipment (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Shipment",
        "type": "object",
        "properties": {
            "quotationId": {
                "type": "number"
            },
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
            }
        }
    };

    this.data = new Data(db, 'SHIPMENT', this.schema);
};

//This is a test function
Shipment.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Shipment;