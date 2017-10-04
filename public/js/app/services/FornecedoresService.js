'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FornecedoresService = function () {
	function FornecedoresService() {
		_classCallCheck(this, FornecedoresService);

		this._http = new HttpService();
	}

	_createClass(FornecedoresService, [{
		key: 'obterListaFornecedores',
		value: function obterListaFornecedores(convidados) {
			var _this = this;

			return new Promise(function (resolve, reject) {

				_this._http.get('v1/fornecedores').then(function (res) {
					resolve(res.sort(function (a, b) {

						if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
							return 1;
						}
						if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
							return -1;
						}
						return 0;
					}).map(function (objeto) {

						var listaCardapios = new Cardapios();

						objeto.cardapios.map(function (item) {
							return new Cardapio(item.nome, item.valorPorPessoa, item.aluguel, item.dj, item.decoracao, convidados);
						}).forEach(function (cardapio) {
							listaCardapios.adiciona(cardapio);
						});

						var forn = new Fornecedor(objeto._id, objeto.nome, objeto.qtdMax, objeto.local, objeto.tipo, objeto.observacoes, listaCardapios, objeto.link);

						return forn;
					}));
				}).catch(function (err) {
					console.log(err);
					reject('Não foi possível obter os fornecedores do servidor.');
				});
			});
		}
	}, {
		key: 'enviarNovoFornecedor',
		value: function enviarNovoFornecedor(dado) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2._http.post('v1/fornecedores', dado).then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					//console.log(err);
					reject(err);
				});
			});
		}
	}, {
		key: 'editaFornecedor',
		value: function editaFornecedor(id, dado) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3._http.put('v1/fornecedores/' + id, dado).then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					//console.log(err);
					reject(err);
				});
			});
		}
	}, {
		key: 'deletaFornecedorPorId',
		value: function deletaFornecedorPorId(id) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				_this4._http.delete('v1/fornecedores/' + id).then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					console.log(err);
					reject('Não foi possível deletar os fornecedores.');
				});
			});
		}
	}, {
		key: 'listaTipo',
		value: function listaTipo() {
			var _this5 = this;

			return new Promise(function (resolve, reject) {

				_this5._http.get('v1/tipofornecedor').then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}, {
		key: 'adicionaTipo',
		value: function adicionaTipo(dado) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				//console.log("adiciona tipo", this);
				_this6._http.post('v1/tipofornecedor', dado).then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}, {
		key: 'listaLocal',
		value: function listaLocal() {
			var _this7 = this;

			return new Promise(function (resolve, reject) {

				_this7._http.get('v1/localfornecedor').then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}, {
		key: 'adicionaLocal',
		value: function adicionaLocal(dado) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				//console.log("adiciona local", this);
				_this8._http.post('v1/localfornecedor', dado).then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}]);

	return FornecedoresService;
}();
//# sourceMappingURL=FornecedoresService.js.map