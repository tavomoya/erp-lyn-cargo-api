'use strict';

var d = require('domain').create();

d.on('error', function (er) {
	var express = require('express'),
		app = express(),
		config = require('./config').init(app),
		MongoClient = require('mongodb').MongoClient;

	console.log('----ERROR----');
	console.error(er);
	console.error(er.message);
	console.error(er.stack);
	
	var error = {
		date: new Date(),
		message: er.message,
		stack: er.stack
	};

	MongoClient.connect('mongodb://' + config.DB_URL, function (err, pDB) {
		if (err) {
			console.log('Cannot connect to Mongo', err);
		} else {
			var db = pDB;
			db.collection('LOGERROR')
			.insert(error, function (err, succ) {
				if (succ) {
					//Poner error en archivo log-dia
					var fs = require('fs');
					var urlfs = __dirname + "/log/log-" + new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate() + ".txt";
					var txtError = "Fecha: " + error.date + ", Mensaje: " + error.message + ", Stack: " + error.stack + "\n";
					fs.appendFile(urlfs, txtError, function (err) {
						if (err) {
							console.log(err);
						} else {
							console.log("The log was saved in " + urlfs);
						}
					});
				}
			})

		}
	});
});

d.run(function () {
	var express = require('express'),
		jwt = require('jsonwebtoken'),
		auth = require('express-jwt'),
		http = require('http'),
		validator = require('express-validator'),
		cron = require('cron').CronJob,
		path = require('path'),
		app = express(),
		config = require('./config').init(app),
		MongoClient = require('mongodb').MongoClient,
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
		app.use('/api', auth({
			secret: secret
		}));
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
	// app.db = db;

	/*
		Need to get the MongoDB instance before 
		starting the API so I don't get any errors
		while executing methods in the models
		and/or routes. Start Server after this
	*/
	getdbMongo().then(function (data) {
		app.db = data;
		var job = new Job(app.db)
		job.dollarsToPesos();
		job.euroToPesos();
		
		http.createServer(app).listen(config.APP_PORT, function () {
			console.log("\n[*] Server Listening on port %d", config.APP_PORT);
		});

	}, function (err) {});

});
