'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: '_handleErrors',
        value: function _handleErrors(res) {
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }
    }, {
        key: 'get',
        value: function get(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            //console.log(JSON.parse(xhr.responseText));
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            //console.log(xhr.responseText);
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            });
        }
    }, {
        key: 'post',
        value: function post(url, dado) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado));
            });
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('DELETE', url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status >= 200 && xhr.status <= 299) {
                            console.log(xhr);
                            resolve(true);
                        } else {
                            console.log(xhr.responseText);
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            });
        }
    }, {
        key: 'put',
        value: function put(url, dado) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status >= 200 && xhr.status <= 300) {
                            console.log(xhr);
                            resolve(true);
                        } else {
                            console.log(xhr.responseText);
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado));
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=Xhr-XMLHttprequest-ex.js.map