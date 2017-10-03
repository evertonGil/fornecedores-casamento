"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fornecedores = function () {
	function Fornecedores() {
		_classCallCheck(this, Fornecedores);

		this._lista = [];
		this._listaFiltrada = this._lista;
		this.teste = [1, 2];
	}

	_createClass(Fornecedores, [{
		key: "adiciona",
		value: function adiciona(fornecedor) {
			this._lista.push(fornecedor);
		}
	}, {
		key: "exclui",
		value: function exclui(index) {
			//console.log(index);
			//console.log(this._listaFiltrada[index]);
			this._listaFiltrada.splice(index, 1);
		}
	}, {
		key: "ordena",
		value: function ordena(criterio) {
			this._listaFiltrada.sort(criterio);
		}
	}, {
		key: "ordenaReverse",
		value: function ordenaReverse() {
			this._listaFiltrada.reverse();
		}
	}, {
		key: "filtra",
		value: function filtra(criterio) {
			this._listaFiltrada = this._lista.filter(criterio);
		}
	}, {
		key: "limpa",
		value: function limpa(teste) {
			this._lista = [];
			this._listaFiltrada = this._lista;
			//console.log('Fornecedores.limpa.this._lista', this._lista);
			//console.log('Fornecedores.limpa.this._listaFiltrada', this._listaFiltrada);
		}
	}, {
		key: "lista",
		get: function get() {
			return this._listaFiltrada;
		}
	}]);

	return Fornecedores;
}();
//# sourceMappingURL=Fornecedores.js.map