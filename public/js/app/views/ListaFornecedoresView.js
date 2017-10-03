'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListaFornecedoresView = function (_View) {
	_inherits(ListaFornecedoresView, _View);

	function ListaFornecedoresView(elemento) {
		_classCallCheck(this, ListaFornecedoresView);

		return _possibleConstructorReturn(this, (ListaFornecedoresView.__proto__ || Object.getPrototypeOf(ListaFornecedoresView)).call(this, elemento));
	}

	_createClass(ListaFornecedoresView, [{
		key: 'template',
		value: function template(model) {
			return '\n\t\t' + model.lista.map(function (fornecedor, index) {
				return '\n\t\t\t<tr >\n\t\t\t\t<td colspan="14">\n\t\t\t\t\t<table width="100%">\n\t\t\t\t\t\t<tr  class="header_f">\n\t\t\t\t\t\t\t<td class="id" rowspan="' + (fornecedor.cardapios.lista.length + 1) + '">' + fornecedor.id + '</td>\n\t\t\t                <td class="fornecedor">' + (fornecedor.link ? '<a href="' + fornecedor.link + '" target="_blank">' : '') + fornecedor.nome + (fornecedor.link ? '</a>' : '') + '</td>\n\t\t\t                <td class="qtd_max">' + fornecedor.qtdMax + '</td>\n\t\t\t                <td class="local">' + fornecedor.local + '</td>\n\t\t\t                <td class="tipo">' + fornecedor.tipo + '</td>\n\t\t\t                <td class="valor_por_pessoa"></td>\n\t\t\t                <td class="aluguel"></td>\n\t\t\t                <td class="aluguel_pessas"></td>\n\t\t\t                <!--<td class="aluguel_pessas2"></td>-->\n\t\t\t                <td class="dj"></td>\n\t\t\t                <td class="decoracao"></td>\n\t\t\t                <td class="observacoes" rowspan="' + (fornecedor.cardapios.lista.length + 1) + '">' + fornecedor.observacoes + '</td>\n\n\t\t\t                <td class="editar" rowspan="' + (fornecedor.cardapios.lista.length + 1) + '"><a href="" onclick="cadastroController.editaFornecedor(event, \'' + fornecedor.id + '\')"><i class="fa fa-pencil edit" aria-hidden="true"></i></a></td>\n\t\t\t        \t\t<td class="excluir" rowspan="' + (fornecedor.cardapios.lista.length + 1) + '"><a href="" onclick="fornecedoresController.excluiFornecedor(event, \'' + fornecedor.id + '\', ' + index + ')"><i class="fa fa-trash fa-1x delete" aria-hidden="true"></i></a></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\n\t\t\t\t\t\t' + fornecedor.cardapios.lista.map(function (cardapio, index) {
					return '\n\t\t\t\t\t\t\t<tr class="sub">\n\t\t\t\t                <td class="nome">' + cardapio.nome + '</td>\n\t\t\t\t                <td class="qtd_max"></td>\n\t\t\t\t                <td class="local"></td>\n\t\t\t\t                <td class="tipo"></td>\n\t\t\t\t                <td class="valor_por_pessoa">' + (cardapio.valorPorPessoa > 0 ? cardapio.valorPorPessoa.toFixed(2) : '') + '</td>\n\t\t\t\t                <td class="aluguel">' + (cardapio.aluguel > 0 ? cardapio.aluguel.toFixed(2) : '') + '</td>\n\t\t\t\t                <td class="aluguel_pessas">' + (cardapio.aluguelPessoas > 0 ? cardapio.aluguelPessoas.toFixed(2) : '') + '</td>\n\t\t\t\t                <!--<td class="aluguel_pessas2">' + (cardapio.aluguelPessoas2 > 0 ? cardapio.aluguelPessoas2.toFixed(2) : '') + '</td>-->\n\t\t\t\t                <td class="dj">' + (cardapio.dj > 0 ? cardapio.dj.toFixed(2) : '') + '</td>\n\t\t\t\t                <td class="decoracao">' + (cardapio.decoracao > 0 ? cardapio.decoracao.toFixed(2) : '') + '</td>\n\t\t\t        \t\t</tr>\n\t\t        \t\t';
				}).join('') + '\n\t\t\t\t\t</table>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t';
			}).join('') + '\n\t\t';
		}
	}]);

	return ListaFornecedoresView;
}(View);
//# sourceMappingURL=ListaFornecedoresView.js.map