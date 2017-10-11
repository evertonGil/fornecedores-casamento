"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validacoes = function () {
	function Validacoes() {
		_classCallCheck(this, Validacoes);
	}

	_createClass(Validacoes, [{
		key: "validaRegExp",
		value: function validaRegExp(array) {
			return array.some(function (item, index, arr) {
				var pai = item.parentElement;
				if (item.required) {
					var patternRegex = new RegExp(item.pattern);
					if (patternRegex.test(item.value) && item.value != '') {
						/*
      var errorInfo = pai.querySelector(".error-info");
      if(errorInfo){
      	errorInfo.remove();
      }
      */
						$("#" + item.id).popover("hide");

						item.classList.remove("is-invalid");
						//console.log(item.id , "valido");
						return false;
					} else {
						var errorInfo = pai.querySelector(".error-info");
						if (errorInfo) {
							errorInfo.remove();
						}
						/*
      let div = document.createElement("div");
      div.classList.add("tooltip", "bs-tooltip-top");
      div.innerHTML = item.getAttribute("title");
      	pai.appendChild(div);
      */
						$(item).popover({
							placement: 'bottom',
							template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-header"></div></div>'
						}).popover("show");

						item.addEventListener('change', function () {
							return $(item).popover("hide");
						});

						console.log(item.id, "invalido");
						item.classList.add("is-invalid");
						item.focus();
						return true;
					}
				}
			});
		}
	}]);

	return Validacoes;
}();
//# sourceMappingURL=Validacoes.js.map