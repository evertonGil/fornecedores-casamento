'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsuariosService = function () {
	function UsuariosService() {
		_classCallCheck(this, UsuariosService);

		this._http = new HttpService();
	}

	_createClass(UsuariosService, [{
		key: 'SubmeterLogin',
		value: function SubmeterLogin(dado) {
			var _this = this;

			var header = {
				'content-type': 'application/json'
			};

			return new Promise(function (resolve, reject) {
				_this._http.post('v1/login', dado, header).then(function (res) {
					window.location = "/";
				}).catch(function (err) {
					console.log(err);
					reject('Login e senha invalidos.');
				});
			});
		}
	}]);

	return UsuariosService;
}();
//# sourceMappingURL=UsuariosService.js.map