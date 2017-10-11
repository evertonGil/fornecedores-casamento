var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var  model = mongoose.model('Usuario');
var logger = require('../services/logger');
var api = {};

api.autentica = function(req, res){
	return model
	.findOne({login: req.body.login, senha: req.body.senha})
	.then(function(usuario){
		if(!usuario){
			console.log("acesso não autorizado");
			res.senStatus(401);
		}
		else{

		}

	},
	function(error){

	});
}
api.verificatoken = function(req, res){

}



module.exports = api;