var q = require('q');
var Payroll = require('../models/payroll');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var payroll = new Payroll(app.db);
        payroll.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, Payroll);
}