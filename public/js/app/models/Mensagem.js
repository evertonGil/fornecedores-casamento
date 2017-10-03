'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mensagem = function () {
	function Mensagem() {
		var texto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var tipo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;

		_classCallCheck(this, Mensagem);

		this._texto = texto;
		this._tipo = tipo;
		this._time = time;
	}

	_createClass(Mensagem, [{
		key: 'executaFade',
		value: function executaFade(elemento, tag) {
			setTimeout(function (n) {
				var elementoMensagem = elemento.querySelector(tag);
				elementoMensagem.className += "fade";
			}, this._time);
			return "";
		}
	}, {
		key: 'novaMsg',
		value: function novaMsg(texto, tipo, time) {
			this._texto = texto;
			this._time = time;
			if (tipo != '' || tipo == 'success' || tipo == 'info' || tipo == 'warning' || tipo == 'danger') {
				return this._tipo = tipo;
			} else {
				throw Error('Faltou escolher um do tipos possiveis no lancamento da mensagem: success/info/warning/danger');
			}
		}
	}, {
		key: 'texto',
		get: function get() {
			return this._texto;
		}
	}, {
		key: 'tipo',
		get: function get() {
			return this._tipo;
		}
	}, {
		key: 'time',
		get: function get() {
			return this._time;
		}
	}]);

	return Mensagem;
}();
//# sourceMappingURL=Mensagem.js.map