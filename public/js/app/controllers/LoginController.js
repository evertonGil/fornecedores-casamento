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

		this.init();
	}

	_createClass(LoginController, [{
		key: "init",
		value: function init() {

			this.form.addEventListener('submit', function (event) {
				event.preventDefault();
			});
		}
	}, {
		key: "enviaLogin",
		value: function enviaLogin() {}
	}]);

	return LoginController;
}();
//# sourceMappingURL=LoginController.js.map