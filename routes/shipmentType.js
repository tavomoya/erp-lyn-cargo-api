var q = require('q');
var ShipmentType = require('../models/shipmentType');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var shipmentType = new ShipmentType(app.db);
        shipmentType.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, ShipmentType);
}