var mongoose = require('mongoose');

module.exports = function(app){
	var api = app.api.localFornecedor;

	app.get('/v1/localfornecedor', api.lista);
	app.post('/v1/localfornecedor', api.adiciona);
	app.get('/v1/localfornecedor/:nome', api.buscaPorNome);	

}
