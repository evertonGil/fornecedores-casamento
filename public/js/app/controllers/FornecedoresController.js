"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FornecedoresController = function () {
	function FornecedoresController() {
		_classCallCheck(this, FornecedoresController);

		var $select = document.querySelector.bind(document);

		this._mensagem = new Bind(new Mensagem(), new MensagemView($select("#mensagemView")), 'novaMsg');

		this._listaDeFornecedores = new Bind(new Fornecedores(), new ListaFornecedoresView($select("#listaFornecedoresView")), 'adiciona', 'exclui', 'ordena', 'ordenaReverse', 'filtra', 'lista', 'limpa');

		this._sort = new Sort();
		this._convidados = $select("#convidados");

		this._consultaDB = new FornecedoresService();

		this.importa();
	}

	_createClass(FornecedoresController, [{
		key: "filtra",
		value: function filtra(event) {
			event.preventDefault();
			var filtro = event.srcElement.value;

			var filtroBusca = document.querySelector("#filtroBusca").value;
			var filtroTipo = document.querySelector("#selectTipo").value;
			var filtroLocal = document.querySelector("#selectLocal").value;

			console.log("filtro: ", filtroBusca);
			console.log("tipo: ", filtroTipo);

			this._listaDeFornecedores.filtra(function (item, i, arr) {
				var umaPropBate = false;
				var validador = {
					tipo: false,
					nome: false,
					qtdMax: false,
					local: false

				};

				for (var property in item) {
					if (item.hasOwnProperty(property)) {

						var valor = item[property];
						var propBate;

						switch (property) {
							case "nome":
								valor = item[property].toLowerCase();
								validador.nome = valor.includes(filtroBusca.toLowerCase());
								//console.log('validador.nome', validador.nome,property ,item[property]);
								break;
							case "qtdMax":
								valor = item[property];
								validador.qtdMax = valor == filtroBusca;
								//console.log('validador.qtdMax', validador.qtdMax,property ,item[property]);
								break;
							case "local":
								valor = item[property].toLowerCase();
								validador.local = valor.includes(filtroLocal.toLowerCase());
								//console.log('validador.local', validador.local,property ,item[property]);
								break;
							case "tipo":
								valor = item[property].toLowerCase();
								validador.tipo = valor.includes(filtroTipo.toLowerCase());
								//console.log('validador.local', validador.local,property ,item[property]);
								break;
						}
					}
				}

				console.log(item, validador);

				if (validador.tipo && validador.local && (validador.nome || validador.qtdMax)) {
					return true;
				} else {
					return false;
				}
			});
			this._sort.limpa('fa-sort');
		}
	}, {
		key: "importa",
		value: function importa() {
			var _this = this;

			this._listaDeFornecedores.limpa();

			var promisse = this._consultaDB.obterListaFornecedores(this._convidados.value);
			promisse.then(function (res) {
				return res.forEach(function (fornecedor) {

					_this._listaDeFornecedores.adiciona(fornecedor);
				});
			}).then(function () {
				_this.propagaSelectTipo("#filtroTipo select", _this._consultaDB.listaTipo());
				_this.propagaSelectTipo("#filtroLocal select", _this._consultaDB.listaLocal());
			}).catch(function (err) {
				console.log(err);
				_this._mensagem.novaMsg(err, "danger", 2400);
			});

			this._sort.limpa('fa-sort');
		}
	}, {
		key: "contaConvidados",
		value: function contaConvidados(event) {
			this.teste = this._listaDeFornecedoresl;
			this._listaDeFornecedores.lista.forEach(function (fornecedor) {
				return fornecedor.cardapios.lista.forEach(function (cardapio) {
					return cardapio.convidados = event.srcElement.value;
				});
			});
			var template = new ListaFornecedoresView(document.querySelector("#listaFornecedoresView"));
			template.update(this._listaDeFornecedores);

			this._mensagem.novaMsg("Convidados Recalculado!", "success", 2400);
		}
	}, {
		key: "ordena",
		value: function ordena(event, coluna) {
			this._sort.ordena(event, coluna, this._listaDeFornecedores);
			//this._mensagem.novaMsg(`Coluna ${coluna} ordenada`,"info", 1400);
		}
	}, {
		key: "propagaSelectTipo",
		value: function propagaSelectTipo(inputId, consulta) {
			var promise = consulta;
			var input = document.querySelector(inputId);
			var option1 = document.createElement("option");

			while (input.length) {
				input.remove(0);
			}
			option1.value = "";
			option1.text = "...";
			input.add(option1);

			promise.then(function (res) {
				res.forEach(function (item, i) {
					var option = document.createElement("option");
					option.value = item.nome;
					option.text = item.nome;

					input.add(option);
				});
			}).catch(function (err) {
				return console.log(err);
			});
		}
	}, {
		key: "excluiFornecedor",
		value: function excluiFornecedor(event, id, index) {
			var _this2 = this;

			event.preventDefault();

			var promisse = this._consultaDB.deletaFornecedorPorId(id);

			promisse.then(function (res) {
				_this2._mensagem.novaMsg("Item excluído da lista!", "success", 2400);
				_this2._listaDeFornecedores.exclui(index);
			}).catch(function (err) {
				return _this2._mensagem.novaMsg(err, "danger", 2400);
			});
		}
	}, {
		key: "_limpaFormulario",
		value: function _limpaFormulario() {
			this._inputNomeProduto.value = '';
			this._inputQuantidade.value = 1;
			this._inputValor.value = 0.0;
			this._inputNomeProduto.focus();
		}
	}]);

	return FornecedoresController;
}();
//# sourceMappingURL=FornecedoresController.js.map