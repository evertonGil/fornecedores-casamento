"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormFornecedorView = function (_View) {
	_inherits(FormFornecedorView, _View);

	function FormFornecedorView(elemento) {
		_classCallCheck(this, FormFornecedorView);

		return _possibleConstructorReturn(this, (FormFornecedorView.__proto__ || Object.getPrototypeOf(FormFornecedorView)).call(this, elemento));
	}

	_createClass(FormFornecedorView, [{
		key: "template",
		value: function template(model) {
			return "\n\t\t<div class=\"form-group col-md-8\">\n\t        <div class=\"form-group\">\n\t            <label for=\"nome\" class=\"\">Nome Fornecedor:</label>\n\t            <input type=\"text\" id=\"nome\" class=\"form-control form-control-sm\"  title=\"Campo n\xE3o pode ser em branco\" required autofocus onchange=\"cadastroController.setValPropFornecedor(event)\" value=\"" + model.nome + "\"/>        \n            </div>\n\t        <div class=\"form-row\">\n\t\t\t    <div class=\"col\">\n\t\t            <label for=\"qtdMax\" class=\"\">Qtd M\xE1xima Convidados</label>\n\t\t            <input type=\"number\" min=\"1\" step=\"1\" id=\"qtdMax\" class=\"form-control form-control-sm \" title=\"Campo n\xE3o pode ser em branco\" required value=\"" + model.qtdMax + "\" onchange=\"cadastroController.setValPropFornecedor(event)\"/>\n\t            </div>\n\t\t        <div class=\"col\">\n\t\t            <label for=\"local\" class=\"\">Local</label>\n\t\t            <input id=\"local\" type=\"text\" class=\"form-control form-control-sm \" value=\"" + model.local + "\"  title=\"Campo n\xE3o pode ser em branco\"  required onchange=\"cadastroController.setValPropFornecedor(event)\" />\n\t\t        </div>\n\t\t        <div class=\"col\">\n\t\t            <label for=\"tipo\" class=\"\">Tipo</label>\n\t\t            <input id=\"tipo\" type=\"text\" class=\"form-control form-control-sm \" value=\"" + model.tipo + "\"  title=\"Campo n\xE3o pode ser em branco\"  required onchange=\"cadastroController.setValPropFornecedor(event)\" />\n\t        \t</div>\n\t        </div>\n        </div>\n\n        <div class=\"form-group col-md-4 form-row\">\n            <label for=\"observacoes\" class=\"\">Observa\xE7\xF5es</label>\n            <textarea id=\"observacoes\" class=\"form-control form-control-sm\" style=\"height: 106px;\" onchange=\"cadastroController.setValPropFornecedor(event)\">" + model.observacoes + "</textarea>\n        </div>\n        <div class=\"form-group col-md-12 form-row\">\n            <label for=\"link\" class=\"\">Link</label>\n\t\t    <input id=\"link\" type=\"text\" class=\"form-control form-control-sm \" value=\"" + model.link + "\"  title=\"Campo n\xE3o pode ser em branco\"  onchange=\"cadastroController.setValPropFornecedor(event)\" />\n        </div>\n\t\t";
		}
	}]);

	return FormFornecedorView;
}(View);
//# sourceMappingURL=FormFornecedorView.js.map