var q = require('q');
var Data = require('../models/data');
var util = require('../models/util');

module.exports = function (prefix, app, reference) {

	var success = util.success;
	var error = util.error;

    app.post(prefix + '/find', function (req, res) {
        new reference(app.db).data.find(req.body.obj)
        .then(success(res), error(res));
    });

    app.get(prefix + '/find/:id', function (req, res) {
        new reference(app.db).data.findById(req.params.id)
        .then(success(res), error(res));
    });

    app.post(prefix, function (req, res) {
        new reference(app.db).data.insert(req.body.obj)
        .then(success(res), error(res));
    });

    app.put(prefix, function (req, res) {
        new reference(app.db).data
        .update(req.body.qry, req.body.obj, req.body.opts)
        .then(success(res), error(res));
    });

    app.delete(prefix, function (req, res) {
        new reference(app.db).data.delete(req.body.obj)
        .then(success(res), error(res));
    });

    app.post(prefix + '/count', function (req, res) {
        new reference(app.db).data
        .count(req.body.obj, req.body.opts)
        .then(success(res), error(res));
    });
}