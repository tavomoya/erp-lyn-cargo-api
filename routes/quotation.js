var q = require('q');
var Quotation = require('../models/quotation');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var quotation = new Quotation(app.db);
        quotation.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, Quotation);
}