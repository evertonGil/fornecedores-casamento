'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sort = function () {
	function Sort() {
		_classCallCheck(this, Sort);

		this._colunaAtual = '';
	}

	_createClass(Sort, [{
		key: 'toogleIcone',
		value: function toogleIcone(elemento, criterio, iconePadrao, iconeNovo) {
			var elementoClass = elemento.classList;

			var allColunas = document.querySelectorAll('.fa.' + iconePadrao);
			allColunas.forEach(function (item, i, arr) {
				if (!Object.is(item, elemento)) {
					item.className = 'fa ' + iconePadrao;
				}
			});

			if (elementoClass.contains(criterio)) {
				elemento.classList.remove(criterio);
				elemento.classList.add(iconeNovo);
			} else {
				elemento.classList.remove(iconeNovo);
				elemento.classList.add(criterio);
			}
		}
	}, {
		key: 'limpa',
		value: function limpa(iconePadrao) {
			this._colunaAtual = '';
			var allColunas = document.querySelectorAll('.fa.' + iconePadrao);

			allColunas.forEach(function (item, i, arr) {
				item.className = 'fa ' + iconePadrao;
			});
		}
	}, {
		key: 'ordena',
		value: function ordena(event, coluna, model) {

			if (this._colunaAtual == coluna) {
				this.toogleIcone(event.srcElement.querySelector('i'), 'fa-sort-desc', 'fa-sort', 'fa-sort-asc');
				model.ordenaReverse();
			} else {

				this.toogleIcone(event.srcElement.querySelector('i'), 'fa-sort-desc', 'fa-sort', 'fa-sort-asc');

				model.ordena(function (a, b) {
					if (typeof a[coluna] == "string") {
						if (a[coluna].toLowerCase() > b[coluna].toLowerCase()) {
							return 1;
						}
						if (a[coluna].toLowerCase() < b[coluna].toLowerCase()) {
							return -1;
						}
						return 0;
					}
					if (typeof a[coluna] == "number") {
						return a[coluna] - b[coluna];
					}
				});
			}
			this._colunaAtual = coluna;
		}
	}]);

	return Sort;
}();
//# sourceMappingURL=Sort.js.map