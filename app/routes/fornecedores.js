var mongoose = require('mongoose');

module.exports = function(app) {
	var api = app.api.fornecedores;

	var  model = mongoose.model('Fornecedores');

	app.get('/v1/fornecedores', api.lista);
	app.get('/v1/fornecedores/:id', api.buscaPorId);
	app.post('/v1/fornecedores', api.adiciona);
	app.put('/v1/fornecedores/:id', api.atualizaPorId);
	app.delete('/v1/fornecedores/:id', api.deleta);


}