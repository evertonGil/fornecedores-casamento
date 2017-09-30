var mongoose = require('mongoose');
var  model = mongoose.model('TipoFornecedor');
var logger = require('../services/logger');
var api = {};

api.lista = function(req, res){
	return model
			.find({})
			.then(function(tipo){
				res.json(tipo);
			}, function(error){
				logger.log('error', error);
				res.status(500).json(error);
			});
}
api.buscaPorNome = function(req, res){
	return model
			.find({"nome": req.params.id})
			.then(function(tipo){
				if(tipo == null) {
					var msg = `${req._remoteAddress} [${req._startTime}] "${req.method} ${req.url} HTTP/${req.httpVersion}" ${req.statusCode} (erro: Nome == null)`;
					logger.log('error', msg);
					res.status(404).json(tipo);
				}
				else{
					res.status(404).json(tipo);
				}
			}, function(error){
				logger.log('error', error);
				res.status(500).json(error);
			});
}

api.adiciona = function(req, res){
		return model
			.create(req.body)
			.then(function(tipo){
				logger.log('info', `item incluido na collection TipoFornecedor: ${tipo.nome}`);
				res.send(tipo);
			}, function(error){
				logger.log('error', error);
				res.status(500).json(error);
			});

}
module.exports = api;