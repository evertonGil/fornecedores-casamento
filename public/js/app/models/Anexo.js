"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Anexo = function () {
    function Anexo(link) {
        _classCallCheck(this, Anexo);

        this.link = link ? link : '';
    }

    _createClass(Anexo, [{
        key: "nome",
        get: function get() {
            var split = this.link.split("/");
            if (split) {
                // console.log(split[split.length - 1]);
                return split[split.length - 1];
            }
        }
    }, {
        key: "subDiretorio",
        get: function get() {
            var split = this.link.split("/");
            if (split) {
                // console.log(split[split.length - 1]);
                return split[split.length - 2];
            }
        }
    }]);

    return Anexo;
}();
//# sourceMappingURL=Anexo.js.map