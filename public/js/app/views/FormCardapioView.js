'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormCardapioView = function (_View) {
	_inherits(FormCardapioView, _View);

	function FormCardapioView(elemento) {
		_classCallCheck(this, FormCardapioView);

		return _possibleConstructorReturn(this, (FormCardapioView.__proto__ || Object.getPrototypeOf(FormCardapioView)).call(this, elemento));
	}

	_createClass(FormCardapioView, [{
		key: 'template',
		value: function template(model) {

			/*		
   console.log('model', model.lista);
   		model.lista.forEach((cardapio, index, array) =>{
   	console.log('cardapio', cardapio );
   });
   */

			return '\n\t\t' + model.lista.map(function (cardapio, index, array) {
				return '\n\t\t\t<tr>\n\t        \t<td class="col-nome">\n\t\t            <input type="text" id="nome" class="form-control form-control-sm " autofocus="" title="Campo n\xE3o deve ser em branco" required value="' + cardapio.nome + '" onchange="cadastroController.setValPropCardapio(event, ' + index + ')">\n\t        \t</td>\n        \t\t<td class="col-valorPessoa">\n\t\t            <input id="valorPorPessoa" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padr\xE3o: 1000,00 ou 1000.00" required value="' + parseFloat(cardapio.valorPorPessoa).toFixed(2) + '" onchange="cadastroController.setValPropCardapio(event, ' + index + ')">\n        \t\t</td>\n        \t\t<td class="col-aluguel">\n\t\t            <input id="aluguel" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padr\xE3o: 1000,00 ou 1000.00" required value="' + parseFloat(cardapio.aluguel).toFixed(2) + '" onchange="cadastroController.setValPropCardapio(event, ' + index + ')">\n        \t\t</td>\n        \t\t<td class="col-dj">\n\t\t            <input id="dj" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padr\xE3o: 1000,00 ou 1000.00" required value="' + parseFloat(cardapio.dj).toFixed(2) + '" onchange="cadastroController.setValPropCardapio(event, ' + index + ')">\n        \t\t</td>\n        \t\t<td class="col-decoracao">\n\t\t            <input id="decoracao" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padr\xE3o: 1000,00 ou 1000.00" required value="' + parseFloat(cardapio.decoracao).toFixed(2) + '" onchange="cadastroController.setValPropCardapio(event, ' + index + ')">\n        \t\t</td>\n\t        \t<td class="col-inclui">\n\t        \t\t<a href="#" class="deletarCardapio text-danger" onclick="cadastroController.removeCardapio(event, ' + index + ')"><i class="fa fa-minus-circle"></i></a>\n\t        \t</td>\n        \t</tr>\n\t\t';
			}).join('') + '\n\t\t';
		}
	}]);

	return FormCardapioView;
}(View);
//# sourceMappingURL=FormCardapioView.js.map