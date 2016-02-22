'use strict';

var domain = require('domain').create();
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var config = require('./config').init(app);

domain.on('error', function (error) {

	// Error Object
	var _error = {
		date: new Date(),
		message: error.message,
		stack: error.stack
	};

	console.log('[*] Error: ',error.message);
	console.log('[*] Stack: ',error.stack);

	MongoClient.connect('mongodb://' + config.DB_URL, function (err, pDB) {
		try {
			db.get('LOGERROR').insert(_error, function (err, errorLog) {
				if (err)
					throw err;
				console.log("[*] Log saved on " + filePath);
			});
		}
		catch (err) {
			// Log saved into ./log folder
			console.log('[*] Error while saving error: ', error);
			var fs = require('fs');
			var filePath = __dirname + "/log/log-" + new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate() + ".txt";
			var txtLineError = _error.date.toISOString() + "|" + _error.message + "|" + _error.stack + "\n";
			fs.appendFile(filePath, txtLineError, function (errorLog) {
				console.log("[*] Log saved on " + filePath);
			});
		}
	});
});

domain.run(function () {
	var	jwt = require('jsonwebtoken'),
		auth = require('express-jwt'),
		http = require('http'),
		validator = require('express-validator'),
		cron = require('cron').CronJob,
		path = require('path'),
		config = require('./config').init(app),//
		q = require('q'),
		dbMongo = {},
		secret = "asd243131",
		Job = require('./models/job'),
		Busboy  = require('busboy');

	function getdbMongo() {
		var deferred = q.defer();
		MongoClient.connect('mongodb://' + config.DB_URL, function (err, pDB) {
			if (err) {
				deferred.reject('ERROR', err);
			} else {
				dbMongo = pDB;
				deferred.resolve(dbMongo);
			}
		});
		return deferred.promise;
	}

	app.configure(function () {
		//app.use(express.logger());
		app.use(express.methodOverride());
		app.use('/api', auth({secret: secret }));
		app.use(express.json({limit: '50mb'}));
		app.use(express.urlencoded({limit: '50mb'}));
		app.use(validator());
		app.use(app.router);
		app.use(express.responseTime());
		app.use(express.compress());
		app.use(express.favicon(__dirname + '/' + config.PUBLIC_PATH + '/img/favicon.ico'));
		app.use('/', express.static(path.join(__dirname, config.PUBLIC_PATH)));
		app.use('/images', express.static(path.join(__dirname, 'images')));
		app.use('/bower_components', express.static(path.join(__dirname, 'public/bower_components')));
	});

	app.configure('development', function () {
		app.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));
	});

	app.configure('production', function () {
		app.use(express.errorHandler());
	});

	//WebServices
	require('./routes/account')('/account', app);
	require('./routes/accountType')('/accountType', app);
	require('./routes/document')('/document', app);
	require('./routes/entity')('/entity', app);
	require('./routes/item')('/item', app);
	require('./routes/itemType')('/itemType', app);
	require('./routes/payroll')('/payroll', app);
	require('./routes/quotation')('/quotation', app);
	require('./routes/shipment')('/shipment', app);
	require('./routes/shipmentType')('/shipmentType', app);


	// Routes Principales
	app.get('/routes', function (req, res) {
		res.send(app.routes);
	});

	/*
		Need to get the MongoDB instance before 
		starting the API so I don't get any errors
		while executing methods in the models
		and/or routes. Start Server after this
	*/
	getdbMongo()
	.then(function (data) {
		app.db = data;
		var job = new Job(app.db)
		job.dollarsToPesos();
		job.euroToPesos();
		
		http.createServer(app).listen(config.APP_PORT, function () {
			console.log("\n[*] Server Listening on port %d", config.APP_PORT);
		});

	})
	.fail(function (err) {});

});
