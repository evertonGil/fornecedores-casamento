'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fornecedor = function () {
	function Fornecedor(id, nome, qtdMax, local, tipo, observacoes, listaCardapios, link) {
		_classCallCheck(this, Fornecedor);

		this._id = id ? id : '';
		this.nome = nome ? nome : '';
		this.qtdMax = qtdMax ? parseFloat(qtdMax) : 0;
		this.local = local ? local : '';
		this.tipo = tipo ? tipo : '';
		this.observacoes = observacoes ? observacoes : '';
		this.link = link ? link : '';
		//this.cardapios = listaCardapios ? listaCardapios : [];
		this.cardapios = listaCardapios ? new Cardapios(listaCardapios.lista) : new Cardapios();
	}

	_createClass(Fornecedor, [{
		key: 'setaValores',
		value: function setaValores(id, nome, qtdMax, local, tipo, observacoes, listaCardapios, link) {
			this._id = id ? id : '';
			this.nome = nome ? nome : '';
			this.qtdMax = qtdMax ? parseFloat(qtdMax) : 0;
			this.local = local ? local : '';
			this.tipo = tipo ? tipo : '';
			this.observacoes = observacoes ? observacoes : '';
			this.cardapios = listaCardapios ? listaCardapios : new Cardapios();
			this.link = link ? link : '';
			//console.log("Fornecedor.cardapios:", listaCardapios)
		}
	}, {
		key: 'limpa',
		value: function limpa() {
			this._id = '';
			this.nome = '';
			this.qtdMax = 0;
			this.local = '';
			this.tipo = '';
			this.observacoes = '';
			this.cardapios = new Cardapios();
		}
	}, {
		key: 'id',
		get: function get() {
			return this._id;
		}
	}, {
		key: 'listaCardapios',
		get: function get() {
			return this._listaCardapios;
		}
	}]);

	return Fornecedor;
}();
//# sourceMappingURL=Fornecedor.js.map