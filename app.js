var app = require('./config/express')();
require('./config/connectionFactory')('localhost/forncedores');


var porta = process.env.PORT || 3000;

app.listen(porta, function() {
    console.log("servidor rodando no heroku ");
})