"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragAndDropView = function (_View) {
    _inherits(DragAndDropView, _View);

    function DragAndDropView(elemento) {
        _classCallCheck(this, DragAndDropView);

        return _possibleConstructorReturn(this, (DragAndDropView.__proto__ || Object.getPrototypeOf(DragAndDropView)).call(this, elemento));
    }

    _createClass(DragAndDropView, [{
        key: "template",
        value: function template(model) {
            if (model === 'finalizado') {
                return "\n            \n            <img src=\"/images/cloud-upload.png\" class=\"imgUpload\" />\n            <div class=\"uploadSelect\">\n                <input id=\"upload\" name=\"upload\" multiple=\"multiple\" type=\"file\" onchange=\"cadastroController.anexaArquivos(event)\" />\n            </div>\n            <p class=\"texto\">ou solte os arquivos aqui</p>\n            ";
            }
            if (model === "emProgresso") {
                return "\n            <div class=\"uploadEmProcesso\">\n                <img src=\"/images/loader-gif2.gif\" class=\"imgUpload\" />\n                <p class=\"texto\">Upload em andamento!</p>\n            </di>\n            ";
            }
        }
    }]);

    return DragAndDropView;
}(View);
//# sourceMappingURL=DragAndDropView.js.map