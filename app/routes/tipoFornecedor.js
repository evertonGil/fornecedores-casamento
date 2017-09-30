var mongoose = require('mongoose');

module.exports = function(app){
	var api = app.api.tipoFornecedor;

	app.get('/v1/tipofornecedor', api.lista);
	app.post('/v1/tipofornecedor', api.adiciona);
	app.get('/v1/tipofornecedor/:nome', api.buscaPorNome);	

}
