'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormularioFornecedoresController = function () {
	function FormularioFornecedoresController() {
		_classCallCheck(this, FormularioFornecedoresController);

		var $select = document.querySelector.bind(document);

		this._mensagem = new Bind(new Mensagem(), new MensagemView($select("#mensagemView")), 'novaMsg');

		this._conectaDB = new FornecedoresService();

		this._validacoes = new Validacoes();
	}

	_createClass(FormularioFornecedoresController, [{
		key: 'init',
		value: function init(cb) {

			var $select = document.querySelector.bind(document);

			$('.modal').modal();

			$('.modal').on('shown.bs.modal', function () {
				$('#nome').focus();
			});

			this._fornecedor = new Bind(new Fornecedor(), new FormFornecedorView($select("#fornecedorView")), 'id', 'limpa', 'setaValores');

			this._fornecedor.cardapios = new Bind(new Cardapios(), new FormCardapioView(document.querySelector("#cardapiosView")), 'adiciona', 'exclui', 'limpa');
			//console.log('init.fornecedor.cardapios.lista', this._fornecedor.cardapios.lista);
			this._easyAutocomplete("/v1/tipofornecedor", "#fornecedorView #tipo");
			this._easyAutocomplete("/v1/localfornecedor", "#fornecedorView #local");

			console.log($select('#fornecedorView #nome'));
			if (cb) {
				cb();
			}
		}
	}, {
		key: 'end',
		value: function end() {

			$('.modal').modal("hide");
			this._fornecedor = {};
			//console.log('end.fornecedor.cardapio', this._fornecedor.cardapios);
		}
	}, {
		key: '_easyAutocomplete',
		value: function _easyAutocomplete(url, classe) {
			var options = {
				url: url,
				getValue: function getValue(element) {
					console.log(this, element.nome);
					return Captalize.string(element.nome);
				},
				list: {
					match: {
						enabled: true
					}
				}
			};
			$(classe).easyAutocomplete(options);
		}
	}, {
		key: '_todosInputs',
		value: function _todosInputs(item) {
			return Array.prototype.slice.call(document.querySelectorAll(".formulario_fornecedor input"));
		}
	}, {
		key: 'editaFornecedor',
		value: function editaFornecedor(event, id) {
			var _this = this;

			event.preventDefault();

			this.init(function () {

				var listaFornecedores = fornecedoresController._listaDeFornecedores.lista;

				listaFornecedores.forEach(function (item, index, arr) {

					if (item._id == id) {

						item.cardapios.lista.forEach(function (cardapio, index) {
							_this._fornecedor.cardapios.adiciona(cardapio);
						});

						_this._fornecedor.setaValores(item.id, item.nome, item.qtdMax, item.local, item.tipo, item.observacoes, _this._fornecedor.cardapios, item.link);
					}
				});

				_this._easyAutocomplete("/v1/tipofornecedor", "#fornecedorView #tipo");
				_this._easyAutocomplete("/v1/localfornecedor", "#fornecedorView #local");
			});
		}
	}, {
		key: 'adicionaCardapio',
		value: function adicionaCardapio(event) {
			event.preventDefault();
			var cardapio = new Cardapio();
			this._fornecedor.cardapios.adiciona(cardapio);
		}
	}, {
		key: 'removeCardapio',
		value: function removeCardapio(event, index) {
			event.preventDefault();
			this._fornecedor.cardapios.exclui(index);
		}
	}, {
		key: 'setValPropFornecedor',
		value: function setValPropFornecedor(event) {

			var fornecedor = this._fornecedor;
			this.iteraObjeto(fornecedor, function (propriedade, objeto) {
				if (propriedade == '' + event.target.id) objeto[propriedade] = event.target.value;
			});
		}
	}, {
		key: 'setValPropCardapio',
		value: function setValPropCardapio(event, index) {
			var _this2 = this;

			this._fornecedor.cardapios.lista.forEach(function (cardapio, i, arr) {
				if (i == index) {
					_this2.iteraObjeto(cardapio, function (propriedade, objeto) {
						if (propriedade == '' + event.target.id) objeto[propriedade] = event.target.value;
					});
				}
			});
		}
	}, {
		key: 'iteraObjeto',
		value: function iteraObjeto(objeto, funcao) {
			var i = 0;
			for (var prop in objeto) {
				if (objeto.hasOwnProperty(prop)) {
					funcao(prop, objeto, i);
					i++;
				}
			}
		}
	}, {
		key: 'adiciona',
		value: function adiciona(event) {
			var _this3 = this;

			event.preventDefault();

			var $select = document.querySelector.bind(document);
			var invalido = this._validacoes.validaRegExp(this._todosInputs());

			console.log('invalido: ', invalido);
			if (invalido) {
				this._mensagem.novaMsg('Por favor preencha os campos obrigatórios', "danger", 2400);
				return;
			}

			//criando o object para ser enviado
			var fornecedor = this._fornecedor;

			Object.defineProperty(fornecedor, '_id', {
				enumerable: false
			});

			fornecedor.cardapios.lista.forEach(function (cardapio, i, arr) {

				var propValidas = ['nome', 'valorPorPessoa', 'aluguel', 'dj', 'decoracao'];

				for (var prop in cardapio) {
					if (!propValidas.includes(prop)) Object.defineProperty(cardapio, prop, { enumerable: false });
				}

				return cardapio;
			});

			fornecedor.cardapios = fornecedor.cardapios.lista;

			var promise = void 0;

			if (!fornecedor.id) {
				promise = this._conectaDB.enviarNovoFornecedor(fornecedor);
			} else {
				promise = this._conectaDB.editaFornecedor(fornecedor.id, fornecedor);
			}

			promise.then(function (res) {
				_this3._mensagem.novaMsg('Forncedor incluido com sucesso', "success", 2400);
				_this3.end();
				fornecedoresController.importa();
				console.log(res);
			}).then(function () {
				_this3.helperCadastraSeNaoTiver(_this3._conectaDB.listaTipo(), fornecedor.tipo, _this3._conectaDB, _this3._conectaDB.adicionaTipo.bind(_this3._conectaDB));
			}).then(function () {

				_this3.helperCadastraSeNaoTiver(_this3._conectaDB.listaLocal(), fornecedor.local, _this3._conectaDB, _this3._conectaDB.adicionaLocal.bind(_this3._conectaDB));
			}).catch(function (err) {
				console.log(err);
				trataErrorsInput(err);
				_this3._mensagem.novaMsg('Não foi possível cadastrar o fornecedor.', "danger", 2400);
			});
		}
	}, {
		key: 'helperCadastraSeNaoTiver',
		value: function helperCadastraSeNaoTiver(promise, param, connection, adiciona) {

			var tipoObj = { nome: param.toLowerCase() };

			promise.then(function (res) {
				if (res.length) {
					var Existe = res.some(function (item, i, arr) {
						return item.nome.toLowerCase() == param.toLowerCase();
					});

					if (!Existe) {

						var promiseAdiciona = adiciona(tipoObj);
						promiseAdiciona.then(function (res) {
							return console.log(res);
						}).catch(function (err) {
							return console.log(err);
						});
					}
				} else {

					var _promiseAdiciona = adiciona(tipoObj);
					_promiseAdiciona.then(function (res) {
						return console.log(res);
					}).catch(function (err) {
						return console.log(err);
					});
				}
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: 'trataErrorsInput',
		value: function trataErrorsInput(err) {
			var _this4 = this;

			var erros = JSON.parse(err).errors;

			this.iteraObjeto(erros, function (prop, objeto, index) {
				_this4._todosInputs().forEach(function (input) {
					if (input.id == prop) {
						input.classList.add("is-invalid");
						input.focus();
					} else {
						input.classList.remove("is-invalid");
					}
				});
			});
		}
	}]);

	return FormularioFornecedoresController;
}();
//# sourceMappingURL=FormularioFornecedoresController.js.map