var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var  model = mongoose.model('Usuario');
var logger = require('../services/logger');
var api = {};


module.exports = function(app) {
		
	api.autentica = function(req, res){
		console.log( req.body.login, req.body.senha);
		//console.log('collection', model.prototype.collection);
		return model
		.findOne({login: req.body.login, senha: req.body.senha})
		.then(function(user){
			console.log(user);
			if(!user){
				console.log("Login e senha são invalidos");
				
				res.sendStatus(401);
			}
			else{
				var token = jwt.sign({usuarioId:user._id, login:user.login}, app.get('secret'), {
					expiresIn: 84600
				});

				console.log('token cirado')
				res.set('x-access-token', token);
				res.send({});
			}

		},
		function(error){
			console.log("Login e senha são invalidos");
			res.senStatus(401);
		});
	}
	api.verificatoken = function(req, res, next){
		var token = req.headers['x-access-token'];
		if(token){
			jwt.verify(token, app.get('secret'), function(err, decoded){
				if(err){
					res.sendStatus(401);
				}
				console.log('token autorizado enviado para o next');
				req.usuario = decoded;
				next();
			});
		}else{
			console.log('token não enviado');
			res.sendStatus(401);
		}
		
	}

	return api;
}