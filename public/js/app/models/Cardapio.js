'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cardapio = function () {
	function Cardapio(nome, valorPorPessoa, aluguel, dj, decoracao, convidados) {
		_classCallCheck(this, Cardapio);

		this.nome = nome ? nome : '';
		this.valorPorPessoa = valorPorPessoa ? parseFloat(valorPorPessoa) : 0;
		this.aluguel = aluguel ? parseFloat(aluguel) : 0;
		this.dj = dj ? parseFloat(dj) : 0;
		this.decoracao = decoracao ? parseFloat(decoracao) : 0;
		this.convidados = convidados ? convidados : 100;
	}

	_createClass(Cardapio, [{
		key: 'aluguelPessoas',
		get: function get() {
			return this.aluguel + this.valorPorPessoa * this.convidados;
		}
	}, {
		key: 'aluguelPessoas2',
		get: function get() {
			return this.aluguel + this.valorPorPessoa * 400;
		}
	}]);

	return Cardapio;
}();
//# sourceMappingURL=Cardapio.js.map