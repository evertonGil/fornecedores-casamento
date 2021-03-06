var mongoose = require('mongoose');
var schema = mongoose.Schema({
	nome: {
		type: String,
		required:true
	},
	qtdMax:{
		type: Number,
		required:true
	},
	local:{
		type: String,
		required:true
	},
	tipo:{
		type: String,
		required:true
	},
	observacoes:{
		type: String,
	},
	link:{
		type: String,
	},
	cardapios: {
		type: Array,
	},
	anexos: {
		type: Array,
	}
});
console.log("schema Fornecedor registrado");
mongoose.model('Fornecedores', schema);

