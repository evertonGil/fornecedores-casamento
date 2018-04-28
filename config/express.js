var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('../app/services/logger');

module.exports = function () {
	var app = express();

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(morgan('common', {
		stream: {
			write: function (message) {
				logger.info(message)
			}
		}
	}));

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	consign({ cwd: 'app' })
		.include('models')
		.then('api')
		.then('services')
		.then('routes')
		.into(app);

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
		next();
	});
	
	app.use(function (req, res, next) {
		res.status(404).render('erros/404');
		next();
	});
	app.use(function (erro, req, res, next) {
		console.log(erro);
		logger.log('error', erro);
		if (process.env.NODE_ENV = 'prodution') {
			res.status(500).render('erros/500');
		}
		next();
	});

	return app;
}