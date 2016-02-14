'use strict';

exports.success = function (res) {
	return function (f) {
		res.send(200, f);
	};
};

exports.error = function (res) {
	return function (f) {
		res.send(510, f);
	};
};