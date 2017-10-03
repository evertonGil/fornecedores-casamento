"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cardapios = function () {
	function Cardapios(lista) {
		_classCallCheck(this, Cardapios);

		this._lista = lista ? lista : [];
	}

	_createClass(Cardapios, [{
		key: "adiciona",
		value: function adiciona(cardapio) {
			this._lista.push(cardapio);
		}
	}, {
		key: "exclui",
		value: function exclui(index) {
			//console.log(index);
			//console.log(this._lista[index]);
			this._lista.splice(index, 1);
		}
	}, {
		key: "limpa",
		value: function limpa() {
			this._lista = [];
		}
	}, {
		key: "lista",
		get: function get() {
			return [].concat(this._lista);
		}
	}]);

	return Cardapios;
}();
//# sourceMappingURL=Cardapios.js.map