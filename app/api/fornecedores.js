var mongoose = require('mongoose');
var  model = mongoose.model('Fornecedores');
var logger = require('../services/logger');
var api = {};

api.lista = function(req, res){
		console.log(req.usuario);

		return model
			.find({'usuario.usuarioId' : req.usuario.usuarioId})
			.sort({nome: 'asc'})
			.then(function(fornecedores){
				res.json(fornecedores);
			}, function(error){
				logger.log('error', error);
				res.status(500).json(error);
			});
}

api.buscaPorId = function(req, res){
		return model
			.findById(req.params.id)
			.then(function(fornecedor){
				if(fornecedor == null) {
					var msg = `${req._remoteAddress} [${req._startTime}] "${req.method} ${req.url} HTTP/${req.httpVersion}" ${req.statusCode} (erro: Id == null)`;
					logger.log('error', msg);
					res.status(404).json(fornecedor);
				}
				else{
					res.json(fornecedor);
				}
				
			}, function(error){
				logger.log('error', error);
				res.status(404).send(error);
			});
}

api.adiciona = function(req, res){
		req.body.usuario = {'usuarioId' : req.usuario.usuarioId,'login' : req.usuario.login};
		model
			.create(req.body)
			.then(function(fornecedor){
				logger.log('info', `item incluido na collection Fornecedores: ${fornecedor._id}`);
				res.send(fornecedor);
			}, function(error){
				logger.log('error', error);
				res.status(500).json(error);
			});

}
api.deleta = function(req, res){
	model
	.remove({_id : req.params.id})
	.then(function(){
		logger.log('info', `item excluido na collection Fornecedores: ${req.params.id}`);
		res.sendStatus(204)
	}, function(error){
		//console.log(error)
		logger.log('error', error);
		res.status(500).json(error);
	})
}
api.atualizaPorId = function(req, res){

	req.body.usuario = {'usuarioId' : req.usuario.usuarioId,'login' : req.usuario.login};

	model
	.findByIdAndUpdate(req.params.id, req.body)
	.then(function(fornecedor){
		logger.log('info', `item atualizado na collection Fornecedores: ${req.params.id}`);
		res.json(fornecedor);
	}, function(error){
		//console.log(error);
		logger.log('error', error);
		res.status(500).json(error);
	})
}
module.exports = api;