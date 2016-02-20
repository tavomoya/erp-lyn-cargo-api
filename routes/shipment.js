var q = require('q');
var Shipment = require('../models/shipment');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var shipment = new Shipment(app.db);
        shipment.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, Shipment);
}