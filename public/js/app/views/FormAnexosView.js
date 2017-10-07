'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListaAnexosView = function (_View) {
    _inherits(ListaAnexosView, _View);

    function ListaAnexosView(elemento) {
        _classCallCheck(this, ListaAnexosView);

        return _possibleConstructorReturn(this, (ListaAnexosView.__proto__ || Object.getPrototypeOf(ListaAnexosView)).call(this, elemento));
    }

    _createClass(ListaAnexosView, [{
        key: 'template',
        value: function template(model) {
            // console.log("anexosView", model);
            return '\n        ' + model.lista.map(function (anexo, index, array) {
                return '\n            <ul>\n                <li>\n                    <a href="' + anexo.link + '" target="_blank">' + anexo.nome + '</a>\n                    <a href="#" class="text-danger" onclick="cadastroController.removeAnexo(event, ' + index + ');" ><i class="fa fa-minus-circle"></i></a>\n                </li>\n            </ul>\n        ';
            }).join('') + '\n        ';
        }
    }]);

    return ListaAnexosView;
}(View);
//# sourceMappingURL=FormAnexosView.js.map