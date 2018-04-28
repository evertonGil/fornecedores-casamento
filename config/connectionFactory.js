var logger = require('../app/services/logger');

module.exports = function (uri) {
	var mongoose = require('mongoose');
	mongoose.Promise = require('bluebird');

	if (process.env.NODE_ENV == 'production') {

		var urlConect = process.env.MONGODB_URI;
		conectarEm(urlConect, "prod");
	}
	else {

		var urlConect = 'mongodb://' + uri;
		conectarEm(urlConect, "prod");
	}

	function conectarEm(urlConect, servidor) {

		var promise = mongoose.connect(urlConect, {
			useMongoClient: true,
		});

		promise.then(
			() => {
				console.log(`conectou no mongodb [${servidor}]`);
				logger.log('info', "conectou no mongodb");
			},
			e => {
				console.log(`Conexão em: [${servidor}] rejeitada por que:  ${e.message}`);
				logger.log('info', `Conexão rejeitada por que:  ${e.message}`);
				throw e;
			}
		);

		process.on('SIGINT', function () {
			mongoose.connection.close(function () {
				logger.log('info', 'Mongoose default connection disconnected through app termination');
				process.exit(0);
			});
		});
	}



}

