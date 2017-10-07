"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Anexos = function () {
    function Anexos(lista) {
        _classCallCheck(this, Anexos);

        this._lista = lista ? lista : [];
    }

    _createClass(Anexos, [{
        key: "adiciona",
        value: function adiciona(anexo) {
            //console.log("adiciona");
            this._lista.push(anexo);
        }
    }, {
        key: "exclui",
        value: function exclui(index) {
            this._lista.splice(index, 1);
        }
    }, {
        key: "limpa",
        value: function limpa() {
            this._lista = [];
        }
    }, {
        key: "lista",
        get: function get() {
            return [].concat(this._lista);
        }
    }]);

    return Anexos;
}();
//# sourceMappingURL=Anexos.js.map