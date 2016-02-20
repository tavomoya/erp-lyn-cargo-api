var q = require('q');
var AccountType = require('../models/accountType');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var accountType = new AccountType(app.db);
        accountType.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, AccountType);
}