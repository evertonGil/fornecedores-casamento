"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormataNumeracao = function () {
   function FormataNumeracao() {
      _classCallCheck(this, FormataNumeracao);
   }

   _createClass(FormataNumeracao, null, [{
      key: "reais",
      value: function reais(string) {
         return string.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
   }]);

   return FormataNumeracao;
}();
//# sourceMappingURL=FormataNumeracao.js.map