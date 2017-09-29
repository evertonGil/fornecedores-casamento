var logger = require('../app/services/logger');

module.exports = function(uri){
	var mongoose = require('mongoose');
	mongoose.Promise = require('bluebird');

	

	if(process.env.NODE_ENV == 'production'){
		var urlConect = process.env.MONGODB_URI;
		
		console.log(urlConect);

		var promise = mongoose.connect(urlConect, {
		  useMongoClient: true,
		});

		promise.then(function(){
			console.log("conectou no mongodb");
			logger.log('info', "conectou no mongodb");
		},
		function(e){
			console.log(`Conexão rejeitada por que:  ${e.message}`);
			logger.log('info', `Conexão rejeitada por que:  ${e.message}`);
			throw e;
		});

		process.on('SIGINT', function() {  
		 	mongoose.connection.close(function () { 
		    logger.log('info', 'Mongoose default connection disconnected through app termination'); 
		    process.exit(0); 
		  });
		});
	}


	if(process.env.NODE_ENV == 'development'){
		
		var promise = mongoose.connect('mongodb://'+uri, {
		  useMongoClient: true,
		});
		promise.then(function(){
			console.log("conectou no mongodb");
		},
		function(e){
		console.error("Conexão rejeitada por que: ", e.message);
		//process.exit(1);
		throw e;
		//return e;
		});

		process.on('SIGINT', function() {  
		 	mongoose.connection.close(function () { 
		    console.log('Mongoose default connection disconnected through app termination'); 
		    process.exit(0); 
		  });
		});
	}

	

}

