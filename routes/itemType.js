var q = require('q');
var ItemType = require('../models/itemType');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var itemType = new ItemType(app.db);
        itemType.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, ItemType);
}