var q = require('q');
var Document = require('../models/document');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var documents = new Document(app.db);
        documents.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, Document);
}