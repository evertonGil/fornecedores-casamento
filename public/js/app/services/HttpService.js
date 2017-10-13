"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
	function HttpService() {
		_classCallCheck(this, HttpService);
	}

	_createClass(HttpService, [{
		key: "_handleErrors",
		value: function _handleErrors(res) {
			if (!res.ok) {
				console.log("errors disparado por HttpService");
				throw new Error(res.statusText);
			}
			return res;
		}
	}, {
		key: "_temTokenNaResposta",
		value: function _temTokenNaResposta(res) {
			var token = res.headers.get('x-access-token');
			if (token) {
				window.sessionStorage.token = token;
			}
			return res;
		}
	}, {
		key: "_temtokenSessionStorage",
		value: function _temtokenSessionStorage() {
			if (window.sessionStorage.token) {
				return window.sessionStorage.token;
			} else {
				if (window.location.pathname != "/login.html") {
					window.location = "/login.html";
				}
				return null;
			}
		}
	}, {
		key: "_setaHeader",
		value: function _setaHeader(headers) {
			var token = this._temtokenSessionStorage();
			if (token) {
				headers['x-access-token'] = token;
			}
			return headers;
		}
	}, {
		key: "get",
		value: function get(url) {
			var _this = this;

			var header = {};

			return fetch(url, {
				headers: this._setaHeader(header)
			}).then(function (res) {
				return _this._handleErrors(res);
			}).then(function (res) {
				return res.json();
			});
		}
	}, {
		key: "post",
		value: function post(url, dado, header) {
			var _this2 = this;

			return fetch(url, {
				headers: this._setaHeader(header),
				method: 'POST',
				body: dado
			}).then(function (res) {
				return _this2._handleErrors(res);
			}).then(function (res) {
				return _this2._temTokenNaResposta(res);
			}).then(function (res) {
				return res.json();
			});
		}
	}, {
		key: "delete",
		value: function _delete(url, header) {
			var _this3 = this;

			return fetch(url, {
				method: 'DELETE',
				headers: this._setaHeader(header)
			}).then(function (res) {
				return _this3._handleErrors(res);
			}).then(function (res) {
				return res;
			});
		}
	}, {
		key: "put",
		value: function put(url, dado, header) {
			var _this4 = this;

			return fetch(url, {
				headers: this._setaHeader(header),
				method: 'PUT',
				body: JSON.stringify(dado)
			}).then(function (res) {
				return _this4._handleErrors(res);
			}).then(function (res) {
				return res.json();
			});
		}
	}]);

	return HttpService;
}();
//# sourceMappingURL=HttpService.js.map