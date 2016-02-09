'use strict';

var config = {
	development : {
		PUBLIC_PATH: 'public/app',
		DB_URL : 'localhost:27017/lyn_cargo',
		APP_PORT : process.env.PORT || 9000,
		REP_URL: 'http://localhost:3000'
	},
	production : {
		PUBLIC_PATH: 'public/app',
		DB_URL : 'localhost:27017/lyn_cargo',
		APP_PORT : process.env.PORT || 9000,
		REP_URL: 'http://localhost:3000'
	}
};

var mode = '';
function getEnv() {
	return config[mode];
}
function init(app) {
	mode = app.get('env');
	return config[mode];
}
exports.getEnv = getEnv;
exports.init = init;