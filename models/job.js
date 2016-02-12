'use strict';

var q = require('q');
var key = require('../keys');
var converter = require('currency-converter')({CLIENTKEY: key})
var cron = require('cron').CronJob;

// Class constructor
function Job (db) {
    this.db = db;
};

//Job to get Dollar's rate
Job.prototype.dollarsToPesos = function () {
    var _this = this;
    var collection = _this.db.collection('RATE');

    var _job = new cron('0 0 0 * * *',
    function () {
        var startDate = new Date();
        console.log('[*] Cron job started');
        console.log('[*] dollarsToPesos');
        console.log('[*] A las: ' + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds());
        console.log('[*] El dia: ' + startDate.getDate() + "/" + (parseInt(startDate.getMonth()) + 1) + "/" + startDate.getFullYear());
       
        converter.rates('USD', 'DOP')
        .then(function (rate) {
            collection.insert({
                from: 'USD',
                to: 'DOP',
                rate: rate
            }, function (err, r) {
                if (err) {
                    console.log('there was an error');
                };

                if (r) {
                    var endDate = new Date();
                    console.log('[*] Cron job finished succesfully');
                    console.log('[*] dollarsToPesos');
                    console.log('[*] A las: ' + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds());
                    console.log('[*] El dia: ' + endDate.getDate() + "/" + (parseInt(endDate.getMonth()) + 1) + "/" + endDate.getFullYear());
                    return;
                } else {
                    console.log('there was an error');
                };
            })
        });

    }, null, true);
    _job.start();
};

//Job to get Euro's rate
Job.prototype.euroToPesos = function () {
    var _this = this;
    var collection = _this.db.collection('RATE');

    var _job = new cron('0 0 0 * * *',
    function () {
        var startDate = new Date();
        console.log('[*] Cron job started');
        console.log('[*] euroToPesos');
        console.log('[*] A las: ' + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds());
        console.log('[*] El dia: ' + startDate.getDate() + "/" + (parseInt(startDate.getMonth()) + 1) + "/" + startDate.getFullYear());
       
        converter.rates('EUR', 'DOP')
        .then(function (rate) {
            collection.insert({
                from: 'EUR',
                to: 'DOP',
                rate: rate
            }, function (err, r) {
                if (err) {
                    console.log('there was an error');
                };

                if (r) {
                    var endDate = new Date();
                    console.log('[*] Cron job finished succesfully');
                    console.log('[*] euroToPesos');
                    console.log('[*] A las: ' + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds());
                    console.log('[*] El dia: ' + endDate.getDate() + "/" + (parseInt(endDate.getMonth()) + 1) + "/" + endDate.getFullYear());
                    return;
                } else {
                    console.log('there was an error');
                };
            })
        });

    }, null, true);
    _job.start();
};


// Make the class visible
module.exports = Job;