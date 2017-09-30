var mongoose = require('mongoose');
var schema = mongoose.Schema({
	nome:{
		type: String,
		required:true
	}
});
mongoose.model('LocalFornecedor', schema, 'localfornecedor');