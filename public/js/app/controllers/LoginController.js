"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
	function LoginController() {
		_classCallCheck(this, LoginController);

		var $select = document.querySelector.bind(document);
		this.login = $select("#login");
		this.senha = $select("#senha");
		this.form = $select("#form-login");
		this.usuarioService = new UsuariosService();
		this.mensagem = new Bind(new Mensagem(), new MensagemView($select("#mensagemView")), 'novaMsg');

		this.init();
	}

	_createClass(LoginController, [{
		key: "init",
		value: function init() {
			var _this = this;

			this.form.onsubmit = function (event) {
				return _this.enviaLogin.call(_this, event);
			};
		}
	}, {
		key: "pegaDadoForm",
		value: function pegaDadoForm() {
			var loginVal = this.login.value;
			var senhaVal = this.senha.value;

			var json = { 'login': loginVal, 'senha': senhaVal };
			return json;
		}
	}, {
		key: "enviaLogin",
		value: function enviaLogin(event) {
			var _this2 = this;

			//console.log('this', this, 'event:', event);
			event.preventDefault();

			alert('um tempo');
			var promise = this.usuarioService.SubmeterLogin(this.pegaDadoForm());
			promise.then(function (res) {
				window.location('/');
			}).catch(function (err) {
				console.log(err);
				_this2.mensagem.novaMsg('login e senha invalidos.', "danger", 4400);
			});
		}
	}]);

	return LoginController;
}();
//# sourceMappingURL=LoginController.js.map