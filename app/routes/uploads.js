var fs = require('fs');

module.exports = function(app){
    var api = app.api.uploads;

    app.post("/v1/upload", api.adiciona);
    app.delete("/v1/upload/:subdir/:filename", api.deleta)
}