var q = require('q');
var Account = require('../models/account');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var account = new Account(app.db);
        account.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, Account);
}